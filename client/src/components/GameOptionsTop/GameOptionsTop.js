import React, { Component } from "react";

import { connect } from 'react-redux';
import { showUnavailable } from '../../js/actions/gameActions'
// import { addNonMembers } from '../../js/actions/gameActions'
import { showNonMembers } from '../../js/actions/gameActions'

import "./GameOptionsTop.css";

class GameOptionsTop extends Component {

    
    showUnavailable(){
        this.props.showUnavailable()
    }
    addTenBuckers(){
        let tenBuckers = this.props.players.filter((player) => player.membershipStatus !== "Member")
        this.props.showNonMembers(tenBuckers)
    }
    render() {
        return (
            <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <button className="darker_color game_options" onClick={()=> this.showUnavailable()}>Show unavailable</button> 
                            </div>
                            <div className="col text-center">
                                <button className="darker_color game_options" onClick={()=> this.addTenBuckers()}>Add Non-Members</button> 
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
    players: state.players.players
})

export default connect(mapStateToProps, { showUnavailable, showNonMembers }) (GameOptionsTop)
