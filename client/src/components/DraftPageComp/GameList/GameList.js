import React, { Component } from "react";

import { connect } from 'react-redux';
import { fetchGames } from '../../../js/actions/gameActions'
import { getGame } from '../../../js/actions/gameActions'
import { deleteGame } from '../../../js/actions/gameActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
            <h2 className="h2_main">{this.props.dateHeader} Games</h2>
                <div className="list-management">
                    {/* showing the upcoming games when mode has been  */}
                    {this.props.dateHeader === "Upcoming" ? (
                        // need case for when there is no game scheduled
                        this.props.upcomingGames.length > 0 ?
                        this.props.upcomingGames
                            .map(game =>
                                <div key={game._id}>
                                    <button className="btn game_button default_color " onClick={() =>this.getGameInfo(game._id)}> {game._id} </button> 
                                    <FontAwesomeIcon icon="times-circle" className={"remove remove_game"} onClick={() => this.deleteGameFunc(game._id)} />
                                </div>
                                )
                            :
                            <p className="no_game">There is currently no game to display for the selected time span.<br />
                            Create a game to start drafting teams!</p>
                    ) : 
                    (
                        this.props.pastGames.length > 0 ?
                        this.props.pastGames
                            .map(game => 
                                <div key={game._id}>
                                    <button className="btn game_button default_color" onClick={() =>this.getGameInfo(game._id)}> {game._id} </button> 
                                </div>
                                )
                            :
                            <p className="no_game">There is currently no game to display for the selected time span.<br />
                            Create a game to start drafting teams!</p>

                    )}
                    {/* {this.props.games.length < 1 ? (
                        <p className="no_game_message">There is currently no game to display. You might need to refresh your browser or check your connection to see games</p>) : (
                    this.props.games
                        .filter(game => {    
                            return this.props.today >= game._id
                            })
                        .map(game => 
                            <div key={game._id} className={this.props.past_visibility}>
                                <button className="btn game_button default_color" onClick={() =>this.getGameInfo(game._id)}> {game._id} </button> 
                            </div>)
                        )}
                        {this.props.games
                        .filter(game => {    
                            return this.props.today <= game._id                
                            })
                        .map(game =>
                                <div key={game._id} className={this.props.upcoming_visibility}>
                                    <button className="btn game_button default_color " onClick={() =>this.getGameInfo(game._id)}> {game._id} </button> 
                                    <FontAwesomeIcon icon="times-circle" className={game.lock_status === true ? "hidden remove remove_game" : "visible remove remove_game"} onClick={() => this.deleteGameFunc(game._id)} />
                                </div>
                            ) 
                        } */}

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
    past_visibility: state.display.past_visibility,
    lockStatus: state.games.lockStatus,
    upcomingGames: state.games.upcomingGames,
    pastGames: state.games.pastGames
})

// export default GameList;
export default connect(mapStateToProps, { fetchGames, getGame, deleteGame }) (GameList)
