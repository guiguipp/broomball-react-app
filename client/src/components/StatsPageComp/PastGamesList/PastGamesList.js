import React, { Component } from "react";

import { connect } from 'react-redux';
import { getGamesAndTransform } from '../../../js/actions/statsActions'
import { getGame } from '../../../js/actions/gameActions'

import _ from "underscore"
import "./PastGamesList.css";

class PastGameList extends Component {

    componentDidMount() {
        this.props.getGamesAndTransform();
    }

    getGameInfo = (gameId) => {
        console.log("gameId: ", gameId)
        this.props.getGame(gameId);
    }

    renderGames(object) {
        return Object.values(object).map((game, i) => {
            return (
                <div key= {i}>
                    <button className="btn past_game_button contrast_color" onClick={() =>this.getGameInfo(game._id)}> {game._id} </button>
                </div>
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
                <div key= {i}>
                <h3 className="h3_main">{ Object.keys(year)}</h3>
                {this.renderMonth(year)}
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
    reducedGames: state.stats.reducedGames
})

// export default GameList;
export default connect(mapStateToProps, { getGamesAndTransform, getGame }) (PastGameList)
