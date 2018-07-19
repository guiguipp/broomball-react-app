import React, { Component } from "react";
import "./GameList.css";
import GameButton from "../GameButton";

class GameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameList: [
                    "07-06-2018",
                    "07-13-2018",
                    "07-20-2018"
                    ],
            dateHeader: "Upcoming Games"
        }
    }

    render() {
        return (
            <div className="show_games">
            <h2>{this.state.dateHeader}</h2>
            {this.state.gameList.map(game => 
                <div key={game} >
                    <GameButton value={game}/> 
                    <i className="fa fa-times-circle remove remove_game"></i>
                </div>    
                    )}
            </div>
            )
        }
    }
export default GameList;
