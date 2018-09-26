import React, { Component } from "react";

import { connect } from 'react-redux';
import { getGamesForRecords } from '../../../js/actions/statsActions'
import { selectGame } from '../../../js/actions/statsActions'
import { unselectGame } from '../../../js/actions/statsActions'
import { toggleViews } from '../../../js/actions/statsActions'

import { updatePlayers } from '../../../js/actions/statsActions'
import { batchChartUpdate } from '../../../js/actions/statsActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./GameSelector.css";

class GameSelector extends Component {

    componentDidMount() {
        this.props.getGamesForRecords();
    }

    unselectGame(game) {
        this.props.unselectGame(game)
        /* Adapting the reducer from Player selector to re-create an array of playerRecords after game has been deleted */
        let playersForRecords = []
        // if the game is added after players have been selected
            if (this.props.selectedPlayers.length > 0) {
                this.props.selectedPlayers.forEach((broomballer) => {
                // re-filter the game array removing the game unselected
                let gamesPlayed = this.props.selectedGames.filter(match => match._id !== game._id).filter(game => game.players.filter(player => player._id === broomballer._id )[0])
                if (gamesPlayed.length > 0) {
                    let playerReduced = gamesPlayed.reduce((players, game) => {
                        let gameInfo = game.players.filter(player => player._id === broomballer._id).map(player => player.gameInfo)
                        let win;
                        let available;
                        players.name = broomballer.name
                        players._id = broomballer._id
                        players.membershipStatus = broomballer.membershipStatus
                        players.preferredPosition = broomballer.preferredPosition
                        
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
                        // this line errors if the player is a ten-bucker who didn't play in the remaining games
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
            
                        playersForRecords.push(playerReduced)
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
                            // we do not want to create empty cards if zero games are selected
                            if(this.props.selectedGames.length -1 > 0) {
                                playersForRecords.push(playerWithoutRecord)
                            }
                    }
                this.props.updatePlayers( playersForRecords )
                })
            }
    }
    
    selectGame(game) {
        this.props.selectGame(game)
        /*  Adapting the reducer originally created in PlayerSelector */
        let transformedArrayForCards = []
        // if the game is added after players have been selected
            if (this.props.selectedPlayers.length > 0) {
                this.props.selectedPlayers.forEach((broomballer) => {
                // re-filter the game array adding it newly added game
                let gamesPlayed = [game, ...this.props.selectedGames].filter(game => game.players.filter(player => player._id === broomballer._id )[0])
                
                if (gamesPlayed.length > 0) {
                    let playerReduced = gamesPlayed.reduce((players, game) => {
                        let gameInfo = game.players.filter(player => player._id === broomballer._id).map(player => player.gameInfo)
                        let win;
                        let available;
                        players.name = broomballer.name
                        players._id = broomballer._id
                        players.membershipStatus = broomballer.membershipStatus
                        players.preferredPosition = broomballer.preferredPosition
                        
                        players.gamesPlayed = players.gamesPlayed || []
                        if(gameInfo[0].available === true){
                            available = 1
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

                        players.losses = players.losses || []
                        if(gameInfo[0].available === true && game.win !== "Tie" && game.win !== gameInfo[0].team){
                            let loss= "Loss"
                            players.losses.push(loss)
                        }

                        players.ties = players.ties || []
                        if(gameInfo[0].available === true && game.win === "Tie"){
                            let tie= "Tie"
                            players.ties.push(tie)
                        }
                    
                        return players
                        }, {});
                        
                        let gamePlayedFromArray = playerReduced.gamesPlayed ? playerReduced.gamesPlayed.length : 0 
                        let winsFromArray = playerReduced.wins.length
                        let lossesFromArray = playerReduced.losses.length
                        let tiesFromArray = playerReduced.ties.length
                        let winPercent = gamePlayedFromArray > 0 ? Math.floor((playerReduced.wins.length / playerReduced.gamesPlayed.length) * 100) : "N/A"
                        let lossPercent = gamePlayedFromArray > 0 ? Math.floor((playerReduced.losses.length / playerReduced.gamesPlayed.length) * 100) : "N/A"
                        let tiePercent = gamePlayedFromArray > 0 ? Math.floor((playerReduced.ties.length / playerReduced.gamesPlayed.length) * 100) : "N/A"
                        let goalsFromArray = playerReduced.goals ? playerReduced.goals.reduce((a,b) => a + b, 0) : 0
                        let assistsFromArray = playerReduced.assists ? playerReduced.assists.reduce((a, b) => a + b, 0) : 0
                        let gpg = gamePlayedFromArray > 0 ? parseFloat((goalsFromArray / gamePlayedFromArray)) : "N/A"
                        let apg = gamePlayedFromArray > 0 ? parseFloat((assistsFromArray / gamePlayedFromArray)) : "N/A"

                        playerReduced.gamesPlayed = gamePlayedFromArray
                        playerReduced.wins = winsFromArray
                        playerReduced.losses = lossesFromArray
                        playerReduced.ties = tiesFromArray
                        playerReduced.winPercent = winPercent
                        playerReduced.lossPercent = lossPercent
                        playerReduced.tiePercent = tiePercent
                        playerReduced.goals = goalsFromArray 
                        playerReduced.assists = assistsFromArray
                        playerReduced.gpg = !Number.isInteger(gpg) ? gpg.toFixed(3) : gpg
                        playerReduced.apg = !Number.isInteger(apg) ? apg.toFixed(3) : apg
                        
                        transformedArrayForCards.push(playerReduced)
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
                        transformedArrayForCards.push(playerWithoutRecord)
                    }
                })        
            // preventing the data to send before the array is complete
            if (transformedArrayForCards.length === this.props.selectedPlayers.length) {
                this.props.updatePlayers( transformedArrayForCards )
                this.replaceBatchChartData( transformedArrayForCards )
                }
            }
    }

    toggleViews(currentStatus){
        this.props.toggleViews(currentStatus, "games")
    }

    replaceBatchChartData(arrayOfPlayers) {
        let labels = []
        let goalsArray = []
        let assistsArray = []
        let gamesPlayedArray = []
        let winPercentArray = []
        let gpgArray = []
        let apgArray = []
        arrayOfPlayers.forEach(e => {
            labels.push(e.name);
            goalsArray.push(e.goals);
            assistsArray.push(e.assists);
            gamesPlayedArray.push(e.gamesPlayed);
            winPercentArray.push(e.winPercent);
            gpgArray.push(e.gpg);
            apgArray.push(e.apg);
        })

        let newObject = {
            labels: labels,
            datasets: [
                {...this.props.chartData.datasets[0], data: goalsArray},
                {...this.props.chartData.datasets[1], data: assistsArray},
                {...this.props.chartData.datasets[2], data: gamesPlayedArray},
                {...this.props.chartData.datasets[3], data: winPercentArray},
                {...this.props.chartData.datasets[4], data: gpgArray},
                {...this.props.chartData.datasets[5], data: apgArray}
                ]
        }
        this.props.batchChartUpdate(newObject)
    }

    render() {
        return (
                <div className="full">
                    <div className="header">
                        <div>
                            <h3 className="header_h3" onClick={()=> this.toggleViews(this.props.listOfGames)}> {this.props.listOfGames === "hidden" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Select Games</h3>
                        </div>
                    </div>
                    <div className="content">
                        <div className={"record_list_of_games " + this.props.listOfGames}>
                                {this.props.allGames.length > 0 ?
                                    this.props.allGames
                                    .map(game => this.props.selectedGames.indexOf(game) === -1 ? 
                                    (
                                        <button key={game._id} className="btn unselected_game record_game_button" onClick={() => this.selectGame(game)}> {game._id} <FontAwesomeIcon icon="plus" className="game_action_icon"/> </button>
                                    )
                                    : (
                                        <button key={game._id} className="btn selected_game record_game_button" onClick={() => this.unselectGame(game)}> {game._id} <FontAwesomeIcon icon="times" className="game_action_icon"/> </button>
                                    )
                                )
                                : <p className="no_game">There is currently no game to display</p> 
                            }
                        </div>
                    </div>
                </div>
                )
            }
        }
/*
Games.propTypes = {
    fetchGames: PropTypes.func.isRequired,
    games: PropTypes.array.isRequired
}
*/

const mapStateToProps = state => ({
    selectedGames: state.stats.selectedGames,
    unselectedGames: state.stats.unselectedGames,
    allGames: state.stats.gamesForRecords,
    listOfGames: state.stats.listOfGames,
    selectedPlayers: state.stats.selectedPlayers,
    chartData: state.stats.chartData
})

export default connect(mapStateToProps, { getGamesForRecords, selectGame, unselectGame, toggleViews, updatePlayers, batchChartUpdate }) (GameSelector)
