import React, { Component } from "react";
import "./GameList.css";
import GameButton from "../GameButton";
import API from "../../utils/API";
const moment = require("moment");


class GameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameList: [],
            dateHeader: "Upcoming Games",
            buttonMsg: "Past Games",
            status: "upcoming",
            today: moment().format("YYYY-MM-DD"),
        }
    }

    getGames(date) {
        console.log("")
    }

    componentDidMount() {
        // let today = moment().format("YYYY-MM-DD")
        // console.log("today: ", today )
        API.getGames()
            .then(res => {
                if(res.status !== 200) {
                    throw new Error(res.statusText)
                }
                else {
                    console.log("res.data: ", res.data)
                    this.setState({...this.state, gameList: res.data})
                }
            })
    }

    deleteGame = (gameId) => {
        console.log("Click registered")
        API.deleteGame(gameId)
        .then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText)
            }
            else {
                console.log("res.data: ", res.data)
            }
        })
    }

    render() {
        return (
            <div className="show_games">
            <h2>{this.state.dateHeader}</h2>
                <div className="list-management">
                    {this.state.gameList
                        .filter(game => {
                            // let today = moment().format("YYYY-MM-DD")
                            let gameDay = moment(game.game_date).format("YYYY-MM-DD")
                            return this.state.today <= gameDay
                            })
                        .map(game => <div key={game._id}><GameButton id={game._id}/> <i className="fa fa-times-circle remove remove_game" id={game._id} onClick={() => this.deleteGame(game._id)}> </i></div>)  
                    }
                    {/* {() => this.deleteGame(game._id)} */}
                </div>
            </div>
            )
        }
    }
export default GameList;
