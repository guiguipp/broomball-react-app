import React, {Component} from 'react';

import { connect } from 'react-redux';
import { fetchPlayers } from '../../js/actions/playerActions'
import { deletePlayer } from '../../js/actions/playerActions'
import { editForm } from '../../js/actions/playerActions'
import { loadState } from '../sessionStorage'

class MemberList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMember: true,
            deleteMember: false,
        }
    }
    
    componentDidMount() {
        this.props.fetchPlayers()
        const privileges = loadState()
        this.setState(privileges)
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
                <table className="player_table">
                    <tbody>
                    {this.props.players.filter(player => player.membershipStatus === "Member").map(player => {
                            return (
                                <tr key={player._id} className="player_table_row"> 
                                    <td className="player_table_data player_table_name">{player.name}</td>
                                    <td className="player_table_data player_manage_buttons"> 
                                        {this.state.editMember === true ? <button className="content_button darker_color button_space_playerList" onClick={()=> this.sendPlayerToEditForm(player)}>Edit</button> : <button className="content_button light_grey button_space_playerList"> Edit </button>}
                                        {this.state.deleteMember === true ? <button className="content_button negative_color button_space_playerList" onClick={()=> this.deletePlayer(player._id)}>Delete</button> : <button className="content_button regular_grey button_space_playerList"> Delete </button> }
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

export default connect(mapStateToProps, { fetchPlayers, deletePlayer, editForm }) (MemberList)
