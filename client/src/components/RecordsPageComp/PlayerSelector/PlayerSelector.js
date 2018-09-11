import React, { Component } from "react";

import { connect } from 'react-redux';
import { fetchPlayers } from '../../../js/actions/playerActions'
import { selectPlayer } from '../../../js/actions/statsActions'
import { unselectPlayer } from '../../../js/actions/statsActions'
import { addPlayerStatObject } from "../../../js/actions/statsActions"
import { removePlayerStatObject } from "../../../js/actions/statsActions"
import { toggleViews } from '../../../js/actions/statsActions'
import { sendDataToChart } from '../../../js/actions/statsActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./PlayerSelector.css";

class PlayerSelector extends Component {

    componentDidMount() {
        this.props.fetchPlayers();
    }

    unselectPlayer(player) {
        this.props.unselectPlayer(player)
        this.props.removePlayerStatObject(player)
        // removing the player from the chart dataset
        let indexOfRemovedPlayer = this.props.chartData.labels.indexOf(player.name)
        // removing all the info for this player. We need a new array
        let newLabels = this.props.chartData.labels.slice(0,indexOfRemovedPlayer).concat(this.props.chartData.labels.slice(indexOfRemovedPlayer + 1))
        
        let newGoals = this.props.chartData.datasets[0].data.slice(0, indexOfRemovedPlayer).concat(this.props.chartData.datasets[0].data.slice(indexOfRemovedPlayer + 1));
        let newAssists = this.props.chartData.datasets[1].data.slice(0, indexOfRemovedPlayer).concat(this.props.chartData.datasets[1].data.slice(indexOfRemovedPlayer + 1));
        let newGames = this.props.chartData.datasets[2].data.slice(0, indexOfRemovedPlayer).concat(this.props.chartData.datasets[2].data.slice(indexOfRemovedPlayer + 1));
        let newWins = this.props.chartData.datasets[3].data.slice(0, indexOfRemovedPlayer).concat(this.props.chartData.datasets[3].data.slice(indexOfRemovedPlayer + 1));
        let newGpg = this.props.chartData.datasets[4].data.slice(0, indexOfRemovedPlayer).concat(this.props.chartData.datasets[4].data.slice(indexOfRemovedPlayer + 1));
        let newApg = this.props.chartData.datasets[5].data.slice(0, indexOfRemovedPlayer).concat(this.props.chartData.datasets[5].data.slice(indexOfRemovedPlayer + 1));
        
        let newData = {
            labels: newLabels,
            datasets: [
                {...this.props.chartData.datasets[0], data: newGoals}, // goals
                {...this.props.chartData.datasets[1], data: newAssists}, // assists
                {...this.props.chartData.datasets[2], data: newGames}, // Games
                {...this.props.chartData.datasets[3], data: newWins}, // wins
                {...this.props.chartData.datasets[4], data: newGpg}, // gpg
                {...this.props.chartData.datasets[5], data: newApg}, // apg
                ]
        }

        this.props.sendDataToChart(newData)

    }

