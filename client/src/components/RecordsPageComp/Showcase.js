import React, { Component } from "react";
import { connect } from 'react-redux';

import { toggleViews } from "../../js/actions/statsActions"
import { toggleSortOptions } from "../../js/actions/statsActions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { togglePlayerModal } from "../../js/actions/statsActions"
import PlayerStatsModal from "./PlayerStatsModal"

import _ from "underscore"


class Showcase extends Component {
    toggleViews(currentStatus) {
        this.props.toggleViews(currentStatus, "sort")
    }
    toggleSort(tab, currentStatus, ascArrow){
        this.props.toggleSortOptions(tab, currentStatus, ascArrow)
    }
    
    showPlayerStats(playerName, playerID){
        // we need to filter games that the player has played to show relevant stats
        // we have sorted the gamesSelected array chronologically for convenience
        let playerStats = this.props.gamesInChronoOrder.reduce((broomballer, game) => {
            broomballer.name = playerName
            broomballer.gamesPlayed = broomballer.gamesPlayed || []
            broomballer.goals = broomballer.goals || []
            broomballer.assists = broomballer.assists || []
            if (game.players.filter(player => player._id === playerID && player.gameInfo.available === true).length !== 0) {
                broomballer.gamesPlayed.push(game._id)
                // we filter the array of players with the matching ID (it creates a remapped array of one element if applicable, 
                // gameInfo, therefore the data we want is at index 0 of gameInfo)
                let gameInfo = game.players.filter(player => player._id === playerID).map(player => player.gameInfo)
                broomballer.goals.push( gameInfo[0].goals )
                broomballer.assists.push( gameInfo[0].assists )
            }            
            return broomballer
            }, {});
        // creating the ChartJS object:    
        let playerInfo = {
            name: playerName,
            data: {
                labels: playerStats.gamesPlayed,
                datasets: [
                    {
                        label: "Goals",
                        data: playerStats.goals,
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
                        data: playerStats.assists,
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
        // sending the data to the modal
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
                            <button className={this.props.sortingOptions.lossesTab + " tab_button"} onClick={()=> this.toggleSort("losses", this.props.sortingOptions.lossesTab, this.props.sortingOptions.lossesAsc)}>Games Lost  <span className="sort_action_icon"> <FontAwesomeIcon icon="long-arrow-alt-down" className={this.props.sortingOptions.lossesDesc + " sorting_arrow"} /> <FontAwesomeIcon icon="long-arrow-alt-up" className={this.props.sortingOptions.lossesAsc + " sorting_arrow"} /> </span> </button>
                            <button className={this.props.sortingOptions.tiesTab + " tab_button"} onClick={()=> this.toggleSort("ties", this.props.sortingOptions.tiesTab, this.props.sortingOptions.tiesAsc)}>Games Tied  <span className="sort_action_icon"> <FontAwesomeIcon icon="long-arrow-alt-down" className={this.props.sortingOptions.tiesDesc + " sorting_arrow"} /> <FontAwesomeIcon icon="long-arrow-alt-up" className={this.props.sortingOptions.tiesAsc + " sorting_arrow"} /> </span> </button>
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
                                
                                    <div className="player_name">{object.name} <span className="position_dot"> <FontAwesomeIcon icon="circle" className={object.preferredPosition} /> </span></div>
                                    <div className="player_data">
                                        <p><span className="entry">Games Played:</span> <span className="value">{object.gamesPlayed}</span>/{this.props.selectedGames.length}</p>
                                        <p><span className="entry">W/L/T:</span> <span className="value">{ object.winPercent !== "N/A" ? object.winPercent + "%" : object.winPercent } - { object.lossPercent !== "N/A" ? object.lossPercent + "%" : object.lossPercent } - { object.tiePercent !== "N/A" ? object.tiePercent + "%" : object.tiePercent } </span> </p>
                                        <p><span className="entry">Goals:</span> <span className="value">{object.gamesPlayed !== 0 ? object.goals : "N/A"}</span>
                                        <br/><span className="addendum"> –– per game: <span className="value">{object.gamesPlayed !== 0 ? object.gpg : "N/A"}</span></span></p>
                                        <p><span className="entry">Assists:</span> <span className="value">{object.gamesPlayed !== 0 ? object.assists : "N/A"}</span>
                                        <br/><span className="addendum"> –– per game: <span className="value">{object.gamesPlayed !== 0 ? object.apg : "N/A"}</span></span></p>
                                    </div>
                                </div>
                            </div>
                            )}
                            ) : null }
                    </div>
                </div>
                <PlayerStatsModal isOpen={this.props.playerModal} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedGames: state.stats.selectedGames,
    gamesInChronoOrder: _.sortBy(state.stats.selectedGames,"_id"),
    selectedPlayers: state.stats.selectedPlayers,
    sortOptionsDisplay: state.stats.sortOptionsDisplay,
    playerRecords: state.stats.filteredPlayerRecords,
    sortingOptions: state.stats.sortingOptions,
    forwardSelection: state.stats.selectors.forwardSelection,
    defenseSelection: state.stats.selectors.defenseSelection,
    goalieSelection: state.stats.selectors.goalieSelection,
    positionVisibility: state.stats.selectors.positionVisibility,
    playerModal: state.stats.playerModal,
})

export default connect(mapStateToProps, { toggleViews, toggleSortOptions, togglePlayerModal, }) (Showcase)

