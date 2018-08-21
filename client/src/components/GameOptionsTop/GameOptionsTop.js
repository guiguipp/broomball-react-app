import React, { Component } from "react";

import { connect } from 'react-redux';
import { showUnavailable } from '../../js/actions/gameActions'
import { showNonMembers } from '../../js/actions/gameActions'


import "./GameOptionsTop.css";

class GameOptionsTop extends Component {
    
    showUnavailable(){
        this.props.showUnavailable()
    }
    addTenBuckers(){
        let tenBuckers = this.props.players
            .filter((player) => player.membershipStatus !== "Member")
        let arrayOfIds = this.props.playingTenBuckers.map(player => player._id)    
        /*
        This works, but using "push"

        let newTenBuckers = []
        tenBuckers.forEach((player) => {
            if(arrayOfIds.indexOf(player._id) === -1) {
                newTenBuckers.push(player)
            }
        })*/
        let newTenBuckers = tenBuckers.filter((player) => arrayOfIds.indexOf(player._id) === -1)
        this.props.showNonMembers(newTenBuckers)
        /* 
        When choosing a new game, it's showing the ten buckers & unavailable players from previous game 
        (because still in state? if so, just need to reinitiate in the reducer)
        */
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
    players: state.players.players,
    playingTenBuckers: state.games.playingTenBuckers
})

export default connect(mapStateToProps, { showUnavailable, showNonMembers }) (GameOptionsTop)