    selectPlayer(broomballer) {
        this.props.selectPlayer(broomballer)
        
        let gamesPlayed = this.props.selectedGames.filter(game => game.players.filter(player => player._id === broomballer._id )[0])
        if (gamesPlayed.length > 0) {
            let playerReduced = gamesPlayed.reduce((players, game) => {
                let gameInfo = game.players.filter(player => player._id === broomballer._id).map(player => player.gameInfo)
                let win;
                let available;
                players.name = broomballer.name
                players._id = broomballer._id
                players.membershipStatus = broomballer.membershipStatus
                
                players.gamesPlayed = players.gamesPlayed || []
                if(gameInfo[0].available === true){
                    available= 1
                    players.gamesPlayed.push(available)
                }
                
                players.goals = players.goals || []
                if(gameInfo[0].available === true) {
                    players.goals.push(gameInfo[0].goals)
                }
                
                players.assists = players.assists || []
                if (gameInfo[0].available === true) {
                    players.assists.push(gameInfo[0].assists)
                }
                
                players.wins = players.wins || []
                if(gameInfo[0].available === true && game.win === gameInfo[0].team){
                    win= "Win"
                    players.wins.push(win)
                }
                
                return players
                }, {});
                    
            let gamePlayedFromArray = playerReduced.gamesPlayed.length
            let winsFromArray = playerReduced.wins.length
            let winPercent = gamePlayedFromArray > 0 ? Math.floor((playerReduced.wins.length / playerReduced.gamesPlayed.length) * 100) : "N/A"
            let goalsFromArray = playerReduced.goals.reduce((a,b) => a + b, 0)
            let assistsFromArray = playerReduced.assists.reduce((a, b) => a + b, 0)
            let gpg = gamePlayedFromArray > 0 ? parseFloat((goalsFromArray / gamePlayedFromArray)) : "N/A"
            let apg = gamePlayedFromArray > 0 ? parseFloat((assistsFromArray / gamePlayedFromArray)) : "N/A"
            
            playerReduced.gamesPlayed = gamePlayedFromArray
            playerReduced.wins = winsFromArray
            playerReduced.winPercent = winPercent
            playerReduced.goals = goalsFromArray 
            playerReduced.assists = assistsFromArray
            playerReduced.gpg = gpg
            playerReduced.apg = apg
            
            this.props.addPlayerStatObject( playerReduced )
            this.addPlayerToChartData( playerReduced )
            }
            else {
                let playerWithoutRecord = {
                    name: broomballer.name,
                    gamesPlayed: 0,
                    goals: "N/A",
                    assists: "N/A",
                    membershipStatus: broomballer.membershipStatus,
                    winPercent: "N/A",
                    win: "N/A",
                    gpg: "N/A",
                    apg: "N/A",
                    _id: broomballer._id
                }
                this.props.addPlayerStatObject(playerWithoutRecord)
                this.addPlayerToChartData( playerWithoutRecord )
            }
    }
    addPlayerToChartData(player){
        let newData = {
            labels: [player.name, ...this.props.chartData.labels],
            datasets: [
            {...this.props.chartData.datasets[0], data: [player.goals, ...this.props.chartData.datasets[0].data]}, // goals
            {...this.props.chartData.datasets[1], data: [player.assists, ...this.props.chartData.datasets[1].data]}, // assists
            {...this.props.chartData.datasets[2], data: [player.gamesPlayed, ...this.props.chartData.datasets[2].data]}, // Games
            {...this.props.chartData.datasets[3], data: [player.winPercent / 100, ...this.props.chartData.datasets[3].data]}, // wins
            {...this.props.chartData.datasets[4], data: [player.gpg, ...this.props.chartData.datasets[4].data]}, // gpg
            {...this.props.chartData.datasets[5], data: [player.apg, ...this.props.chartData.datasets[5].data]}, // apg
            ]
        }
        this.props.sendDataToChart(newData)
    }

    toggleViews(currentStatus){
        this.props.toggleViews(currentStatus, "players")
    }

    render() {
        return (
                <div className="full">
                    <div className="header">
                        <div>
                            <h3 className="header_h3" onClick={()=> this.toggleViews(this.props.listOfPlayers)}> {this.props.listOfPlayers === "hidden" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Select Players</h3>
                        </div>
                    </div>
                    <div className="content">
                        <div className={"list_of_players " + this.props.listOfPlayers}>
                                {this.props.allPlayers.length > 0 ?
                                    this.props.allPlayers
                                    .filter(player => player.membershipStatus === "Member")
                                    .map(player => this.props.selectedPlayers.indexOf(player) === -1 ? 
                                    (<button key={player._id} className="btn unselected_member record_player_button" onClick={() => this.selectPlayer(player)}> {player.name} <FontAwesomeIcon icon="plus" className="player_action_icon"/> </button>)
                                    : 
                                    (<button key={player._id} className="btn selected_member record_player_button" onClick={() => this.unselectPlayer(player)}> {player.name} <FontAwesomeIcon icon="times" className="player_action_icon"/> </button>)
                                ) : <p className="no_game">There is currently no player to display</p> 
                                }
                                {this.props.allPlayers.length > 0 ?
                                    this.props.allPlayers
                                    .filter(player => player.membershipStatus !== "Member" && this.props.arrayOfTenBuckersID.includes(player._id))
                                    .map(player => this.props.selectedPlayers.indexOf(player) === -1 ? 
                                    (<button key={player._id} className="btn unselected_non_member record_player_button" onClick={() => this.selectPlayer(player)}> {player.name} <FontAwesomeIcon icon="plus" className="player_action_icon"/> </button>)
                                    : 
                                    (<button key={player._id} className="btn selected_non_member record_player_button" onClick={() => this.unselectPlayer(player)}> {player.name} <FontAwesomeIcon icon="times" className="player_action_icon"/> </button>)
                                ) : <p className="no_game">There is currently no player to display</p> 
                                }
                        </div>
                    </div>
                </div>
                )
            }
        }

const mapStateToProps = state => ({
    selectedGames: state.stats.selectedGames,
    selectedPlayers: state.stats.selectedPlayers,
    unselectedPlayers: state.stats.unselectedPlayers,
    allPlayers: state.players.players,
    arrayOfTenBuckersID: state.stats.arrayOfTenBuckersID,
    listOfPlayers: state.stats.listOfPlayers,
    chartData: state.stats.chartData,
})

export default connect(mapStateToProps, { fetchPlayers, selectPlayer, unselectPlayer, toggleViews, addPlayerStatObject, removePlayerStatObject, sendDataToChart }) (PlayerSelector)
