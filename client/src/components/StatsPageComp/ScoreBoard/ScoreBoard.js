import React, {Component} from 'react';

import { connect } from 'react-redux';
// import { fetchPlayers } from '../../../js/actions/playerActions'
// import { deletePlayer } from '../../../js/actions/playerActions'
// import { editForm } from '../../../js/actions/playerActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./ScoreBoard.css"

class ScoreBoard extends Component {


    render() {
        return (
            <div className="table_container">
                <table>
                    <tbody>
                    <th class="table_col_name">Player</th> 
                            <th class="table_col_name">Goals</th>
                            <th class="table_col_name">Assists</th>
                    {this.props.players ? (this.props.players
                        .filter(player => player.gameInfo.available === true && player.gameInfo.team === "Dark")
                        .map(player => {
                            return (
                                <tr key={player._id}> 
                                    <td className="table player_stats">{player.name}
                                    </td>
                                    <td className="table player_stats">
                                        <div className="stats">
                                            <FontAwesomeIcon icon="plus-circle" size="2x" className="darker_icon" />
                                            <div className="data">{player.gameInfo.goals}</div> 
                                            <FontAwesomeIcon icon="minus-circle" size="2x" className="darker_icon" />
                                        </div>
                                    </td>

                                    <td className="table player_stats">
                                        <div className="stats">
                                            <FontAwesomeIcon icon="plus-circle" size="2x" className="lighter_icon" />
                                            <div className="data">{player.gameInfo.assists}</div> 
                                            <FontAwesomeIcon icon="minus-circle" size="2x" className="lighter_icon" />
                                        </div>
                                    </td>
                                </tr>
                                )
                            })
                        ) : <tr>Data has not populated yet</tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    game: state.games.draft,
    players: state.games.draft.players,
})

export default connect(mapStateToProps, /*{ fetchPlayers, deletePlayer, editForm }*/) (ScoreBoard)
