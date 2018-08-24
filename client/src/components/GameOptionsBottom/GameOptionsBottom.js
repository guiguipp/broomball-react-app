import React, { Component } from "react";

import { connect } from 'react-redux';
import { lockGameInfo } from "../../js/actions/gameActions"
import { unlockGameInfo } from "../../js/actions/gameActions"
// import { editGameInfo } from '../../js/actions/gameActions'

import "./GameOptionsBottom.css";

class GameOptionsBottom extends Component {

    lockGame(game) {
        this.props.lockGameInfo(game)
    }

    unlockGame(game){
        this.props.unlockGameInfo(game)
    }


    render() {
        return (
            <div className={"row " + this.props.visibility}>
                <div className={"container " + this.props.visibility}>
                        <div className="row">
                            <div className="col text-center">
                                <button className="btn btn-info navbar-btn regular_grey computer_draft menu_options" id="picks_dark">Set Dark Picks</button> 
                            </div>
                            <div className="col text-center">
                                
                            </div>
                            <div className="col text-center">
                                <button className="btn btn-info navbar-btn light_grey menu_options" id="reset">Reset</button> 
                            </div>
                            <div className="col text-center">
                                
                            </div>
                            <div className="col text-center">
                                <button className="btn btn-info navbar-btn regular_grey computer_draft menu_options" id="picks_white">Set White Picks</button> 
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col text-center">
                                <button className="btn btn-info navbar-btn dark_grey js_draft menu_options" id="autodraft">Autodraft</button> 
                            </div>
                            <div className="col text-center">
                                <button className="btn btn-info navbar-btn dark_grey js_draft menu_options" id="alternate_draft">Alternate Draft</button> 
                            </div>
                            <div className="col text-center">
                                <button className="btn btn-info navbar-btn dark_grey js_draft menu_options" id="serpentine_draft">Serpentine Draft</button> 
                            </div>
                        </div>
                    </div>

                <div className={"container " + this.props.visibility}>
                    <div className="container">
                        <div className="row">    
                            <div className="col text-center">
                                <button className="lock unlocked" onClick={() => this.unlockGame(this.props.gameDate)}><i className="fa fa-unlock-alt bigger_fa_lock"></i></button> 
                                <button className="lock locked" onClick={() => this.lockGame(this.props.gameDate)}><i className="fa fa-lock bigger_fa_lock"></i></button> 
                            </div>
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
    visibility: state.games.visibility
})

export default connect(mapStateToProps, { lockGameInfo, unlockGameInfo }) (GameOptionsBottom)
