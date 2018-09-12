import React, { Component } from "react";

import { connect } from 'react-redux';
import { fetchPlayers } from '../../../js/actions/playerActions'
import { selectPlayer } from '../../../js/actions/statsActions'
import { unselectPlayer } from '../../../js/actions/statsActions'
import { addPlayerStatObject } from "../../../js/actions/statsActions"
import { removePlayerStatObject } from "../../../js/actions/statsActions"
import { toggleViews } from '../../../js/actions/statsActions'
import { sendDataToChart } from '../../../js/actions/statsActions'
import { toggleSelectAll } from '../../../js/actions/statsActions'
// this replaces all the records in the playerRecords array
import { updatePlayers } from '../../../js/actions/statsActions'
// this merges newly created records with already existing records in the playerRecords array
import { batchCardUpdate } from '../../../js/actions/statsActions'

import { batchChartUpdate } from '../../../js/actions/statsActions'
import { batchUnselect } from '../../../js/actions/statsActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./PlayerSelector.css";

class PlayerSelector extends Component {

    componentDidMount() {
        this.props.fetchPlayers();
    }
    // unselect individual players (by way of slicing the existing arrays of data)
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
    // select individual player
    selectPlayer(broomballer) {
        let arrayOfplayer = []
        this.markAsSelected(broomballer)
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
            arrayOfplayer.push(playerReduced)
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
                arrayOfplayer.push(playerWithoutRecord)
            }
            this.addBatchChartData(arrayOfplayer)
    }

    toggleViews(currentStatus){
        this.props.toggleViews(currentStatus, "players")
    }
    // calling the "individual" functions repeatedly makes redux (and redux devtool) fail & Chrome lag. For this reason, we create separate functions that will handle updates on the whole array. 
    // This dispatcher sends data to the function that will handle it.
    selectAllPlayers(playerUpdate){
        switch (playerUpdate) {
            case "unselected_member":
            this.props.toggleSelectAll(playerUpdate)
            // we need to add both all members + non-members already selected for we are going to replace all existing records
            let allMembersAndSelectedTenBuckers = this.props.allPlayers.filter(player => player.membershipStatus === "Member").concat(this.props.selectedPlayers.filter(player => player.membershipStatus !== "Member"))
            this.selectAndTransform(allMembersAndSelectedTenBuckers, "select")
            break;

            case "selected_member":
            this.props.toggleSelectAll(playerUpdate)
            this.batchUnselect("Member")
            break;

            case "unselected_non_member":
            this.props.toggleSelectAll(playerUpdate)
            // Adding both all ten buckers (who have played one of possible games) + non-members already selected
            let allTenBuckersAndSelectedMembers = this.props.allPlayers.filter(player => player.membershipStatus !== "Member" && this.props.arrayOfTenBuckersID.includes(player._id)).concat(this.props.selectedPlayers.filter(player => player.membershipStatus === "Member"))
            console.log("allTenBuckersAndSelectedMembers: ", allTenBuckersAndSelectedMembers, "\nSee if the array is formed correctly")
            this.selectAndTransform(allTenBuckersAndSelectedMembers, "select")
            break;

            case "selected_non_member":
            this.props.toggleSelectAll(playerUpdate)
            this.batchUnselect("Ten Bucker")
            break;
            
            default:
            return;
        }
    }
    // this function marks all players in the array as selected, creates an array of objects in the playerRecords reducer, 
    // and sends data to be handled by setChartData accordingly (=> selected players are created properly for Chartjs package)
    selectAndTransform(array, type) {
        let transformedArrayForCards = []
            array.forEach(broomballer => {
                let gamesPlayed = this.props.selectedGames.filter(game => game.players.filter(player => player._id === broomballer._id )[0])
                if (type === "select") { this.markAsSelected(broomballer)}
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
                
                transformedArrayForCards.push( playerReduced )
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
                    transformedArrayForCards.push( playerWithoutRecord )
                }
            })
            // if the type is "select", the function will add the players to the existing records for chart (via addBatchChartData)
            // otherwise, it will remove and replace them via the replace BatchChartData
            if (type === "select") {
                this.props.updatePlayers(transformedArrayForCards)
                this.addBatchChartData(transformedArrayForCards)
                }
            else if (type === "unselect") {
                this.replaceBatchChartData( transformedArrayForCards )
            }
    }
    // this handles unselecting players depending on the membership type sent
    batchUnselect(type){
        this.props.batchUnselect(type);
        this.props.selectedPlayers.filter(player => player.membershipStatus === type).forEach(broomballer => this.unselectPlayer(broomballer));
        this.selectAndTransform(this.props.selectedPlayers.filter(player => player.membershipStatus !== type), "unselect")
    }

    addBatchChartData(arrayOfPlayers) {
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
            labels: labels.concat(this.props.chartData.labels),
            datasets: [
                {...this.props.chartData.datasets[0], data: goalsArray.concat(this.props.chartData.datasets[0].data)},
                {...this.props.chartData.datasets[1], data: assistsArray.concat(this.props.chartData.datasets[1].data)},
                {...this.props.chartData.datasets[2], data: gamesPlayedArray.concat(this.props.chartData.datasets[2].data)},
                {...this.props.chartData.datasets[3], data: winPercentArray.concat(this.props.chartData.datasets[3].data)},
                {...this.props.chartData.datasets[4], data: gpgArray.concat(this.props.chartData.datasets[4].data)},
                {...this.props.chartData.datasets[5], data: apgArray.concat(this.props.chartData.datasets[5].data)}
                ]
        }
        this.props.batchChartUpdate(newObject)
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

    // Before sending the player to the selectPlayer action that will add it to the selectedPlayers array, we need to make sure the record does not already exist
    // in that array (we might accidentally send twice via the batch select that consolidates before re-sending to playerRecords array). Otherwise, it creates 
    // problems with duplicate keys in React
    markAsSelected(player) {
        let arrayOfIds = this.props.selectedPlayers.map(broomballer => broomballer._id)
        if ( !arrayOfIds.includes(player._id) ){
            this.props.selectPlayer(player)
        }
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
                        <div className={this.props.listOfPlayers + " select_all"}>
                            <div className="button_options">
                                <button className={"btn record_player_button " + this.props.memberSelection} onClick={() => this.selectAllPlayers(this.props.memberSelection)}> {this.props.memberSelection === "unselected_member" ? "Select" : "Unselect"} All Members </button>
                                <button className={"btn record_player_button " + this.props.tenBuckerSelection} onClick={() => this.selectAllPlayers(this.props.tenBuckerSelection)}> {this.props.tenBuckerSelection === "unselected_non_member" ? "Select" : "Unselect"} All Ten Buckers </button>
                            </div>
                        </div>
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
    memberSelection: state.stats.memberSelection,
    tenBuckerSelection: state.stats.tenBuckerSelection,
    allPlayers: state.players.players,
    arrayOfTenBuckersID: state.stats.arrayOfTenBuckersID,
    listOfPlayers: state.stats.listOfPlayers,
    chartData: state.stats.chartData,
})

export default connect(mapStateToProps, {   
        fetchPlayers, 
        selectPlayer, 
        unselectPlayer, 
        toggleViews, 
        addPlayerStatObject, 
        removePlayerStatObject, 
        sendDataToChart, 
        toggleSelectAll, 
        batchCardUpdate, 
        batchChartUpdate, 
        batchUnselect, 
        updatePlayers 
    }) (PlayerSelector)
