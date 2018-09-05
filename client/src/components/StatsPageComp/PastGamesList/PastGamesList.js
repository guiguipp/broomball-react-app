import React, { Component } from "react";

import { connect } from 'react-redux';
import { getGame } from '../../../js/actions/gameActions'
import { getGamesAndTransform } from '../../../js/actions/statsActions'
import { setVisibility } from '../../../js/actions/statsActions'

import _ from "underscore"
import "./PastGamesList.css";

class PastGameList extends Component {

    componentDidMount() {
        this.props.getGamesAndTransform();
    }

    toggleVisibility(currentStatus, num){
        let newStatus;
        if (currentStatus === "visible") {newStatus = "hidden"}
        else { newStatus = "visible" }
        
        let visibleBefore = this.props.gameVisibility.slice(0, num)
        let visibleAfter = this.props.gameVisibility.slice(num + 1)
        let newArray = [...visibleBefore, newStatus, ...visibleAfter]
        
        this.props.setVisibility(newArray)
        }

    getGameInfo = (gameId) => {
        this.props.getGame(gameId);
        }

    renderGames(object) {
        return Object.values(object).map((game, i) => {
            return (
                <button key={game._id} className="btn past_game_button contrast_color" onClick={()=> this.getGameInfo(game._id)}> {game._id} </button>
                )
            })
        }

    renderMonth(object) {
        return Object.entries(Object.values(object)[0]).map(([key, value], i) => {
            return (
                <div key= {i}>
                    <h3 className="h3_alternate">{key}:</h3>

                    {this.renderGames(value)}
                </div>
                )
            })
        }
    
    
    renderYear(object) {
        let reOrderedArray = _.sortBy(Object.values(object)).reverse()
        return reOrderedArray.map((year, i) => {
            return (
                <div key={i}>
                    <div>
                        <h3 className="h3_main">{ Object.keys(year)}</h3> 
                        <div className="hide_button" onClick={()=> this.toggleVisibility(this.props.gameVisibility[i], i)}> {this.props.gameVisibility[i] === "visible" ? "[hide]" : "[show]" }</div>
                    </div>
                    <div className={this.props.gameVisibility ? this.props.gameVisibility[i] : null + " games_per_year"}>
                        {this.renderMonth(year)} 
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="list_of_games">
                    <div>
                        {this.renderYear(this.props.reducedGames)}
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
    reducedGames: state.stats.reducedGames,
    gameVisibility: state.stats.gameVisibility
})

// export default GameList;
export default connect(mapStateToProps, { getGamesAndTransform, setVisibility, getGame }) (PastGameList)
