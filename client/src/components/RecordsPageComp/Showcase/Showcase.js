import React, { Component } from "react";
import { connect } from 'react-redux';

import { toggleViews } from "../../../js/actions/statsActions"
import { toggleSortOptions } from "../../../js/actions/statsActions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { togglePositions } from "../../../js/actions/statsActions"
import { togglePlayerModal } from "../../../js/actions/statsActions"
// import { dataForPlayerModal } from "../../../js/actions/statsActions"

import PlayerStatsModal from "../PlayerStatsModal"

import "./Showcase.css";

class Showcase extends Component {
    toggleViews(currentStatus) {
        this.props.toggleViews(currentStatus, "sort")
    }
    toggleSort(tab, currentStatus, ascArrow){
        this.props.toggleSortOptions(tab, currentStatus, ascArrow)
    }
    selectByPosition(position) {
        this.props.togglePositions(position)
    }
    showPlayerStats(playerName, playerID){
        console.log("PlayerID: ", playerID)
        let noGameInfo = {assists: 0, available: false, darkPickNum: 0, goals: 0, team: "N/A", whitePickNum: 0}
        // mapping the gameInfo nested Object for each game selected
        let performance = this.props.selectedGames.map(game => game.players.filter(player => player._id === playerID)).map(array => array[0] ? array[0].gameInfo : noGameInfo)
        // creating a ChartJS object:
        let playerInfo = {
            name: playerName,
            data: {
                labels: this.props.selectedGames.map(game => game._id),
                datasets: [
                    {
                        label: "Goals",
                        data: performance.map(game => game.goals),
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 0.6)',
                        borderWidth: 1,
                        fill: false,
                        hoverBackgroundColor: 'rgba(255, 99, 132, 0.6)',
                        hoverBorderColor: 'rgba(255, 99, 132, 0.6)',
                        lineTension: 0,
                    },
                    {
                        label: "Assists",
                        data: performance.map(game => game.assists),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 0.6)',
                        borderWidth: 1,
                        fill: false,
                        hoverBackgroundColor: 'rgba(54, 162, 235, 0.6)',
                        hoverBorderColor: 'rgba(54, 162, 235, 0.6)',
                        lineTension: 0,
                    }
                ]
            }
        };
        this.props.togglePlayerModal(true, playerInfo)
    }
    
    render() {
        return (
            <div className="full">
                <div className="header">
                    <div>
                        <h3 className="header_h3 " onClick={()=> this.toggleViews(this.props.sortOptionsDisplay)}> {this.props.sortOptionsDisplay === "hidden" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Sorting Options</h3>
                    </div>
                </div>
                <div className="content">
                    
                    <div className={"list_of_options " + this.props.sortOptionsDisplay}>
                        
                            <button className={this.props.sortingOptions.azTab + " tab_button"} onClick={()=> this.toggleSort("az", this.props.sortingOptions.azTab, this.props.sortingOptions.alphaAsc)}>A-Z <span className="sort_action_icon"> <FontAwesomeIcon icon="long-arrow-alt-down" className={this.props.sortingOptions.alphaDesc + " sorting_arrow"} /> <FontAwesomeIcon icon="long-arrow-alt-up" className={this.props.sortingOptions.alphaAsc + " sorting_arrow"} /> </span> </button>
                            <button className={this.props.sortingOptions.gamesTab + " tab_button"} onClick={()=> this.toggleSort("games", this.props.sortingOptions.gamesTab, this.props.sortingOptions.gamesAsc)}>Games Played  <span className="sort_action_icon"> <FontAwesomeIcon icon="long-arrow-alt-down" className={this.props.sortingOptions.gamesDesc + " sorting_arrow"} /> <FontAwesomeIcon icon="long-arrow-alt-up" className={this.props.sortingOptions.gamesAsc + " sorting_arrow"} /> </span> </button>
                            <button className={this.props.sortingOptions.winsTab + " tab_button"} onClick={()=> this.toggleSort("wins", this.props.sortingOptions.winsTab, this.props.sortingOptions.winsAsc)}>Games Won  <span className="sort_action_icon"> <FontAwesomeIcon icon="long-arrow-alt-down" className={this.props.sortingOptions.winsDesc + " sorting_arrow"} /> <FontAwesomeIcon icon="long-arrow-alt-up" className={this.props.sortingOptions.winsAsc + " sorting_arrow"} /> </span> </button>
                            <button className={this.props.sortingOptions.goalsTab + " tab_button"} onClick={()=> this.toggleSort("goals", this.props.sortingOptions.goalsTab, this.props.sortingOptions.goalsAsc)}>Goals  <span className="sort_action_icon"> <FontAwesomeIcon icon="long-arrow-alt-down" className={this.props.sortingOptions.goalsDesc + " sorting_arrow"} /> <FontAwesomeIcon icon="long-arrow-alt-up" className={this.props.sortingOptions.goalsAsc + " sorting_arrow"} /> </span> </button>
                            <button className={this.props.sortingOptions.gpgTab + " tab_button"} onClick={()=> this.toggleSort("gpg", this.props.sortingOptions.gpgTab, this.props.sortingOptions.gpgAsc)}>GPG  <span className="sort_action_icon"> <FontAwesomeIcon icon="long-arrow-alt-down" className={this.props.sortingOptions.gpgDesc + " sorting_arrow"} /> <FontAwesomeIcon icon="long-arrow-alt-up" className={this.props.sortingOptions.gpgAsc + " sorting_arrow"} /> </span> </button>
                            <button className={this.props.sortingOptions.assistsTab + " tab_button"} onClick={()=> this.toggleSort("assists", this.props.sortingOptions.assistsTab, this.props.sortingOptions.assistsAsc)}>Assists  <span className="sort_action_icon"> <FontAwesomeIcon icon="long-arrow-alt-down" className={this.props.sortingOptions.assistsDesc + " sorting_arrow"} /> <FontAwesomeIcon icon="long-arrow-alt-up" className={this.props.sortingOptions.assistsAsc + " sorting_arrow"} /> </span> </button>
                            <button className={this.props.sortingOptions.apgTab + " tab_button"} onClick={()=> this.toggleSort("apg", this.props.sortingOptions.apgTab, this.props.sortingOptions.apgAsc)}>APG <span className="sort_action_icon"> <FontAwesomeIcon icon="long-arrow-alt-down" className={this.props.sortingOptions.apgDesc + " sorting_arrow"} /> <FontAwesomeIcon icon="long-arrow-alt-up" className={this.props.sortingOptions.apgAsc + " sorting_arrow"} /> </span> </button>
                    
                    </div>
                    <div className="records ">
                    {this.props.playerRecords ? this.props.playerRecords.map(object => {
                        return (
                            <div key={object._id} className={object.preferredPosition === this.props.positionVisibility ? "hidden_card wrapping_card_div" : "visible wrapping_card_div" } onClick={()=> this.showPlayerStats(object.name, object._id)}>
                                <div className={object.membershipStatus === "Member" ? "member_record player_card " : "non_member_record player_card"}>
                                
                                    <div className="player_name">{object.name} <span className="position_dot"> <FontAwesomeIcon icon="circle" className={"dot_" + object.preferredPosition} /> </span></div>
                                    <div className="player_data">
                                        <p><span className="entry">Games Played:</span> <span className="value">{object.gamesPlayed}</span>/{this.props.selectedGames.length}</p>
                                        <p><span className="entry">W/L/T:</span> <span className="value">{ object.winPercent !== "N/A" ? object.winPercent + "%" : object.winPercent } - { object.lossPercent !== "N/A" ? object.lossPercent + "%" : object.lossPercent } - { object.tiePercent !== "N/A" ? object.tiePercent + "%" : object.tiePercent } </span> </p>
                                        {/* <p><span className="entry">Games Lost:</span> <span className="value">{ object.lossPercent !== "N/A" ? object.lossPercent + "%" : object.lossPercent } </span> </p>
                                        <p><span className="entry">Games Tied:</span> <span className="value">{ object.tiePercent !== "N/A" ? object.tiePercent + "%" : object.tiePercent } </span> </p> */}
                                        <p><span className="entry">Goals:</span> <span className="value">{object.gamesPlayed !== 0 ? object.goals : "N/A"}</span>
                                        <br/><span className="addendum"> –– per game: <span className="value">{object.gamesPlayed !== 0 ? object.gpg : "N/A"}</span></span></p>
                                        <p><span className="entry">Assists:</span> <span className="value">{object.gamesPlayed !== 0 ? object.assists : "N/A"}</span>
                                        <br/><span className="addendum"> –– per game: <span className="value">{object.gamesPlayed !== 0 ? object.apg : "N/A"}</span></span></p>
                                    </div>
                                </div>
                            </div>
                            )}
                            ) : null }
                            <div className={this.props.sortOptionsDisplay + " select_all"}>
                                <div className="button_options_second_set">
                                    <button className={"btn record_player_button hide_button " + this.props.forwardSelection} onClick={() => this.selectByPosition(this.props.forwardSelection)} > {this.props.positionVisibility === "Forward" ? "Unhide" : "Hide"} Offense</button>
                                    <button className={"btn record_player_button hide_button " + this.props.goalieSelection} onClick={() => this.selectByPosition(this.props.goalieSelection)} > {this.props.positionVisibility === "Goalie" ? "Unhide" : "Hide"} Goalies</button>
                                    <button className={"btn record_player_button hide_button " + this.props.defenseSelection} onClick={() => this.selectByPosition(this.props.defenseSelection)} > {this.props.positionVisibility === "Defense" ? "Unhide" : "Hide"} Defense</button>
                                </div>
                            </div>
                    </div>
                </div>
                <PlayerStatsModal isOpen={this.props.playerModal} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedGames: state.stats.selectedGames,
    selectedPlayers: state.stats.selectedPlayers,
    sortOptionsDisplay: state.stats.sortOptionsDisplay,
    playerRecords: state.stats.filteredPlayerRecords,
    sortingOptions: state.stats.sortingOptions,
    forwardSelection: state.stats.selectors.forwardSelection,
    defenseSelection: state.stats.selectors.defenseSelection,
    goalieSelection: state.stats.selectors.goalieSelection,
    positionVisibility: state.stats.selectors.positionVisibility,
    playerModal: state.stats.playerModal
})

export default connect(mapStateToProps, { toggleViews, toggleSortOptions, togglePositions, togglePlayerModal, /*dataForPlayerModal*/ }) (Showcase)

