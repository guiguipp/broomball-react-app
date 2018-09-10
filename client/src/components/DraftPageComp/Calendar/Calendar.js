import React, { Component } from "react";

import { connect } from 'react-redux';
import { addGame } from '../../../js/actions/gameActions'
import { fetchPlayers } from '../../../js/actions/playerActions'
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
                            <div className="calendar_component">
                                <DatePicker 
                                    placeholderText="MM DD YYYY"
                                    selected={this.state.dateSelected}
                                    onChange={this.handleChange}
                                    value={this.state.value}
                                    />
                            </div>
                            <div className="submit_button">
                                <button id="date_submit" className="btn contrast_color content_button" name="submit" type="submit" >Submit</button>
                            </div>
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


export default connect(mapStateToProps, { addGame, fetchPlayers }) (Calendar)
    