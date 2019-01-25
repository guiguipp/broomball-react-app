import React, { Component } from "react";
import { connect } from "react-redux";

import { editGameInfo } from "../../js/actions/gameActions";
import { addNonMember } from "../../js/actions/gameActions";
import { setMemberUnavailable } from "../../js/actions/gameActions";
import { setTenBuckerUnavailable } from "../../js/actions/gameActions";
import { setAvailable } from "../../js/actions/gameActions";
import { setPick } from "../../js/actions/gameActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { loadState } from "../sessionStorage";

class Drafter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draftTeams: true,
      changeAvailability: true,
      comparableForward: [],
      comparableDefense: [],
      initialPlayer: {},
      glowing: false
    };
  }
  componentDidMount() {
    const privileges = loadState();
    console.log("Data from SessionStorage: ", privileges);
    this.setState(privileges);
  }

  setUnavailable(playerID, playerStatus) {
    let gameId = this.props.draft._id;
    if (this.props.lockStatus === "hidden") {
      console.log("Error message: game is locked");
    } else {
      if (playerStatus === "Member") {
        this.props.setMemberUnavailable(gameId, {
          player: playerID,
          gameInfo: { available: false, team: "N/A" }
        });
      } else {
        let gameId = this.props.draft._id;
        let gameData = {
          ...this.props.draft,
          players: this.props.draft.players.filter(
            player => player._id !== playerID
          )
        };
        this.props.setTenBuckerUnavailable(gameId, gameData, playerID);
      }
    }
  }

  makeAvailable(playerID) {
    let gameId = this.props.draft._id;
    if (this.props.lockStatus === "hidden") {
      console.log("Error message: game is locked");
    } else {
      this.props.setAvailable(gameId, {
        player: playerID,
        gameInfo: { available: true, team: "N/A" }
      });
    }
  }

  assignTeam(playerID, team) {
    if (this.props.lockStatus === "hidden") {
      console.log("Error message: game is locked");
    } else {
      let gameId = this.props.draft._id;
      this.props.editGameInfo(gameId, {
        player: playerID,
        gameInfo: { team: team }
      });
    }
  }

  addTenBuckerToDraft(player) {
    if (this.props.lockStatus === "hidden") {
      console.log("Error message: game is locked");
    } else {
      let gameId = this.props.draft._id;
      let tenBuckerToAdd = {
        membershipStatus: player.membershipStatus,
        _id: player._id,
        name: player.name,
        playerLevel: player.playerLevel,
        preferredPosition: player.preferredPosition,
        gameInfo: this.props.gameInfo
      };
      this.props.addNonMember(gameId, tenBuckerToAdd, this.props.draft.players);
    }
  }

  comparablePlayers(player) {
    const comparableForward = this.props.draft.players
      .filter(
        participant =>
          participant.gameInfo.team !== player.gameInfo.team &&
          participant._id !== player._id &&
          participant.playerLevel === player.playerLevel &&
          participant.preferredPosition === "Forward"
      )
      .map(broomballer => broomballer._id);

    const comparableDefense = this.props.draft.players
      .filter(
        participant =>
          participant.gameInfo.team !== player.gameInfo.team &&
          participant._id !== player._id &&
          participant.playerLevel === player.playerLevel &&
          participant.preferredPosition === "Defense"
      )
      .map(broomballer => broomballer._id);

    this.setState({
      initialPlayer: player,
      comparableForward: comparableForward,
      comparableDefense: comparableDefense,
      glowing: true
    });
  }

  tradeOptions(player) {
    // if the app is set to "trade" mode, and player clicked is glowing => initiate trade, else: show possible trades
    if (this.state.glowing === true) {
      if (
        this.state.comparableDefense.includes(player._id) ||
        this.state.comparableForward.includes(player._id)
      ) {
        if (this.state.initialPlayer.gameInfo.team === "White") {
          this.assignTeam(this.state.initialPlayer._id, "Dark");
          this.assignTeam(player._id, "White");
          this.setState({
            comparableForward: [],
            comparableDefense: [],
            initialPlayer: {},
            glowing: false
          });
        } else {
          this.assignTeam(this.state.initialPlayer._id, "White");
          this.assignTeam(player._id, "Dark");
          this.setState({
            comparableForward: [],
            comparableDefense: [],
            initialPlayer: {},
            glowing: false
          });
        }
      } else if (player._id === this.state.initialPlayer._id) {
        // clicking on same player removes glowing
        this.setState({
          comparableForward: [],
          comparableDefense: [],
          initialPlayer: {},
          glowing: false
        });
      } else {
        this.comparablePlayers(player);
      }
    } else {
      this.comparablePlayers(player);
    }
  }

  render() {
    return (
      <div className="universal_drafter">
        <div className="col_no_bootstrap dark_drafted_players">
          {this.props.draftedDark || this.props.draftedWhite !== 0 ? (
            <h1 className="col_header">
              <br />
              Dark
            </h1>
          ) : null}

          {this.props.draft.players ? (
            this.props.draft.players
              .filter(
                player =>
                  player.gameInfo.available === true &&
                  player.gameInfo.team === "Dark" &&
                  player.membershipStatus !== "variable"
              )
              .map(player => {
                return (
                  <div className="player_div" key={player._id}>
                    <button
                      className={
                        this.state.comparableForward.includes(player._id)
                          ? "player_button comparable_forward"
                          : this.state.comparableDefense.includes(player._id)
                          ? "player_button comparable_defense"
                          : "player_button"
                      }
                      onClick={() => this.tradeOptions(player)}
                    >
                      {player.name}
                    </button>
                    {this.state.changeAvailability === true ? (
                      <FontAwesomeIcon
                        icon="times-circle"
                        className={
                          "remove remove_player " + this.props.lockStatus
                        }
                        onClick={() =>
                          this.setUnavailable(
                            player._id,
                            player.membershipStatus
                          )
                        }
                      />
                    ) : null}
                    {this.state.draftTeams === true ? (
                      <FontAwesomeIcon
                        icon={faArrowAltCircleRight}
                        className={"arrows " + this.props.lockStatus}
                        onClick={() => this.assignTeam(player._id, "N/A")}
                      />
                    ) : null}
                  </div>
                );
              })
          ) : (
            <p>Data has not loaded yet</p>
          )}
        </div>
        <div className="col_no_bootstrap undrafted_players">
          <h1 className="game_date">
            {this.props.gameDate}
            <br />
            <br />
          </h1>
          {this.props.undrafted !== 0 ? (
            <div className="small_screen_team_names_header">
              <div className="sstnh sstnhd">
                <h1 className="h1_main">
                  {" "}
                  <FontAwesomeIcon
                    icon="arrow-circle-left"
                    className="arrows "
                  />{" "}
                  Dark
                </h1>
              </div>
              <div className="sstnh sstnhw">
                <h1 className="h1_main">
                  White{" "}
                  <FontAwesomeIcon
                    icon={faArrowAltCircleRight}
                    className="arrows "
                  />
                </h1>
              </div>
            </div>
          ) : null}
          {this.props.draft.players ? (
            this.props.draft.players
              .filter(
                player =>
                  player.gameInfo.available === true &&
                  player.gameInfo.team === "N/A"
              )
              .map(player => {
                return (
                  <div
                    className="player_div leaning_center_div"
                    key={player._id}
                  >
                    {this.state.draftTeams === true ? (
                      <FontAwesomeIcon
                        icon="arrow-circle-left"
                        className={"arrows " + this.props.lockStatus}
                        onClick={() => this.assignTeam(player._id, "Dark")}
                      />
                    ) : null}
                    <button className="player_button plain_color">
                      {player.name}
                    </button>
                    {this.state.changeAvailability === true ? (
                      <FontAwesomeIcon
                        icon="times-circle"
                        className={
                          "remove remove_player " + this.props.lockStatus
                        }
                        onClick={() =>
                          this.setUnavailable(
                            player._id,
                            player.membershipStatus
                          )
                        }
                      />
                    ) : null}
                    {this.state.draftTeams === true ? (
                      <FontAwesomeIcon
                        icon={faArrowAltCircleRight}
                        className={"arrows " + this.props.lockStatus}
                        onClick={() => this.assignTeam(player._id, "White")}
                      />
                    ) : null}
                  </div>
                );
              })
          ) : (
            <p>Data has not loaded yet</p>
          )}

          {this.props.unavailableMembers ? (
            this.props.unavailableMembers.map(player => {
              return (
                <div className="player_div" key={player._id}>
                  <button
                    className="player_button unavailable"
                    onClick={() =>
                      this.state.changeAvailability === true
                        ? this.makeAvailable(player._id)
                        : null
                    }
                  >
                    {player.name}
                  </button>
                </div>
              );
            })
          ) : (
            <p>Unable to retrieve unavailable Members</p>
          )}

          {this.props.notPlayingNonMembers ? (
            this.props.notPlayingNonMembers.map(player => {
              return (
                <div className="player_div" key={player._id}>
                  <button
                    className="player_button negative_color"
                    onClick={() =>
                      this.state.changeAvailability === true
                        ? this.addTenBuckerToDraft(player)
                        : null
                    }
                  >
                    {player.name}
                  </button>
                </div>
              );
            })
          ) : (
            <p>Unable to retrieve Ten Buckers</p>
          )}
        </div>
        <div className="col_no_bootstrap white_drafted_players">
          {this.props.draftedDark || this.props.draftedWhite !== 0 ? (
            <h1 className="col_header">
              <br />
              White
            </h1>
          ) : null}
          {this.props.draft.players ? (
            this.props.draft.players
              .filter(
                player =>
                  player.gameInfo.available === true &&
                  player.gameInfo.team === "White" &&
                  player.membershipStatus !== "variable"
              )
              .map(player => {
                return (
                  <div className="player_div" key={player._id}>
                    {this.state.draftTeams === true ? (
                      <FontAwesomeIcon
                        icon="arrow-circle-left"
                        className={"arrows " + this.props.lockStatus}
                        size="2x"
                        onClick={() => this.assignTeam(player._id, "N/A")}
                      />
                    ) : null}
                    <button
                      className={
                        this.state.comparableForward.includes(player._id)
                          ? "player_button comparable_forward"
                          : this.state.comparableDefense.includes(player._id)
                          ? "player_button comparable_defense"
                          : "player_button"
                      }
                      onClick={() => this.tradeOptions(player)}
                    >
                      {player.name}
                    </button>
                    {this.state.changeAvailability === true ? (
                      <FontAwesomeIcon
                        icon="times-circle"
                        className={
                          "remove remove_player " + this.props.lockStatus
                        }
                        onClick={() =>
                          this.setUnavailable(
                            player._id,
                            player.membershipStatus
                          )
                        }
                      />
                    ) : null}
                  </div>
                );
              })
          ) : (
            <p>Data has not loaded yet</p>
          )}
        </div>
      </div>
    );
  }
}
/*
Games.propTypes = {
    fetchGames: PropTypes.func.isRequired,
    games: PropTypes.array.isRequired
}
*/

const mapStateToProps = state => ({
  draft: state.games.draft,
  gameDate: state.games.gameDate,
  unavailableMembers: state.games.unavailableMembers,
  notPlayingNonMembers: state.games.notPlayingNonMembers,
  draftedDark: state.games.draft.players
    ? state.games.draft.players.filter(
        player => player.gameInfo.team === "Dark"
      ).length
    : 0,
  draftedWhite: state.games.draft.players
    ? state.games.draft.players.filter(
        player => player.gameInfo.team === "White"
      ).length
    : 0,
  undrafted: state.games.draft.players
    ? state.games.draft.players.filter(
        player =>
          player.gameInfo.team === "N/A" && player.gameInfo.available === true
      ).length
    : 0,
  gameInfo: state.games.gameInfo,
  lockStatus: state.games.lockStatus,
  draftMode: state.games.draftMode,
  picked: state.games.picked,
  unpicked: state.games.unpicked
});

export default connect(
  mapStateToProps,
  {
    editGameInfo,
    addNonMember,
    setMemberUnavailable,
    setTenBuckerUnavailable,
    setAvailable,
    setPick
  }
)(Drafter);
