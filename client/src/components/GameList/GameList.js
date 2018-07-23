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
            currentDate: "",
        }
    }

    getGames(date) {
        console.log("")
    }

    componentDidMount() {
        let today = moment().format("YYYY-MM-DD")
        console.log("today: ", today )
        API.getGames()
            .then(res => {
                if(res.status !== 200) {
                    throw new Error(res.statusText)
                }
                else {
                    // console.log("res.data: ", res.data)
                    this.setState({...this.state, gameList: res.data})
                }
            })
    }

    render() {
        return (
            <div className="show_games">
            <h2>{this.state.dateHeader}</h2>
                    {this.state.gameList
                        .filter(game => {
                            let today = moment().format("YYYY-MM-DD")
                            let gameDay = moment(game.game_date).format("YYYY-MM-DD")
                            return today < gameDay
                            })
                        .map(game => <GameButton key={game._id} id={game._id}/>)  
                    }
            </div>
            )
        }
    }
export default GameList;
