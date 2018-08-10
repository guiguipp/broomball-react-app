import React, {Component} from 'react';

import { connect } from 'react-redux';
import { fetchPlayers } from '../js/actions/playerActions'
import { deletePlayer } from '../js/actions/playerActions'

class PlayerList extends Component {

    componentDidMount() {
        this.props.fetchPlayers()
        }
    
    deletePlayer(id){
        this.props.deletePlayer(id)
    }

    render() {
        return (
            <div>
                <ul>
                {this.props.players.map(player => {
                    return (
                    <li key={player._id} >{player.name} ({player._id})
                        <button onClick={()=> this.deletePlayer(player._id)}>Delete</button> 
                        <button>Edit</button>
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

export default connect(mapStateToProps, { fetchPlayers, deletePlayer }) (PlayerList)
