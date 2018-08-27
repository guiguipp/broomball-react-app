import React, { Component } from "react";
import _ from "underscore"
import { connect } from 'react-redux';
import { lockGameInfo } from "../../../js/actions/gameActions"
import { unlockGameInfo } from "../../../js/actions/gameActions"
import { editGameInfo } from '../../../js/actions/gameActions'

import "./GameOptionsBottom.css";

class GameOptionsBottom extends Component {

    lockGame(game) {
        this.props.lockGameInfo(game)
    }

    unlockGame(game){
        this.props.unlockGameInfo(game)
    }

    resetTeams(game){
        if (this.props.lockStatus === "hidden") {
            console.log("Error message: game is locked")
            }
        else {
        let members = this.props.players.filter((player) => player.membershipStatus === "Member")
        let membersWithGameInfo = members.map((member) => {return {
            membershipStatus: member.membershipStatus,
            _id: member._id,
            name: member.name,
            playerLevel: member.playerLevel,
            preferredPosition: member.preferredPosition,
            gameInfo: this.props.gameInfo
        }})
        membersWithGameInfo = _.sortBy(membersWithGameInfo, "name")
        this.props.editGameInfo(game, {players: membersWithGameInfo})
        /* We also need to put the Ten Buckers back to their original status API/state. We could do that in the state only
        but that would create inconsistencies we add a ten_bucker. The best way is to filter anew after calling editGameInfo */

        }
    }
    autodraft(game){
        if (this.props.lockStatus === "hidden") {
            console.log("Error message: game is locked")
            }
        else {
            // Autodraft feature: separates all players by level, randomly assigns them to dark or white team
            let mixedRosters = [];
            let arrayOfAvailablePlayers = this.props.players.filter(player => player.gameInfo.available === true)
            // recreating our array by assigning each player to its level
            let output = arrayOfAvailablePlayers.reduce((levels,player) => {
                levels[player.playerLevel] = levels[player.playerLevel] || [];
                levels[player.playerLevel].push({
                    player
                });
                return levels;
            },[])
            
            let numOutput = Object.keys(output).length;
            
            for (let i = 0; i < numOutput; i++) {
                // running the randomize function for each level
                let playersByLevel = Object.entries(output)[i]
                // the "level" is the first argument in the array, the next one is the players: that's how we access them
                let playersArray = playersByLevel[1]
                // we randomize via a custom recursive function (could also try underscore, but on such a small array, it
                // I doubt it makes any difference)
                this.randomize(playersArray, mixedRosters)
                }
                
            for (let i = 0; i < mixedRosters.length; i++) {
                // assigning different team to every other player
                if (i%2 === 0) {mixedRosters[i].player.gameInfo.team = "Dark";}
                else {mixedRosters[i].player.gameInfo.team = "White"}
                }
                
                let arrayOfUnavailablePlayers = this.props.players.filter(player => player.gameInfo.available !== true)
                // For a reason I haven't been able to figure out, each player information is nested 
                // under "{player: }" which we then need to remove
                let remappedAvailablePlayers = mixedRosters.map((player) => player.player)
                // Once this is done, we add the unavailable players since they need to be sent to the API as well (otherwise, they just can't be added back in the draft)
                let allPlayers = remappedAvailablePlayers.concat(arrayOfUnavailablePlayers)
                allPlayers = _.sortBy(allPlayers, "name") 
                
            this.props.editGameInfo(game, {players: allPlayers})
            // the only purpose of calling this function is to verify that teams are balanced (level wise)
            this.filterTeams(allPlayers)
            }
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
        
    // function to filter array of player objects into teams used for quick control. 
    filterTeams = (arrayOfPlayerObjects) => {
        let rosterTeam2 = [];
        let rosterTeam1 = [];
        // filter player objects according to name of the team #1
        rosterTeam1 = arrayOfPlayerObjects.filter((e) => e.gameInfo.team === "Dark")
        rosterTeam1 = _.sortBy(rosterTeam1, "playerLevel")
        console.log(`\n************\nDark:\n************\n`);
        // display the name of the player for all players of the team
        rosterTeam1.forEach((e) => {
            console.log(`${e.name} (${e.playerLevel})`)//\nPicked in position: ${e.gameInfo.captain1Pick})`);
        })
        
        rosterTeam2 = arrayOfPlayerObjects.filter((e) => e.gameInfo.team === "White")
        rosterTeam2 = _.sortBy(rosterTeam2, "playerLevel")
        console.log(`\n************\nWhite:\n************\n`);
        rosterTeam2.forEach((e) => {
            console.log(`${e.name} (${e.playerLevel})`)//.\nPicked in position: ${e.gameInfo.captain2Pick})`);
            })
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
                                <button className="btn contrast_color" onClick={() => this.resetTeams(this.props.gameDate)}>Reset</button> 
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
    players: state.games.draft.players,
    lockStatus: state.games.lockStatus,
    gameInfo: state.games.gameInfo
})

export default connect(mapStateToProps, { lockGameInfo, unlockGameInfo, editGameInfo }) (GameOptionsBottom)
