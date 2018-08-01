import React, { Component } from "react";

// import PropTypes from "prop-types";

import { connect } from 'react-redux';
import { fetchGames } from '../../js/actions/gameActions'
import { deleteGame } from '../../js/actions/gameActions'

import "./GameList.css";
import Button from "../Button";

const moment = require("moment");

class GameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateHeader: "Upcoming Games",
            buttonMsg: "Past Games",
            status: "upcoming",
            today: moment().format("YYYY-MM-DD"),
        }
    }
    
    componentDidMount() {
        this.props.fetchGames();
    }

    deleteGameFunc = (gameId) => {
        this.props.deleteGame(gameId);
    }

    render() {
        return (
            <div className="show_games">
            <h2>{this.state.dateHeader}</h2>
                <div className="list-management">
                    {this.props.games
                        .filter(game => {
                            // let today = moment().format("YYYY-MM-DD")
                            let gameDay = moment(game.game_date).format("YYYY-MM-DD")
                            return this.state.today <= gameDay
                            })
                        .map(game => 
                            <div key={game._id}>
                                <Button className="btn game_button default_color" id={game._id}/> <i className="fa fa-times-circle remove remove_game" id={game._id} onClick={() => this.deleteGameFunc(game._id)}> </i>
                            </div>)  
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
    games: state.games.games
})

// export default GameList;
export default connect(mapStateToProps, { fetchGames, deleteGame }) (GameList)
