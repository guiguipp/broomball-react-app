import React, { Component } from "react";

import { connect } from 'react-redux';
import { getGamesForStats } from '../../../js/actions/statsActions'
import { selectGame } from '../../../js/actions/statsActions'
import { unselectGame } from '../../../js/actions/statsActions'
import { toggleListOfGames } from '../../../js/actions/statsActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./GameSelector.css";

class GameSelector extends Component {

    componentDidMount() {
        this.props.getGamesForStats();
    }

    unselectGame(game) {
        this.props.unselectGame(game)
    }

    selectGame(game) {
        this.props.selectGame(game)
    }

    toggleListOfGames(currentStatus){
        let newStatus;
        if(currentStatus === "hidden") {newStatus = "visible"}
        else {newStatus = "hidden"}
        this.props.toggleListOfGames(newStatus)
    }

    render() {
        return (
                <div>
                    <div className="header">
                        <div>
                            <h3 className="header_h3" onClick={()=> this.toggleListOfGames(this.props.listOfGames)}> {this.props.listOfGames === "hidden" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Select Games</h3>
                        </div>
                    </div>
                    <div className="content">
                        <div className={"list_of_games " + this.props.listOfGames}>
                                {this.props.allGames.length > 0 ?
                                    this.props.allGames
                                    .map(game => this.props.selectedGames.indexOf(game) === -1 ? 
                                    (
                                        <button key={game._id} className="btn unselected_game record_game_button" onClick={() => this.selectGame(game)}> {game._id} <FontAwesomeIcon icon="plus" className="game_action_icon"/> </button>
                                    )
                                    : (
                                        <button key={game._id} className="btn selected_game record_game_button" onClick={() => this.unselectGame(game)}> {game._id} <FontAwesomeIcon icon="times" className="game_action_icon"/> </button>
                                    )
                                )
                                : <p className="no_game">There is currently no game to display</p> 
                            }
                        </div>
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
    selectedGames: state.stats.selectedGames,
    unselectedGames: state.stats.unselectedGames,
    allGames: state.stats.allGames,
    listOfGames: state.stats.listOfGames
})

export default connect(mapStateToProps, { getGamesForStats, selectGame, unselectGame, toggleListOfGames }) (GameSelector)
