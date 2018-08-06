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
                    console.log(res.data)
                    this.setState({...this.state, players: res.data})
                }
            })
        }


    render() {
        return (
            <div>
                <ul>
                {this.state.players.map(player => {
                    return <li key={player._id}>{player.name}</li>
                    })
                }
                </ul>
            </div>
        )
    }
}

export default PlayerList;