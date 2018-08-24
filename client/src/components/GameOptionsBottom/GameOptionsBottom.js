import React, { Component } from "react";

import { connect } from 'react-redux';
import { lockGameInfo } from "../../js/actions/gameActions"
import { unlockGameInfo } from "../../js/actions/gameActions"
import { editGameInfo } from '../../js/actions/gameActions'

import "./GameOptionsBottom.css";

class GameOptionsBottom extends Component {

    lockGame(game) {
        this.props.lockGameInfo(game)
    }

    unlockGame(game){
        this.props.unlockGameInfo(game)
    }

    autodraft(game){
        // need to disable this if lock_status is true
        // eventually, will end with an API call to API.editGame(gameId, players)
        // therefore, needs to prepare the array of players to update
        
        // Autodraft feature: separates all players by level, randomly assigns them to dark or white team
        let mixedRosters = [];
        let arrayOfAvailablePlayers = this.props.players
        // recreating our array by assigning each player to its level
        let output = arrayOfAvailablePlayers.reduce((levels,player) => {
            // console.log("Player in reduce: ", player)
            levels[player.playerLevel] = levels[player.playerLevel] || [];
            levels[player.playerLevel].push({
                player
            });
            return levels;
        },[])
        // console.log("Output from the reduce:\n", output)
        // getting the number of levels
        let numOutput = Object.keys(output).length;
        // console.log("Num of levels: ", numOutput)
        
        for (let i = 0; i < numOutput; i++) {
            // running the randomize function for each level
            let playersByLevel = Object.entries(output)[i]
            
            // console.log("playersByLevel: ", playersByLevel)
            // console.log("playersByLevel: ", playersByLevel[1][0])
            
            // the "level" is the first argument in the array, the next one is the players: that's how we access them
            let playersArray = playersByLevel[1]
            console.log("playersArray: ", playersByLevel)
            // console.log("players array non randomized: ", playersArray)
            this.randomize(playersArray, mixedRosters)
            }
            
        for (let i = 0; i < mixedRosters.length; i++) {
            // assigning different team to every other player
            if (i%2 === 0) {mixedRosters[i].player.gameInfo.team = "Dark";}
            else {mixedRosters[i].player.gameInfo.team = "White"}
            }
            
            let remappedArray = mixedRosters.map((player) => player.player) 
            
            /*
            function PlayerObj (name,id,team) {
                this.name = name,
                this.id = id,
                this.team = team
                updateTeam(this)
                }
            mixedRosters.forEach((e) => {
                let newPlayerObj = new PlayerObj (e.shortname,e.id,e.team)
                })*/
        // the only purpose of calling this function is to verify that teams are balanced (level wise)
        // filterTeams(mixedRosters);
        this.props.editGameInfo(game, {players: remappedArray})
        }
    // helper function to randomize an array (pushes/deletes to another array recursively, until it's empty) 
    // can probably be replace by underscore... 
    randomize = (inputArray, outputArray) => {
        if(inputArray.length > 0) {
            let randomPlayer = inputArray[Math.floor(Math.random()*inputArray.length)];
            let index = inputArray.indexOf(randomPlayer);
            outputArray.push(randomPlayer);
            inputArray.splice(index,1)
            this.randomize(inputArray, outputArray);
            }
        }
        

    

    render() {
        return (
            <div className={"row " + this.props.visibility}>
                <div className={"container " + this.props.visibility}>
                        <div className="row">
                            <div className="col text-center">
                                <button className="btn btn-info navbar-btn regular_grey computer_draft menu_options" id="picks_dark">Set Dark Picks</button> 
                            </div>
                            <div className="col text-center">
                                
                            </div>
                            <div className="col text-center">
                                <button className="btn btn-info navbar-btn light_grey menu_options" id="reset">Reset</button> 
                            </div>
                            <div className="col text-center">
                                
                            </div>
                            <div className="col text-center">
                                <button className="btn btn-info navbar-btn regular_grey computer_draft menu_options" id="picks_white">Set White Picks</button> 
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col text-center">
                                <button className="btn darker_color" onClick={()=> this.autodraft(this.props.gameDate)} >Autodraft</button> 
                            </div>
                            <div className="col text-center">
                                <button className="btn btn-info navbar-btn dark_grey js_draft menu_options" id="alternate_draft">Alternate Draft</button> 
                            </div>
                            <div className="col text-center">
                                <button className="btn btn-info navbar-btn dark_grey js_draft menu_options" id="serpentine_draft">Serpentine Draft</button> 
                            </div>
                        </div>
                    </div>

                <div className={"container " + this.props.visibility}>
                    <div className="container">
                        <div className="row">    
                            <div className="col text-center">
                                <button className="lock unlocked" onClick={() => this.unlockGame(this.props.gameDate)}><i className="fa fa-unlock-alt bigger_fa_lock"></i></button> 
                                <button className="lock locked" onClick={() => this.lockGame(this.props.gameDate)}><i className="fa fa-lock bigger_fa_lock"></i></button> 
                            </div>
                        </div>
                    </div>
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
    gameDate: state.games.gameDate,
    visibility: state.games.visibility,
    players: state.games.draft.players
})

export default connect(mapStateToProps, { lockGameInfo, unlockGameInfo, editGameInfo }) (GameOptionsBottom)
