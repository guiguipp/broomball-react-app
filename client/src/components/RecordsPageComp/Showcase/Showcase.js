import React, { Component } from "react";

import { connect } from 'react-redux';

import { toggleViews } from "../../../js/actions/statsActions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./Showcase.css";

class Showcase extends Component {
    toggleViews(currentStatus) {
        this.props.toggleViews(currentStatus, "sort")
    }
    renderPlayerStats(object) {
        console.log("Object in renderPlayerStats: ", object)
        if (object.name) {
            return (
                <div key={object._id} className={object.membershipStatus === "Member" ? "member_record player_card" : "non_member_record player_card "}>
                    <p className="player_name">{object.name}</p>
                    <p>Games Played: {object.gamesPlayed.length}/{this.props.selectedGames.length}</p>
                    <p>Games Won: {object.gamesPlayed.length !== 0 ? ((object.gamesPlayed.length / object.wins.length !== 0 ? object.wins.length : 0) * 100).toFixed(2) + "%" : "N/A"}</p>
                    <p>Goals: {object.gamesPlayed.length !== 0 ? object.goals.reduce((a,b) => a + b, 0) : "N/A"} (per game: {object.gamesPlayed.length !== 0 ? ((object.goals.reduce((a,b) => a + b, 0) / object.gamesPlayed.length) * 100).toFixed(2) + "%" : "N/A"})</p>
                    <p>Assists: {object.gamesPlayed.length !== 0 ? object.assists.reduce((a,b) => a + b, 0) : "N/A"} (per game: {object.gamesPlayed.length !== 0 ? ((object.assists.reduce((a,b) => a + b, 0) / object.gamesPlayed.length) * 100).toFixed(2) + "%" : "N/A"})</p>
                </div>
                )
            }
        else {
            return (
            <div className="non_member_record player_card">
                <p>No stats available for the player you selected (inactive ten bucker)</p>        
            </div>)
            }
        }
    
    render() {
        return (
            <div className="full">
                <div className="header">
                    <div>
                        <h3 className="header_h3 " onClick={()=> this.toggleViews(this.props.sortOptionsDisplay)}> {this.props.sortOptionsDisplay === "hidden" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Stats</h3>
                    </div>
                </div>
                <div key={this.props.selectedPlayers.length} className="content">
                    <div className={"list_of_options " + this.props.sortOptionsDisplay}>
                    Options Will Be Here
                    </div>
                    {/* <div>
                    <h3>Stats</h3>
                        {this.props.selectedPlayers ? this.props.selectedPlayers.map((player) => {
                            return (
                                <div key={player._id} className="playerCard">
                                    <p>{player.name}</p>
                                    <p>Games Played: { this.props.selectedGames.map(game => game.players.filter(joueur => joueur._id === player._id ).filter(game => game.gameInfo.available === true)).filter(array => array.length !== 0).length} / {this.props.selectedGames.length}</p>
                                    
                                    <br /> <button onClick={()=> this.showStat(player)}>Click me to console log! </button> <br />
                                </div>
                                )
                        }) : "Nothing to show yet" }
                    </div> */}
                    <div className="records">
                    {this.props.selectedPlayers ? this.props.selectedPlayers.map((playerObject) => {
                        return this.renderPlayerStats(
                            this.props.selectedGames.filter(game => game.players.filter(player => player._id === playerObject._id )[0])
                                .reduce((players, game) => {
                                    let gameInfo = game.players.filter(player => player._id === playerObject._id).map(player => player.gameInfo)
                                    let win;
                                    let available;
                                    players.name = playerObject.name
                                    players._id = playerObject._id
                                    players.membershipStatus = playerObject.membershipStatus
                                    players.gamesPlayed = players.gamesPlayed || []
                                    if(gameInfo[0].available === true){
                                        available= 1
                                        players.gamesPlayed.push(available)
                                    }
                                    
                                    players.goals = players.goals || []
                                    if(gameInfo[0].available === true) {
                                        players.goals.push(gameInfo[0].goals)
                                    }
                                    
                                    players.assists = players.assists || []
                                    if (gameInfo[0].available === true) {
                                        players.assists.push(gameInfo[0].assists)
                                    }
                                    
                                    players.wins = players.wins || []
                                    if(gameInfo[0].available === true && game.win === gameInfo[0].team){
                                        win= "Win"
                                        players.wins.push(win)
                                    }
                                    
                                    return players
                                    }, {})
                            ) // end of render
                    }) : null }
                    
                    
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedGames: state.stats.selectedGames,
    selectedPlayers: state.stats.selectedPlayers,
    sortOptionsDisplay: state.stats.sortOptionsDisplay
})

export default connect(mapStateToProps, { toggleViews }) (Showcase)
