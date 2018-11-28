import React, { Component } from "react";
import _ from "underscore"
import { connect } from 'react-redux';

import { editGameInfo } from '../../js/actions/gameActions'
import { reset } from '../../js/actions/gameActions'
import { triggerPickMode } from '../../js/actions/gameActions'
import { triggerDraftMode } from '../../js/actions/gameActions'

class GameOptionsBottom extends Component {

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
                this.filterTeams(allPlayers, "level")
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
    filterTeams = (arrayOfPlayerObjects, mode) => {
        if (mode === "level") {
            // filter player objects according to name of the team #1
            let rosterTeam1 = arrayOfPlayerObjects.filter((e) => e.gameInfo.team === "Dark")
            rosterTeam1 = _.sortBy(rosterTeam1, "playerLevel")
            console.log(`\n************\nDark:\n************\n`);
            // display the name of the player for all players of the team
            rosterTeam1.forEach((e) => {
                console.log(`${e.name} (${e.playerLevel})`);
            })
            
            let rosterTeam2 = arrayOfPlayerObjects.filter((e) => e.gameInfo.team === "White")
            rosterTeam2 = _.sortBy(rosterTeam2, "playerLevel")
            console.log(`\n************\nWhite:\n************\n`);
            rosterTeam2.forEach((e) => {
                console.log(`${e.name} (${e.playerLevel})`);
                })
            
            let unavailable = arrayOfPlayerObjects.filter((e) => e.gameInfo.team === "N/A")
            unavailable = _.sortBy(unavailable, "playerLevel")
            console.log(`\n************\nUnavailable:\n************\n`);
            unavailable.forEach((e) => {
                console.log(`${e.name} (${e.playerLevel})\nAvailable: ${e.gameInfo.available}`);
                })
            }
        else {
            let rosterTeam1 = arrayOfPlayerObjects.filter((e) => e.gameInfo.team === "Dark")
            rosterTeam1 = _.sortBy(rosterTeam1, (obj) => obj.gameInfo.darkPickNum)
            console.log(`\n************\nDark:\n************\n`);
            // display the name of the player for all players of the team
            rosterTeam1.forEach((e) => {
                console.log(`${e.name} (picked for Dark: #${e.gameInfo.darkPickNum})`);
            })
            
            let rosterTeam2 = arrayOfPlayerObjects.filter((e) => e.gameInfo.team === "White")
            rosterTeam2 = _.sortBy(rosterTeam2, (obj) => obj.gameInfo.whitePickNum)
            console.log(`\n************\nWhite:\n************\n`);
            rosterTeam2.forEach((e) => {
                console.log(`${e.name} (picked for White: #${e.gameInfo.whitePickNum})`);
                })
            
            let unavailable = arrayOfPlayerObjects.filter((e) => e.gameInfo.team === "N/A")
            unavailable = _.sortBy(unavailable, "name")
            console.log(`\n************\nUnavailable:\n************\n`);
            unavailable.forEach((e) => {
                console.log(`${e.name} (${e.playerLevel})\nAvailable: ${e.gameInfo.available}\nPicked for Dark: #${e.gameInfo.darkPickNum})\nPicked for White: #${e.gameInfo.whitePickNum})`)//.\nPicked in position: ${e.gameInfo.captain2Pick})`);
                })
            }
        }
    
    toggleMode(currentMode, team){
        if (currentMode === team) {
            this.props.triggerDraftMode()
        }
        else {
            this.props.triggerPickMode(team)
        }
    }
    // helper function to test if a pick is eligible to be pushed to the ranked array. If not, moves on to the next pick. 
    testPick = (inputObject, rankedPlayers) => {
        let index = 0;
        let picks = inputObject.picks;
        if (rankedPlayers.indexOf(picks[index]) !== -1) {
            picks.splice(index,1);
            this.testPick(inputObject, rankedPlayers);
            }
        else {
            let nameOfTeam = inputObject.team;
            // assigns the name of the team to the drafted player (to filter later on)
            picks[index].gameInfo.team = nameOfTeam;
            // takes the pick, pushes it to the output array
            rankedPlayers.push(picks[index]);
            // removes the pick from the array of picks
            picks.splice(index,1);
            }
        }

