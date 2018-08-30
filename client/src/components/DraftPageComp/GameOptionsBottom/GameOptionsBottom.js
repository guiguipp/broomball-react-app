import React, { Component } from "react";
import _ from "underscore"
import { connect } from 'react-redux';
import { lockGameInfo } from "../../../js/actions/gameActions"
import { unlockGameInfo } from "../../../js/actions/gameActions"
import { editGameInfo } from '../../../js/actions/gameActions'
import { reset } from '../../../js/actions/gameActions'
import { triggerPickMode } from '../../../js/actions/gameActions'
import { triggerDraftMode } from '../../../js/actions/gameActions'

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
            switch (this.props.draftMode) {
                case "Dark":
                    let resetPlayers = this.props.players
                        .map((member) => {return {  
                            ...member,
                            // this will only reset their rank among the picks for Dark team
                            gameInfo: {...member.gameInfo, darkPickNum: 0}
                            }
                        })
                    this.props.reset(game, {players: resetPlayers})
                break;

                case "White":
                    resetPlayers = this.props.players
                        .map((member) => {return {  
                            ...member,
                            // this will only reset their rank among the picks for White team
                            gameInfo: {...member.gameInfo, whitePickNum: 0}
                            }
                        })
                    this.props.reset(game, {players: resetPlayers})
                return;

                case "Draft":
                // we filter the members (but should be done from the player db, not the games.draft)
                    resetPlayers = this.props.players
                    .filter((player) => player.membershipStatus === "Member")
                    .map((member) => {return {
                        membershipStatus: member.membershipStatus,
                        _id: member._id,
                        name: member.name,
                        playerLevel: member.playerLevel,
                        preferredPosition: member.preferredPosition,
                        // Resetting teams only
                        gameInfo: {...member.gameInfo, team: "N/A"}
                        }})
                this.props.reset(game, {players: _.sortBy(resetPlayers, "name")})
                break;
                
                default:
                return;
                }
            }
        }
    autodraft(game){
        if (this.props.lockStatus === "hidden") {
            console.log("Error message: game is locked")
            }
        else {
            if (this.props.draftMode === "Draft") {
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
                else {
                    console.log("Error message: go to draft mode to draft teams")
                    }
            }
        }

    // helper function to randomize an array (pushes/deletes to another array recursively, until it's empty) 
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
        // filter player objects according to name of the team #1
        let rosterTeam1 = arrayOfPlayerObjects.filter((e) => e.gameInfo.team === "Dark")
        rosterTeam1 = _.sortBy(rosterTeam1, "playerLevel")
        console.log(`\n************\nDark:\n************\n`);
        // display the name of the player for all players of the team
        rosterTeam1.forEach((e) => {
            console.log(`${e.name} (${e.playerLevel})`)//\nPicked in position: ${e.gameInfo.captain1Pick})`);
        })
        
        let rosterTeam2 = arrayOfPlayerObjects.filter((e) => e.gameInfo.team === "White")
        rosterTeam2 = _.sortBy(rosterTeam2, "playerLevel")
        console.log(`\n************\nWhite:\n************\n`);
        rosterTeam2.forEach((e) => {
            console.log(`${e.name} (${e.playerLevel})`)//.\nPicked in position: ${e.gameInfo.captain2Pick})`);
            })
        
        let unavailable = arrayOfPlayerObjects.filter((e) => e.gameInfo.team === "N/A")
        unavailable = _.sortBy(unavailable, "playerLevel")
        console.log(`\n************\nUnavailable:\n************\n`);
        unavailable.forEach((e) => {
            console.log(`${e.name} (${e.playerLevel})`)//.\nPicked in position: ${e.gameInfo.captain2Pick})`);
            })
        }
    
    toggleMode(currentMode, team){
        if (currentMode === "Draft") {
            this.props.triggerPickMode(team)
        }

        else {
            this.props.triggerDraftMode()
        }
    }

    render() {
        return (
            <div className={"row " + this.props.visibility}>
                <div className={"container " + this.props.visibility}>
                        <div className="row">
                            <div className="col text-center">
                                <button className="btn lighter_color" onClick={() => this.toggleMode(this.props.draftMode, "Dark")}>{this.props.pickButtons.right}</button> 
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
    // playerDB: state.players.players,
    lockStatus: state.games.lockStatus,
    gameInfo: state.games.gameInfo,
    draftMode: state.games.draftMode,
    pickButtons: state.games.pickButtons
    /*{
        right: "Set Dark Picks",
        left: "Set White Picks"
    }*/
})

export default connect(mapStateToProps, { lockGameInfo, unlockGameInfo, editGameInfo, reset, triggerPickMode, triggerDraftMode }) (GameOptionsBottom)
