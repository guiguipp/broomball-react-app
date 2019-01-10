import React, { Component } from "react";

import { connect } from "react-redux";
import { addGame } from "../../js/actions/gameActions";
import { fetchPlayers } from "../../js/actions/playerActions";
// see doc: https://www.npmjs.com/package/react-datepicker
import DatePicker from "react-datepicker";
import { loadState } from "../sessionStorage";
import "react-datepicker/dist/react-datepicker.css";
import _ from "underscore";

const moment = require("moment");
// for each game created, we add a "fake" player that allows to adjust the stats in case players are traded
const zombiePlayers = [
  {
    _id: "Dark",
    name: "– Dark Team",
    playerLevel: "N/A",
    preferredPosition: "N/A",
    membershipStatus: "variable",
    gameInfo: {
      goals: 0,
      assists: 0,
      available: true,
      team: "Dark"
    }
  },
  {
    _id: "White",
    name: "– White Team",
    playerLevel: "N/A",
    preferredPosition: "N/A",
    membershipStatus: "variable",
    gameInfo: {
      goals: 0,
      assists: 0,
      available: true,
      team: "White"
    }
  }
];
class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      createGame: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlayers();
    const privileges = loadState();
    console.log("Data from SessionStorage: ", privileges);
    this.setState(...this.state.date, privileges);
  }

  handleChange(date) {
    this.setState({
      dateSelected: date
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let members = this.props.players.filter(
      player => player.membershipStatus === "Member"
    );
    let membersWithGameInfo = members.map(member => {
      return {
        membershipStatus: member.membershipStatus,
        _id: member._id,
        name: member.name,
        playerLevel: member.playerLevel,
        preferredPosition: member.preferredPosition,
        gameInfo: this.props.gameInfo
      };
    });
    let dateOfGame = moment(this.state.dateSelected).format("YYYY-MM-DD");
    this.props.addGame(dateOfGame, membersWithGameInfo.concat(zombiePlayers));
  }

  render() {
    return (
      <div id="schedule_game">
        <div>
          <h2 className="h2_main">Schedule a game</h2>
        </div>

        <div>
          {this.state.createGame === true ? (
            <form className="game_form" onSubmit={this.handleSubmit}>
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
                  <button
                    id="date_submit"
                    className="contrast_color content_button"
                    name="submit"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <p className="no_game">
              Login as an admin to schedule games and create team line-ups!
            </p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.games.game,
  players: state.players.players,
  gameInfo: state.games.gameInfo
});

export default connect(
  mapStateToProps,
  { addGame, fetchPlayers }
)(Calendar);
