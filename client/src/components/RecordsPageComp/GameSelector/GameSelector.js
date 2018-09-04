import React, { Component } from "react";

import { connect } from 'react-redux';
import { fetchGames } from '../../../js/actions/gameActions'


import "./GameSelector.css";

class GameSelector extends Component {

    componentDidMount() {
        this.props.fetchGames();
    }

    render() {
        return (
            <div className="list_of_games">
                    {this.props.pastGames.length > 0 ?
                        this.props.pastGames
                            .map(game => 
                                <div key={game._id}>
                                    <button className="btn past_game_button contrast_color" onClick={() =>this.getGameInfo(game._id)}> {game._id} </button> 
                                </div>
                                )
                            :
                            <p className="no_game">There is currently no game to display</p>
                    }
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
    pastGames: state.games.pastGames
})

// export default GameList;
export default connect(mapStateToProps, { fetchGames }) (GameSelector)
