import React, {Component} from 'react';

import { connect } from 'react-redux';
import { fetchPlayers } from '../../js/actions/playerActions'
import { deletePlayer } from '../../js/actions/playerActions'
import { editForm } from '../../js/actions/playerActions'

import "./PlayerList.css"

class PlayerList extends Component {

    componentDidMount() {
        this.props.fetchPlayers()
        }
    
    deletePlayer(id){
        console.log("Need a warning that deleting is permanent...")
        console.log("Active/Inactive?")
        // this.props.deletePlayer(id)
    }
    sendPlayerToEditForm(player){
        this.props.editForm(player)
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                {this.props.players.map(player => {
                    return (
                        <tr key={player._id}> 
                            <td className="player_table">{player.name}</td>
                            <td className="player_table"> 
                                <button className="darker_color button_space_playerList" onClick={()=> this.sendPlayerToEditForm(player)}>Edit</button>
                                <button className="negative_color button_space_playerList" onClick={()=> this.deletePlayer(player._id)}>Delete</button> 
                            </td>
                        </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    players: state.players.players,
    player: state.players.player    
})

export default connect(mapStateToProps, { fetchPlayers, deletePlayer, editForm }) (PlayerList)
