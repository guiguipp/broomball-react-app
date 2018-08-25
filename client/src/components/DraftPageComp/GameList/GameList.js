import React, { Component } from "react";

import { connect } from 'react-redux';
import { fetchGames } from '../../../js/actions/gameActions'
import { getGame } from '../../../js/actions/gameActions'
import { deleteGame } from '../../../js/actions/gameActions'

import "./GameList.css";

class GameList extends Component {

    componentDidMount() {
        this.props.fetchGames();
    }

    getGameInfo = (gameId) => {
        this.props.getGame(gameId);
    }

    deleteGameFunc = (gameId) => {
        this.props.deleteGame(gameId);
    }

    render() {
        return (
            <div className="show_games">
            <h2 className="h2_main">{this.props.dateHeader}</h2>
                <div className="list-management">
                    {this.props.games.length < 1 ? (
                        <p className="no_game_message">There is currently no game to display. Schedule a game to start a draft!</p>) : (
                    this.props.games
                        .filter(game => {    
                            return this.props.today >= game._id
                            })
                        .map(game => 
                            <div key={game._id} className={this.props.past_visibility}>
                                <button className="btn game_button default_color" id={game._id}> {game._id} </button> 
                                <i className="fa fa-times-circle remove remove_game" id={game._id} onClick={() => this.deleteGameFunc(game._id)}> </i>
                            </div>)
                        )}
                    {this.props.games
                        .filter(game => {    
                            return this.props.today <= game._id                
                            })
                        .map(game =>
                                <div key={game._id} className={this.props.upcoming_visibility}>
                                    <button className="btn game_button default_color " id={game._id} onClick={() =>this.getGameInfo(game._id)}> {game._id} </button> 
                                    <i className="fa fa-times-circle remove remove_game" id={game._id} onClick={() => this.deleteGameFunc(game._id)}> </i>
                                </div>
                            ) 
                        }

                    </div>
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
    games: state.games.games,
    dateHeader: state.display.dateHeader,
    today: state.display.today,
    buttonMsg: state.display.buttonMsg,
    upcoming_visibility: state.display.upcoming_visibility,
    past_visibility: state.display.past_visibility
})

// export default GameList;
export default connect(mapStateToProps, { fetchGames, getGame, deleteGame }) (GameList)
