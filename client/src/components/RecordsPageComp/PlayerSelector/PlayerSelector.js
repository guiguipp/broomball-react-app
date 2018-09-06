import React, { Component } from "react";

import { connect } from 'react-redux';
import { fetchPlayers } from '../../../js/actions/playerActions'
import { selectPlayer } from '../../../js/actions/statsActions'
import { unselectPlayer } from '../../../js/actions/statsActions'

import { toggleViews } from '../../../js/actions/statsActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./PlayerSelector.css";

class PlayerSelector extends Component {

    componentDidMount() {
        this.props.fetchPlayers();
    }

    unselectPlayer(player) {
        this.props.unselectPlayer(player)
    }

    selectPlayer(player) {
        this.props.selectPlayer(player)
    }

    toggleViews(currentStatus){
        this.props.toggleViews(currentStatus, "players")
    }

    render() {
        return (
                <div className="full">
                    <div className="header">
                        <div>
                            <h3 className="header_h3" onClick={()=> this.toggleViews(this.props.listOfPlayers)}> {this.props.listOfPlayers === "hidden" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Select Players</h3>
                        </div>
                    </div>
                    <div className="content">
                        <div className={"list_of_players " + this.props.listOfPlayers}>
                                {this.props.allPlayers.length > 0 ?
                                    this.props.allPlayers
                                    .filter(player => player.membershipStatus === "Member")
                                    .map(player => this.props.selectedPlayers.indexOf(player) === -1 ? 
                                    (<button key={player._id} className="btn unselected_member record_player_button" onClick={() => this.selectPlayer(player)}> {player.name} <FontAwesomeIcon icon="plus" className="player_action_icon"/> </button>)
                                    : 
                                    (<button key={player._id} className="btn selected_member record_player_button" onClick={() => this.unselectPlayer(player)}> {player.name} <FontAwesomeIcon icon="times" className="player_action_icon"/> </button>)
                                ) : <p className="no_game">There is currently no player to display</p> 
                                }
                                {this.props.allPlayers.length > 0 ?
                                    this.props.allPlayers
                                    .filter(player => player.membershipStatus !== "Member")
                                    .map(player => this.props.selectedPlayers.indexOf(player) === -1 ? 
                                    (<button key={player._id} className="btn unselected_non_member record_player_button" onClick={() => this.selectPlayer(player)}> {player.name} <FontAwesomeIcon icon="plus" className="player_action_icon"/> </button>)
                                    : 
                                    (<button key={player._id} className="btn selected_non_member record_player_button" onClick={() => this.unselectPlayer(player)}> {player.name} <FontAwesomeIcon icon="times" className="player_action_icon"/> </button>)
                                ) : <p className="no_game">There is currently no player to display</p> 
                                }
                        </div>
                    </div>
                </div>
                )
            }
        }

const mapStateToProps = state => ({
    selectedPlayers: state.stats.selectedPlayers,
    unselectedPlayers: state.stats.unselectedPlayers,
    allPlayers: state.players.players,
    listOfPlayers: state.stats.listOfPlayers
})

export default connect(mapStateToProps, { fetchPlayers, selectPlayer, unselectPlayer, toggleViews }) (PlayerSelector)