    // function to create a "serpentine" type draft 
    // Aka: captain #1 drafts first pick, then captain #2 has the next 2 picks, etc. until everyone is drafted
    serpentineDraft = (game) => {
        // Serpentine draft sends an object to "testPick" to figure if a player has already been drafted. 
        // If not, the player in question gets stored in the array of drafter players (and so on, recursively). 
        // For this to happen, we need to format our objects
        let darkPicks = {team: "Dark", picks: _.sortBy(this.props.players.filter(player => player.gameInfo.available === true && player.darkPickNum !== 0),(obj) => obj.gameInfo.darkPickNum)};
        let whitePicks = {team: "White", picks: _.sortBy(this.props.players.filter(player => player.gameInfo.available === true && player.whitePickNum !== 0),(obj) => obj.gameInfo.whitePickNum)};
        let rankedPlayers = []; 
        // the function will error if we try to run it more times than players have been picked. 
        // Therefore, we need a pattern to determine how many times it should be ran
        let num;
        let num1 = darkPicks.picks.length;
        let num2 = whitePicks.picks.length;
        if (num1 > num2) {
            num = num2
            }
        else {
            num = num1
            }
            // there are 4 turns to complete a round
            let turns = 4;
            let modulo = num % turns;
            let completeRounds = (num - modulo)/turns
        if (this.props.lockStatus === "hidden") {
            console.log("Error message: game is locked")
            }
        else {
            if (modulo === 0) {
                // if the num of players allows for complete rounds of serpentine draft
                for (let i = 1; i <= completeRounds; i++) {
                    this.testPick(darkPicks, rankedPlayers);
                    this.testPick(whitePicks, rankedPlayers);
                    this.testPick(whitePicks, rankedPlayers);
                    this.testPick(darkPicks, rankedPlayers);
                    }
                }
            else {
                // if not, we have to run as many complete rounds as possible
                for (let i = 1; i <= completeRounds; i++) {
                    this.testPick(darkPicks, rankedPlayers);
                    this.testPick(whitePicks, rankedPlayers);
                    this.testPick(whitePicks, rankedPlayers);
                    this.testPick(darkPicks, rankedPlayers);
                    }
                    // and complete the rosters one player at a time
                    switch (modulo !== 0) {
                        case modulo === 1:
                        this.testPick(darkPicks, rankedPlayers);
                        break;
                        case modulo === 2:
                        this.testPick(darkPicks, rankedPlayers);
                        this.testPick(whitePicks, rankedPlayers);
                        break;
                        case modulo === 3:
                        this.testPick(darkPicks, rankedPlayers);
                        this.testPick(whitePicks, rankedPlayers);
                        this.testPick(darkPicks, rankedPlayers);
                        break;
                        default:
                        return;
                        }
                    }
                this.filterTeams(rankedPlayers, "pick")
                // we re-add the unavailable players, otherwise they cannot be reset later on
                let unavailablePlayers = this.props.players.filter(player => player.gameInfo.available !== true)
                    
                let allPlayers = rankedPlayers.concat(unavailablePlayers)
                this.props.editGameInfo(game, {players: allPlayers})
            }
        }
    
    // function to create an "alternate" type draft 
    // Aka: captain #1 drafts first pick, then captain #2 drafts, etc. until everyone is drafted
    alternateDraft = (game) => {
        let darkPicks = {team: "Dark", picks: _.sortBy(this.props.players.filter(player => player.gameInfo.available === true && player.darkPickNum !== 0),(obj) => obj.gameInfo.darkPickNum)};
        let whitePicks = {team: "White", picks: _.sortBy(this.props.players.filter(player => player.gameInfo.available === true && player.whitePickNum !== 0),(obj) => obj.gameInfo.whitePickNum)};
        let rankedPlayers = []; 
        
        let num;
        let num1 = darkPicks.picks.length;
        let num2 = whitePicks.picks.length;
        if (num1 > num2) {
            num = num2
            }
        else {
            num = num1
            }
        // there are 2 turns to complete a round
        let turns = 2;
        let modulo = num % turns;
        let completeRounds = (num - modulo)/turns
        if (this.props.lockStatus === "hidden") {
            console.log("Error message: game is locked")
            }
        else {
            if (modulo === 0) {
                // if the num of players allows for complete rounds of serpentine draft
                for (let i = 1; i <= completeRounds; i++) {
                    this.testPick(darkPicks, rankedPlayers);
                    this.testPick(whitePicks, rankedPlayers);
                    }
                }
            else {
                // if not, we have to run as many complete rounds as possible
                for (let i = 1; i <= completeRounds; i++) {
                    this.testPick(darkPicks, rankedPlayers);
                    this.testPick(whitePicks, rankedPlayers);
                    }
                // and complete the rosters with one more pick
                this.testPick(darkPicks, rankedPlayers);
                }
            this.filterTeams(rankedPlayers, "pick")
            // we re-add the unavailable players, otherwise they cannot be reset later on
            let unavailablePlayers = this.props.players.filter(player => player.gameInfo.available !== true)
                        
            let allPlayers = rankedPlayers.concat(unavailablePlayers)
            this.props.editGameInfo(game, {players: allPlayers})
            }
        }

    render() {
        return (
            <div className={this.props.visibility.bottom + " game_options_bottom"}>
                <div className={this.props.visibility.bottom + " reduced_container"}>
                        <div className="game_options_container">
                            <button className="content_button lighter_color pick_option" onClick={() => this.toggleMode(this.props.draftMode, "Dark")}>{this.props.pickButtons.left}</button> 
                            <button className="content_button contrast_color pick_option" onClick={() => this.resetTeams(this.props.gameDate)}>Reset</button> 
                            <button className="content_button lighter_color pick_option" onClick={() => this.toggleMode(this.props.draftMode, "White")}>{this.props.pickButtons.right}</button> 
                        </div>
                        <br />
                        <div className={this.props.visibility.top + " game_options_container"}>
                            <button className="content_button darker_color draft_option" onClick={()=> this.autodraft(this.props.gameDate)} >Autodraft</button>
                            <button className="content_button darker_color draft_option" onClick={()=> this.alternateDraft(this.props.gameDate)}>Alternate Draft</button> 
                            <button className="content_button darker_color draft_option" onClick={() => this.serpentineDraft(this.props.gameDate)}>Serpentine Draft</button> 
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
    gameInfo: state.games.gameInfo,
    draftMode: state.games.draftMode,
    pickButtons: state.games.pickButtons
})

export default connect(mapStateToProps, { editGameInfo, reset, triggerPickMode, triggerDraftMode }) (GameOptionsBottom)
