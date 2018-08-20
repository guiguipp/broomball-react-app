import React, { Component } from "react";

import { connect } from 'react-redux';
import { addGame } from '../../js/actions/gameActions'
import { fetchPlayers } from '../../js/actions/playerActions'
import { addPlayersToRoster } from "../../js/actions/rosterActions"
// see doc: https://www.npmjs.com/package/react-datepicker
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"
import "./Calendar.css";


const moment = require("moment");
class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.props.fetchPlayers()
        }

    handleChange(date) {
        this.setState({
            dateSelected: date
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        let members = this.props.players.filter((player) => player.membershipStatus === "Member")
        let membersWithGameInfo = members.map((member) => {return {
            membershipStatus: member.membershipStatus,
            _id: member._id,
            name: member.name,
            playerLevel: member.playerLevel,
            preferredPosition: member.preferredPosition,
            gameInfo: this.props.gameInfo
        }})
        let dateOfGame = moment(this.state.dateSelected).format("YYYY-MM-DD")
        this.props.addGame(dateOfGame, membersWithGameInfo)
        // members.forEach((player) => this.props.addPlayersToRoster(dateOfGame, player))
    }


    render() {
        return (
            <div id="schedule_game">
                <div>
                    <h2 className="h2_main">Schedule a game</h2>
                </div>

                <div>
                    <form onSubmit={this.handleSubmit} >
                        <div id="in-line">
                            <DatePicker 
                                placeholderText="MM DD YYYY"
                                selected={this.state.dateSelected}
                                onChange={this.handleChange}
                                value={this.state.value}
                                />
                            <button id="date_submit" className="btn contrast_color" name="submit" type="submit" >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            )
        }
    }


const mapStateToProps = state => ({
    game: state.games.game,
    players: state.players.players,
    gameInfo: state.games.gameInfo
    })


export default connect(mapStateToProps, { addGame, fetchPlayers, addPlayersToRoster }) (Calendar)
    
/*
Upon creating the game, API was called to get all members. Through an object constructor,
every member was posted to Roster api (with Game Id, name of player, 
and status [member/ten bucker] + availability set to: "true")

The list of players will only show the available players 

With Mongoose, no need for the constructor: the players can be added via an array.
Also, no need for an API call: the players are already in the State. 

We might want to store the array of player in Game itself. It looks like we can omit the "Roster" database that way.
Testing further...

*/
