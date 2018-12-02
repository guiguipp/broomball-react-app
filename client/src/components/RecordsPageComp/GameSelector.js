import React, { Component } from "react";

import { connect } from 'react-redux';
import { getGamesForRecords } from '../../js/actions/statsActions'
import { selectGame } from '../../js/actions/statsActions'
import { unselectGame } from '../../js/actions/statsActions'
import { selectAllGames } from '../../js/actions/statsActions'
import { unselectAllGames } from '../../js/actions/statsActions'
import { toggleViews } from '../../js/actions/statsActions'

import { updatePlayers } from '../../js/actions/statsActions'
import { batchChartUpdate } from '../../js/actions/statsActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { createCardsArray } from "./curateData"
import { createChartData } from "./curateData"
class GameSelector extends Component {

    componentDidMount() {
        this.props.getGamesForRecords();
    }

    unselectGame(game) {
        // marks the game as unselected
        this.props.unselectGame(game)
        let arrayOfGames = this.props.selectedGames.filter(match => match._id !== game._id)
        let cardsArray = createCardsArray(this.props.selectedPlayers, arrayOfGames)
        this.props.updatePlayers( cardsArray )
        
        if (arrayOfGames.length > 0) {
            // createChartData( cardsArray )

            let newObject = createChartData(cardsArray)
            this.props.batchChartUpdate(newObject)

        } else {
            console.log("All games have been unselected")
        }
    }

    gameSelection(arrayOfGames) {
        // marks the selected games as such 
        arrayOfGames.forEach(game => this.markAsSelected(game))
        let cardsArray = createCardsArray(this.props.selectedPlayers, arrayOfGames)
        this.props.updatePlayers( cardsArray )
        
        if (this.props.selectedPlayersNum > 0) {
            let newObject = createChartData( cardsArray )
            this.props.batchChartUpdate(newObject)
        } else {
            // if no game is selected, have to wipe the chartData
            console.log("No player selected")
        }
    }

    toggleViews(currentStatus){
        this.props.toggleViews(currentStatus, "games")
    }

    selectAllGames(status){
        this.props.selectAllGames(status)
        // we send the whole array of games in the time span to the gameSelection function
        this.gameSelection(this.props.gamesForRecords)
        
    }
    unselectAllGames(){
        this.props.unselectAllGames()
        this.props.gamesForRecords.forEach(game => this.props.unselectGame(game))
        this.gameSelection([])
    }
    // When we hit the "Select All Games", we need to make sure the game has not already been selected
    // otherwise it might be sent twice 
    markAsSelected(game) {
        let arrayOfIds = this.props.selectedGames.map(gamesSelected => gamesSelected._id)
        if ( !arrayOfIds.includes(game._id) ){
            this.props.selectGame(game)
        }
    }

    markAsUnselected(game) {
        let arrayOfIds = this.props.unselectedGames.map(gamesUnselected => gamesUnselected._id)
        console.log("ids of games already unselected: ", arrayOfIds)
        if ( !arrayOfIds.includes(game._id) ){
            this.props.unselectGame(game)
        }
    }

    render() {
        return (
                <div className="full">
                    <div className="header">
                        <div>
                            <h3 className="header_h3" onClick={()=> this.toggleViews(this.props.listOfGames)}> {this.props.listOfGames === "dead" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Select Games</h3>
                        </div>
                    </div>
                    <div className={this.props.listOfGames + " content "}>
                        <div className={this.props.listOfGames + " select_all"}>
                            <div className="button_options_third_set">
                                {this.props.allGamesSelection === "unselected_game" ? 
                                    <button className={"record_game_button all_button " + this.props.allGamesSelection} onClick={() => this.selectAllGames(this.props.allGamesSelection)}> Games <FontAwesomeIcon icon="plus" className="game_action_icon"/> </button>
                                    :
                                    <button className={"record_game_button all_button " + this.props.allGamesSelection} onClick={() => this.unselectAllGames()}> Games <FontAwesomeIcon icon="times" className="game_action_icon"/> </button>
                                }
                            </div>
                            
                        </div>

                        <div className={"record_list_of_games " + this.props.listOfGames}>
                                {this.props.gamesForRecords.length > 0 ?
                                    this.props.gamesForRecords
                                    .map(game => this.props.selectedGames.indexOf(game) === -1 ? 
                                    (<button key={game._id} className="unselected_game record_game_button" onClick={() => this.gameSelection([game, ...this.props.selectedGames])}> {game._id} <FontAwesomeIcon icon="plus" className="game_action_icon"/> </button>)
                                    : 
                                    (<button key={game._id} className="selected_game record_game_button" onClick={() => this.unselectGame(game)}> {game._id} <FontAwesomeIcon icon="times" className="game_action_icon"/> </button>)
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
    selectedPlayers: state.stats.selectedPlayers,
    selectedPlayersNum: state.stats.selectedPlayers ? state.stats.selectedPlayers.length : 0,
    unselectedGames: state.stats.unselectedGames,
    gamesForRecords: state.stats.gamesForRecords, 
    listOfGames: state.stats.listOfGames, // to toggle the visibility
    chartData: state.stats.chartData,
    allGamesSelection: state.stats.allGamesSelection
})

export default connect(mapStateToProps, { getGamesForRecords, selectGame, unselectGame, selectAllGames, unselectAllGames, toggleViews, updatePlayers, batchChartUpdate }) (GameSelector)
