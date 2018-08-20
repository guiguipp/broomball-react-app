import React, { Component } from "react";

import { connect } from 'react-redux';
import { editGameInfo } from '../../js/actions/gameActions'

import "./Drafter.css";

class Drafter extends Component {

    componentDidMount() {

    }

    toggleAvailability(playerID, availability) {
        let gameId = this.props.draft._id
        let newAvailability;
        
        if (availability === true) {
            newAvailability = false
        }
        else {
            newAvailability = true
        }

        this.props.editGameInfo(gameId, {player: playerID, gameInfo: {available: newAvailability}})
        
    }
    render() {
        return (
            <div className="row">
                <div className="col col_no_bootstrap">
                </div>
                <div className="col col_no_bootstrap">
                    {this.props.draft.players ? (this.props.draft.players
                        .filter(player => player.gameInfo.available === true)
                        .map(player => {
                            return (
                                <div key={player._id}>
                                    <button className="player_button default_color">{player.name}</button>
                                    <i className="fa fa-times-circle remove remove_player" id={player._id} onClick={() => this.toggleAvailability(player._id, player.gameInfo.available)}> </i>
                                </div>
                                )
                                })
                        ) : (<p>Nothing yet...</p>)
                    }
                </div>
                <div className="col col_no_bootstrap">
                </div>

                {/* {this.props.players.filter(player => player.membershipStatus !== "Member").map(player => {
                            return (
                                <tr key={player._id}> 
                                    <td className="player_table">{player.name}</td>
                                    <td className="player_table"> 
                                        <button className="darker_color button_space_playerList" onClick={()=> this.sendPlayerToEditForm(player)}>Edit</button>
                                        <button className="negative_color button_space_playerList" onClick={()=> this.deletePlayer(player._id)}>Delete</button> 
                                    </td>
                                </tr>)
                            })
                        } */}
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
    draft: state.games.draft
})

export default connect(mapStateToProps, { editGameInfo }) (Drafter)
