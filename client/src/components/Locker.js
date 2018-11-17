import React, { Component } from "react";

import { connect } from 'react-redux';
import { lockGameInfo } from "../js/actions/gameActions"
import { unlockGameInfo } from "../js/actions/gameActions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Locker extends Component {

    lockGame(game) {
        this.props.lockGameInfo(game)
    }

    unlockGame(game){
        this.props.unlockGameInfo(game)
    }

    render() {
        return (
            <div className={this.props.visibility.bottom === "visible" ? "visible" : "hidden"}>
                <div className="text-center lock_icons_container">
                    <div className="left_lock">
                        <button className={this.props.lockStatus === "visible" ? "locked content_button lock" : "unlocked content_button lock"} onClick={() => this.unlockGame(this.props.gameDate)}><FontAwesomeIcon icon="unlock-alt" /></button> 
                    </div>
                    <div className="right_lock">
                        <button className={this.props.lockStatus === "visible" ? "unlocked content_button lock" : "locked content_button lock"} onClick={() => this.lockGame(this.props.gameDate)}><FontAwesomeIcon icon="lock"/></button> 
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
    gameDate: state.games.gameDate,
    visibility: state.games.visibility,
    lockStatus: state.games.lockStatus,
    draftMode: state.games.draftMode,
    // noStatsMessage: state.stats.visibility,
})

export default connect(mapStateToProps, { lockGameInfo, unlockGameInfo }) (Locker)
