import React, { Component } from "react";

import { connect } from 'react-redux';
import { lockGameInfo } from "../../js/actions/gameActions"
import { unlockGameInfo } from "../../js/actions/gameActions"

import "./Locker.css";

class Locker extends Component {

    lockGame(game) {
        this.props.lockGameInfo(game)
    }

    unlockGame(game){
        this.props.unlockGameInfo(game)
    }

    render() {
        return (
            <div className={this.props.visibility.bottom === "visible" ? "visible row " : "hidden row"}>
                <div className="container">
                    <div className="row">    
                        <div className="col text-center">
                            <button className="content_button lock unlocked" onClick={() => this.unlockGame(this.props.gameDate)}><i className="fa fa-unlock-alt bigger_fa_lock"></i></button> 
                            <button className="content_button lock locked" onClick={() => this.lockGame(this.props.gameDate)}><i className="fa fa-lock bigger_fa_lock"></i></button> 
                        </div>
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
