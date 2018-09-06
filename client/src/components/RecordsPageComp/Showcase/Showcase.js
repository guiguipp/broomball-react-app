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
        return (
            <div key={object._id}>
                <p>{object.name}</p>
                <p>Games Played: {object.gamesPlayed.length}/{this.props.selectedGames.length}</p>
                <p>Games Won: {object.wins.length}</p>
                <p>Goals recorded: {object.goals.reduce((a,b) => a + b, 0)} (average: {object.goals.reduce((a,b) => a + b, 0) / object.goals.length})</p>
                <p>Assists recorded: {object.assists.reduce((a,b) => a + b, 0)} (average: {object.assists.reduce((a,b) => a + b, 0) / object.goals.length})</p>
            </div>
        )
        }
    showStat(playerObject){
        
    // let refactoring1 = this.props.selectedGames.map(game => game.players.includes(player._id))
    // let refactoring2 = this.props.selectedGames.map(game => game.players.filter(joueur => joueur._id === player._id ))
    // let refactoring3 = this.props.selectedGames.map(game => game.players.filter(joueur => joueur._id === player._id ).filter(game => game.gameInfo.available === true))
    // let refactoring4 = this.props.selectedGames.map(game => game.players.filter(joueur => joueur._id === player._id ).filter(game => game.gameInfo.available === true)).filter(array => array.length !== 0)
    // console.log("refactoring1: ", refactoring1)
    // console.log("refactoring2: ", refactoring2)
    // console.log("refactoring3: ", refactoring3)
    // console.log("refactoring4: ", refactoring4)
    // console.log("refactoring4.length: ", refactoring4.length)
    /*
    let reduced1 = this.props.selectedGames
        .reduce((players, game) => {
            let filtered = game.players.filter(joueur => joueur._id === player._id)[0]
            console.log(player.name, "\nchecking the game: ", game)
            console.log("filtered: ", filtered)
            console.log("Checking the player: ", players)
            players.gamesPlayed = [] || []
            players.gamesPlayed = [filtered, ...players.gamesPlayed]

            return players
            }, {})
    console.log("reduced: ", reduced1)
    */
    
    let reduced2 = this.props.selectedGames.filter(game => game.players.filter(player => player._id === playerObject._id )[0])
        .reduce((players, game) => {
            let gameInfo = game.players.filter(player => player._id === playerObject._id).map(player => player.gameInfo)
            let win;
            let available;
            players.name = playerObject.name
            players._id = playerObject._id
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
            console.log("reduced2: ", reduced2)

    /*let reduced2 = this.props.selectedGames
        .reduce((player, game) => {
            return player
        }, { 
            gamesPlayed: 0,
            results: [],
            goals: 0,
            assists: 0
            })*/
    // console.log("reduced: ", reduced1)
    }
    render() {
        return (
            <div className="full">
                <div className="header">
                    <div>
                        <h3 className="header_h3 " onClick={()=> this.toggleViews(this.props.sortOptionsDisplay)}> {this.props.sortOptionsDisplay === "hidden" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Stats</h3>
                    </div>
                </div>
                <div className="content">
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
