import React, {Component} from 'react';

import { connect } from 'react-redux';
import { fetchPlayers } from '../js/actions/playerActions'
import { deletePlayer } from '../js/actions/playerActions'
import { editForm } from '../js/actions/playerActions'

class PlayerList extends Component {

    componentDidMount() {
        this.props.fetchPlayers()
        }
    
    deletePlayer(id){
        this.props.deletePlayer(id)
    }
    sendPlayerToEditForm(player){
        console.log("Info of player to edit: ", player)
        this.props.editForm(player)
        /* 
        - Show add player tab
        – have it say edit player
        - feed state from data of player to edit
        - edit player in db
        – reinitiate state
        */
    }

    render() {
        return (
            <div>
                <ul>
                {this.props.players.map(player => {
                    return (
                    <li key={player._id} >{player.name} ({player._id})
                        <button onClick={()=> this.deletePlayer(player._id)}>Delete</button> 
                        <button onClick={()=> this.sendPlayerToEditForm(player)}>Edit</button>
                    </li> )
                    })
                }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    players: state.players.players,
    player: state.players.player    
})

export default connect(mapStateToProps, { fetchPlayers, deletePlayer, editForm }) (PlayerList)
