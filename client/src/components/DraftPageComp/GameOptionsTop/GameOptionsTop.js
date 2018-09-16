import React, { Component } from "react";

import { connect } from 'react-redux';
import { showUnavailable } from '../../../js/actions/gameActions'
import { hideUnavailable } from '../../../js/actions/gameActions'
import { showNonMembers } from '../../../js/actions/gameActions'
import { hideNonMembers } from '../../../js/actions/gameActions'


import "./GameOptionsTop.css";

class GameOptionsTop extends Component {
    
    unavailable(action){
        if (action === "Show") {
            /*let members = this.props.players.filter(player => player.membershipStatus === "Member")
            let playingMembers = this.props.gameParticipants.map(player => player._id)
            let notPlayingMembers = members.filter(player => playingMembers.indexOf(player._id) === -1)
            console.log("notPlayingMembers: ", notPlayingMembers)
            // this.props.showUnavailable(notPlayingMembers)*/
            this.props.showUnavailable()
        }
        else {
            this.props.hideUnavailable()
        }
    }
    tenBuckers(action){
        /* This filters all players in the DB according to their membershipStatus
        It then gets the id of all ten_buckers already playing (that we set when we fetch the game data in GameList.js
        via the reducer). We check the former against the latter to see who's left to potentially add */
        if (action === "Show") {
            let tenBuckers = this.props.players.filter((player) => player.membershipStatus !== "Member")
            let arrayOfIds = this.props.playingNonMembers.map(player => player._id)    
            let newTenBuckers = tenBuckers.filter((player) => arrayOfIds.indexOf(player._id) === -1)
            this.props.showNonMembers(tenBuckers, newTenBuckers)
        }
        else {
            this.props.hideNonMembers()
        }
        
    }
    render() {
        return (
            <div className="container button_container">
                        <div className="row">
                            <div className="col text-center">
                                <button className="content_button darker_color game_options" onClick={()=> this.unavailable(this.props.showingUnavailableMembers)}>{this.props.showingUnavailableMembers} Unavailable</button> 
                            </div>
                            <div className="col text-center">
                                <button className="content_button darker_color game_options" onClick={()=> this.tenBuckers(this.props.showingNonPlayingTenBuckers)}>{this.props.showingNonPlayingTenBuckers} Non-Members</button> 
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
    gameParticipants: state.games.draft.players,
    playingNonMembers: state.games.playingNonMembers,
    showingNonPlayingTenBuckers: state.games.showingNonPlayingTenBuckers,
    showingUnavailableMembers: state.games.showingUnavailableMembers
})

export default connect(mapStateToProps, { showUnavailable, hideUnavailable, showNonMembers, hideNonMembers }) (GameOptionsTop)
