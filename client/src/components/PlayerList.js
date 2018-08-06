import React, {Component} from 'react';

import API from "../utils/API"
class PlayerList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            players: [],
            player: {}
        }
    }

    componentDidMount() {
        API.getPlayers()
            .then(res => {
                if(res.status !== 200) {
                    console.log("Error message: ", res.status)
                }
                else {
                    // console.log(res.data)
                    this.setState({...this.state, players: res.data})
                }
            })
        }
        deletePlayer(id){
            API.deletePlayer(id)
                .then(res => {
                    if(res.status !== 200) {
                        console.log("Erros message: ", res.status)
                    }
                    else {
                        console.log("Need to substract res.data from this.state.players")
                    }
                })
        }

    render() {
        return (
            <div>
                <ul>
                {this.state.players.map(player => {
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

export default PlayerList;