import React, { Component } from "react";
import { connect } from 'react-redux';

import { toggleViews } from "../../../js/actions/statsActions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { playerStatObject } from "../../../js/actions/statsActions"
import "./Showcase.css";

class Showcase extends Component {
    toggleViews(currentStatus) {
        this.props.toggleViews(currentStatus, "sort")
    }

    render() {
        return (
            <div className="full">
                <div className="header">
                    <div>
                        <h3 className="header_h3 " onClick={()=> this.toggleViews(this.props.sortOptionsDisplay)}> {this.props.sortOptionsDisplay === "hidden" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Stats</h3>
                    </div>
                </div>
                <div className="content">
                    <div className={"list_of_options " + this.props.sortOptionsDisplay}>
                    Options Will Be Here:
                    </div>
                    <div className="records">
                    {this.props.playerRecords ? this.props.playerRecords.map(object => {
                        return (
                            <div key={object._id} className={object.membershipStatus === "Member" ? "member_record player_card" : "non_member_record player_card "}>
                                <p className="player_name">{object.name}</p>
                                <p><span className="entry">Games Played:</span> <span className="value">{object.gamesPlayed}</span>/{this.props.selectedGames.length}</p>
                                <p><span className="entry">Games Won:</span> <span className="value">{ object.winPercent !== "N/A" ? object.winPercent + "%" : object.winPercent } </span> </p>
                                <p><span className="entry">Goals:</span> <span className="value">{object.gamesPlayed !== 0 ? object.goals : "N/A"}</span>
                                <br/><span className="addendum"> –– per game: <span className="value">{object.gamesPlayed !== 0 ? (object.goals / object.gamesPlayed).toFixed(2) : "N/A"}</span></span></p>
                                <p><span className="entry">Assists:</span> <span className="value">{object.gamesPlayed !== 0 ? object.assists : "N/A"}</span>
                                <br/><span className="addendum"> –– per game: <span className="value">{object.gamesPlayed !== 0 ? (object.assists / object.gamesPlayed).toFixed(2) : "N/A"}</span></span></p>
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
    playerRecords: state.stats.playerRecords
})

export default connect(mapStateToProps, { toggleViews, /*playerStatObject*/ }) (Showcase)
