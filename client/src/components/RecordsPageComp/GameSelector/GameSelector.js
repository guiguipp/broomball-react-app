import React, { Component } from "react";

import { connect } from 'react-redux';
import { fetchGames } from '../../../js/actions/gameActions'
import { selectGame } from '../../../js/actions/statsActions'
import { unselectGame } from '../../../js/actions/statsActions'
import { toggleViews } from '../../../js/actions/statsActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./GameSelector.css";

class GameSelector extends Component {

    componentDidMount() {
        this.props.fetchGames();
    }

    unselectGame(game) {
        this.props.unselectGame(game)
    }

    selectGame(game) {
        this.props.selectGame(game)
    }

    toggleViews(currentStatus){
        this.props.toggleViews(currentStatus, "games")
    }

    render() {
        return (
                <div className="full">
                    <div className="header">
                        <div>
                            <h3 className="header_h3" onClick={()=> this.toggleViews(this.props.listOfGames)}> {this.props.listOfGames === "hidden" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Select Games</h3>
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
    allGames: state.games.pastGames,
    listOfGames: state.stats.listOfGames
})

export default connect(mapStateToProps, { fetchGames, selectGame, unselectGame, toggleViews }) (GameSelector)
