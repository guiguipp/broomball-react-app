import React, { Component } from "react";

import { connect } from 'react-redux';
import { fetchPlayers } from '../../js/actions/playerActions'
import { selectPlayer } from '../../js/actions/statsActions'
import { unselectPlayer } from '../../js/actions/statsActions'
// This adds a player to the playerRecords array
import { addPlayerStatObject } from "../../js/actions/statsActions"
import { removePlayerStatObject } from "../../js/actions/statsActions"
import { toggleViews } from '../../js/actions/statsActions'

import { toggleSelectAll } from '../../js/actions/statsActions'
// this replaces all the records in the playerRecords array
import { updatePlayers } from '../../js/actions/statsActions'
// this merges newly created records with already existing records in the playerRecords array
import { batchCardUpdate } from '../../js/actions/statsActions'
// this is used to send data to the chartData object from which data is pulled to create the chart
import { batchChartUpdate } from '../../js/actions/statsActions'
import { batchUnselect } from '../../js/actions/statsActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { createCardsArray } from "./curateData"
import { createChartData } from "./curateData"

class PlayerSelector extends Component {

    componentDidMount() {
        this.props.fetchPlayers();
    }
    // unselect individual players (by way of slicing the existing arrays of data)
    unselectPlayer(player) {
        this.props.unselectPlayer(player)
        this.props.removePlayerStatObject(player)
        if ( this.props.selectedGamesNum > 0 ) {
            let newObject = createChartData(this.props.selectedPlayers.filter(broomballer => broomballer._id !== player._id ))
            this.props.batchChartUpdate(newObject)
        } else {
            console.log("Handle case: \nPlayer is removed, no game selected")
        }
    }
    
    selectPlayer(broomballer) {
        this.markAsSelected(broomballer)
        let cardsArray = createCardsArray(this.props.selectedPlayers.concat(broomballer), this.props.selectedGames)
        this.props.updatePlayers( cardsArray )
        this.addBatchChartData( cardsArray )
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
    // this function marks all players in the array as selected (via this.markAsSelected), creates an array of objects in the playerRecords reducer, 
    // and sends data to be handled by setChartData accordingly (=> selected players are created properly for Chartjs package)
    selectAndTransform(arrayOfPlayers, type) {
        if (type === "select") {
            arrayOfPlayers.forEach(broomballer => this.markAsSelected(broomballer))
        }
        let cardsArray = createCardsArray(arrayOfPlayers, this.props.selectedGames)
        if (type === "select") {
            this.props.updatePlayers( cardsArray )
            this.addBatchChartData( cardsArray )
            }
        else if (type === "unselect") {
            this.addBatchChartData( cardsArray )
        }
    }

    // this handles unselecting players depending on the membership type sent
    batchUnselect(type){
        this.props.batchUnselect(type);
        this.props.selectedPlayers.filter(player => player.membershipStatus === type).forEach(broomballer => this.unselectPlayer(broomballer));
        this.selectAndTransform(this.props.selectedPlayers.filter(player => player.membershipStatus !== type), "unselect")
    }

    addBatchChartData(arrayOfPlayers) {
        if ( this.props.selectedGamesNum > 0 ) {
            let newObject = createChartData(arrayOfPlayers)
            this.props.batchChartUpdate(newObject)
        }
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
                            <h3 className="header_h3" onClick={()=> this.toggleViews(this.props.listOfPlayers)}> {this.props.listOfPlayers === "dead" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Select Players</h3>
                        </div>
                    </div>
                    <div className="content ">
                    {/* <div className={this.props.listOfPlayers + " content "}> */}
                        <div className={this.props.listOfPlayers + " select_all"}>
                            <div className="button_options_first_set">
                                <button className={"record_player_button all_button " + this.props.memberSelection} onClick={() => this.selectAllPlayers(this.props.memberSelection)}> Members {this.props.memberSelection === "unselected_member" ? <FontAwesomeIcon icon="plus" className="player_action_icon"/> : <FontAwesomeIcon icon="times" className="player_action_icon"/>}</button>
                                <button className={"record_player_button all_button " + this.props.tenBuckerSelection} onClick={() => this.selectAllPlayers(this.props.tenBuckerSelection)}> Ten Buckers {this.props.tenBuckerSelection === "unselected_non_member" ? <FontAwesomeIcon icon="plus" className="player_action_icon"/> : <FontAwesomeIcon icon="times" className="player_action_icon"/>}</button>
                            </div>
                            
                        </div>
                        <div className={"list_of_players " + this.props.listOfPlayers}>
                                {this.props.allPlayers.length > 0 ?
                                    this.props.allPlayers
                                    .filter(player => player.membershipStatus === "Member")
                                    .map(player => this.props.selectedPlayers.indexOf(player) === -1 ? 
                                    (<button key={player._id} className="unselected_member record_player_button" onClick={() => this.selectPlayer(player)}> {player.name} <FontAwesomeIcon icon="plus" className="player_action_icon"/> </button>)
                                    : 
                                    (<button key={player._id} className="selected_member record_player_button" onClick={() => this.unselectPlayer(player)}> {player.name} <FontAwesomeIcon icon="times" className="player_action_icon"/> </button>)
                                ) : <p className="no_game">There is currently no player to display</p> 
                                }
                                {this.props.allPlayers.length > 0 ?
                                    this.props.allPlayers
                                    .filter(player => player.membershipStatus !== "Member" && this.props.arrayOfTenBuckersID.includes(player._id))
                                    .map(player => this.props.selectedPlayers.indexOf(player) === -1 ? 
                                    (<button key={player._id} className="unselected_non_member record_player_button" onClick={() => this.selectPlayer(player)}> {player.name} <FontAwesomeIcon icon="plus" className="player_action_icon"/> </button>)
                                    : 
                                    (<button key={player._id} className="selected_non_member record_player_button" onClick={() => this.unselectPlayer(player)}> {player.name} <FontAwesomeIcon icon="times" className="player_action_icon"/> </button>)
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
    selectedGamesNum: state.stats.selectedGames ? state.stats.selectedGames.length : 0,
    selectedPlayers: state.stats.selectedPlayers,
    selectedPlayersNum: state.stats.selectedPlayers ? state.stats.selectedPlayers.length : 0,
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
        // sendDataToChart, 
        toggleSelectAll, 
        batchCardUpdate, 
        batchChartUpdate, 
        batchUnselect, 
        updatePlayers 
    }) (PlayerSelector)
