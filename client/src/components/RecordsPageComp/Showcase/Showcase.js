import React, { Component } from "react";
import { connect } from 'react-redux';

import { toggleViews } from "../../../js/actions/statsActions"
import { toggleSortOptions } from "../../../js/actions/statsActions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { playerStatObject } from "../../../js/actions/statsActions"
import "./Showcase.css";

class Showcase extends Component {
    toggleViews(currentStatus) {
        this.props.toggleViews(currentStatus, "sort")
    }
    toggleSort(tab, currentStatus, ascArrow){
        this.props.toggleSortOptions(tab, currentStatus, ascArrow)
    }
    render() {
        return (
            <div className="full">
                <div className="header">
                    <div>
                        <h3 className="header_h3 " onClick={()=> this.toggleViews(this.props.sortOptionsDisplay)}> {this.props.sortOptionsDisplay === "hidden" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Sort options</h3>
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
                    <div className="records">
                    {this.props.playerRecords ? this.props.playerRecords.map(object => {
                        return (
                            <div key={object._id} className={object.membershipStatus === "Member" ? "member_record player_card" : "non_member_record player_card "}>
                                <p className="player_name">{object.name}</p>
                                <p><span className="entry">Games Played:</span> <span className="value">{object.gamesPlayed}</span>/{this.props.selectedGames.length}</p>
                                <p><span className="entry">Games Won:</span> <span className="value">{ object.winPercent !== "N/A" ? object.winPercent + "%" : object.winPercent } </span> </p>
                                <p><span className="entry">Goals:</span> <span className="value">{object.gamesPlayed !== 0 ? object.goals : "N/A"}</span>
                                <br/><span className="addendum"> –– per game: <span className="value">{object.gamesPlayed !== 0 ? object.gpg : "N/A"}</span></span></p>
                                <p><span className="entry">Assists:</span> <span className="value">{object.gamesPlayed !== 0 ? object.assists : "N/A"}</span>
                                <br/><span className="addendum"> –– per game: <span className="value">{object.gamesPlayed !== 0 ? object.apg : "N/A"}</span></span></p>
                            </div>
                            )}
                            ) : null }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedGames: state.stats.selectedGames,
    selectedPlayers: state.stats.selectedPlayers,
    sortOptionsDisplay: state.stats.sortOptionsDisplay,
    playerRecords: state.stats.playerRecords,
    sortingOptions: state.stats.sortingOptions
})

export default connect(mapStateToProps, { toggleViews, toggleSortOptions }) (Showcase)
