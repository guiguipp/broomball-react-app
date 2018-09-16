import React, { Component } from "react";
import { connect } from 'react-redux';

import { editGameInfo } from '../../../js/actions/gameActions'
import { addNonMember } from '../../../js/actions/gameActions'
import { setMemberUnavailable } from '../../../js/actions/gameActions'
import { setTenBuckerUnavailable } from '../../../js/actions/gameActions'
import { setAvailable } from '../../../js/actions/gameActions'
import { setPick } from '../../../js/actions/gameActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import "./Drafter.css";


class Drafter extends Component {
    
    setUnavailable(playerID, playerStatus) {
        let gameId = this.props.draft._id
        if (this.props.lockStatus === "hidden") {
            console.log("Error message: game is locked")
            }
        else {
            if (playerStatus === "Member"){
            this.props.setMemberUnavailable(gameId, {player: playerID, gameInfo: {available: false, team: "N/A"}})
            }
        else {
            let gameId = this.props.draft._id
            let gameData = {...this.props.draft, players: this.props.draft.players.filter(player => player._id !== playerID)}
            this.props.setTenBuckerUnavailable(gameId, gameData, playerID)
            }    
        }
    }

    makeAvailable(playerID) {
        let gameId = this.props.draft._id;
        if (this.props.lockStatus === "hidden") {
            console.log("Error message: game is locked")
            }
        else {
            this.props.setAvailable(gameId, {player: playerID, gameInfo: {available: true, team: "N/A"}})    
            }
    }

    assignTeam(playerID, team){
        if (this.props.lockStatus === "hidden") {
            console.log("Error message: game is locked")
            }
        else {
            let gameId = this.props.draft._id
            this.props.editGameInfo(gameId, {player: playerID, gameInfo: {team: team}})
            }
    }

    addTenBuckerToDraft(player){
        if (this.props.lockStatus === "hidden") {
            console.log("Error message: game is locked")
            }
        else {
            let gameId = this.props.draft._id
            let tenBuckerToAdd = {
                membershipStatus: player.membershipStatus,
                _id: player._id,
                name: player.name,
                playerLevel: player.playerLevel,
                preferredPosition: player.preferredPosition,
                gameInfo: this.props.gameInfo
                }   
            this.props.addNonMember(gameId, tenBuckerToAdd, this.props.draft.players)
            }

    }

    addPick(team, playerID){
        let gameId = this.props.draft._id
        switch (team){
            case "Dark":
            // We send the team for the reducer to create array of ranked and unranked players accordingly
            this.props.setPick("Dark", gameId, {player: playerID, gameInfo: {darkPickNum: this.props.picked.length + 1}})
            break;

            case "White":
            this.props.setPick("White", gameId, {player: playerID, gameInfo: {whitePickNum: this.props.picked.length + 1}})
            break;

            default:
            return
        }
    }

    removePick(team, player) {
        let gameId = this.props.draft._id
        // we remove the player from the array of ranked players
        let indexOfPlayerToRemove = this.props.picked.indexOf(player)
        this.props.picked.splice(indexOfPlayerToRemove,1)
        // we will also need to send the unavailable players, otherwise their availability cannot be reset later on
        let unavailable = this.props.draft.players.filter(player => player.gameInfo.available === false)
        switch (team){
            case "Dark":
            // after removing the player from the array of ranked players, we reset their rank via their index in the array
            this.props.picked.forEach((player, index) => {
                player = {...player.gameInfo.darkPickNum = index + 1 }
            })
            // the rank of the player initially selected is reset to 0
            player.gameInfo.darkPickNum = 0
            // We send the team for the reducer to create array of ranked and unranked players accordingly
            this.props.setPick("Dark", gameId, {players: [player, ...this.props.picked.concat(this.props.unpicked, unavailable)]})
            break;

            case "White":
            this.props.picked.forEach((player, index) => {
                player = {...player.gameInfo.whitePickNum = index + 1 }
            })
            player.gameInfo.whitePickNum = 0
            this.props.setPick("White", gameId, {players: [player, ...this.props.picked.concat(this.props.unpicked, unavailable)]})
            break;

            default:
            return
        }
    }

    rankOneUp(player) {
        let gameId = this.props.draft._id
        let indexOfPlayerToEdit = this.props.picked.indexOf(player)
        let unavailable = this.props.draft.players.filter(player => player.gameInfo.available === false)
        if (indexOfPlayerToEdit > 0) {
            switch (this.props.draftMode) {
                case "Dark": 
                // we adjust the rank of the player ranked immediately above
                this.props.picked[indexOfPlayerToEdit - 1].gameInfo.darkPickNum = indexOfPlayerToEdit + 1;
                // we adjust the rank of the player we rank up
                player.gameInfo.darkPickNum = indexOfPlayerToEdit
                this.props.setPick("Dark", gameId, {players: this.props.picked.concat(this.props.unpicked, unavailable)})
                break;

                case "White":
                this.props.picked[indexOfPlayerToEdit - 1].gameInfo.whitePickNum = indexOfPlayerToEdit + 1;
                player.gameInfo.whitePickNum = indexOfPlayerToEdit
                this.props.setPick("White", gameId, {players: this.props.picked.concat(this.props.unpicked, unavailable)})
                break;

                default:
                return;
            }
        }
    }

    rankOneDown(player) {
        let gameId = this.props.draft._id
        let indexOfPlayerToEdit = this.props.picked.indexOf(player)
        let unavailable = this.props.draft.players.filter(player => player.gameInfo.available === false)
        if (indexOfPlayerToEdit < this.props.picked.length - 1) {
            switch (this.props.draftMode) {
                case "Dark":
                // we adjust the rank of the player ranked immediately above
                this.props.picked[indexOfPlayerToEdit + 1].gameInfo.darkPickNum = indexOfPlayerToEdit + 1;
                // we adjust the rank of the player we rank up
                player.gameInfo.darkPickNum = indexOfPlayerToEdit + 2
                this.props.setPick("Dark", gameId, {players: this.props.picked.concat(this.props.unpicked, unavailable)})
                break;

                case "White":
                this.props.picked[indexOfPlayerToEdit + 1].gameInfo.whitePickNum = indexOfPlayerToEdit + 1;
                player.gameInfo.whitePickNum = indexOfPlayerToEdit + 2
                this.props.setPick("White", gameId, {players: this.props.picked.concat(this.props.unpicked, unavailable)})
                break;

                default:
                return;

            }
        }
    }

    render() {
        return (
            <div>
                {this.props.draftMode === "Draft" ? 
                    (<div className="row drafter_mode">
                    <div className="col col_no_bootstrap dark_draft_players">
                        <h1 className="h1_main col_header"><br/>Dark</h1>
                        {this.props.draft.players ? (this.props.draft.players
                                .filter(player => player.gameInfo.available === true && player.gameInfo.team === "Dark")
                                .map(player => {
                                    return (
                                        <div className="player_div" key={player._id}>
                                            <button className="content_button player_button leaning_right_color">{player.name}</button>
                                            <FontAwesomeIcon icon="times-circle" className={"remove remove_player " + this.props.lockStatus} onClick={() => this.setUnavailable(player._id, player.membershipStatus)} />
                                            <FontAwesomeIcon icon={faArrowAltCircleRight} className={"arrows " + this.props.lockStatus} onClick={() => this.assignTeam(player._id, "N/A")} />
                                        </div>
                                        )
                                        })
                                ) : (<p>Data has not loaded yet</p>)
                            }
                    </div>
                    <div className="col col_no_bootstrap undraft_players">
                    <h1 className="h1_alternate col_header game_date">{this.props.gameDate}<br/><br/></h1>
                        {this.props.draft.players ? (this.props.draft.players
                            .filter(player => player.gameInfo.available === true && player.gameInfo.team === "N/A")
                            .map(player => {
                                return (
                                    <div className="player_div" key={player._id}>
                                        <FontAwesomeIcon icon="arrow-circle-left" className={"arrows " + this.props.lockStatus} onClick={() => this.assignTeam(player._id, "Dark")} />
                                        <button className="content_button player_button plain_color">{player.name}</button>
                                        <FontAwesomeIcon icon="times-circle" className={"remove remove_player " + this.props.lockStatus} onClick={() => this.setUnavailable(player._id, player.membershipStatus)} />
                                        <FontAwesomeIcon icon={faArrowAltCircleRight} className={"arrows " + this.props.lockStatus} onClick={() => this.assignTeam(player._id, "White")} />
                                    </div>
                                    )
                                    })
                            ) : (<p>Data has not loaded yet</p>)
                        }

                        {this.props.unavailableMembers ? (this.props.unavailableMembers
                            .map(player => {
                                return (
                                    <div className="player_div" key={player._id}>   
                                        <button className="content_button player_button unavailable" onClick={() => this.makeAvailable(player._id)}>{player.name}</button>
                                    </div>
                                    )
                                    })
                            ) : (<p>Unable to retrieve unavailable Members</p>)
                        }

                        {this.props.notPlayingNonMembers ? (this.props.notPlayingNonMembers
                            .map(player => {
                                return (
                                    <div className="player_div" key={player._id}>   
                                        <button className="content_button player_button negative_color" onClick={() => this.addTenBuckerToDraft(player)}>{player.name}</button>
                                    </div>
                                    )
                                    })
                            ) : (<p>Unable to retrieve Ten Buckers</p>)
                        }


                    </div>
                    <div className="col col_no_bootstrap white_drafted_players">
                    
                    <h1 className="h1_main col_header"><br/>White</h1>
                        {this.props.draft.players ? (this.props.draft.players
                                    .filter(player => player.gameInfo.available === true && player.gameInfo.team === "White")
                                    .map(player => {
                                        return (
                                            <div className="player_div" key={player._id}>
                                                <FontAwesomeIcon icon="arrow-circle-left" className={"arrows " + this.props.lockStatus} size="2x" onClick={() => this.assignTeam(player._id, "N/A")} />
                                                <button className={"content_button player_button leaning_left_color "}>{player.name}</button>
                                                <FontAwesomeIcon icon="times-circle" className={"remove remove_player " + this.props.lockStatus} onClick={() => this.setUnavailable(player._id, player.membershipStatus)} />
                                            </div>
                                            )
                                            })
                                    ) : (<p>Data has not loaded yet</p>)
                                }
                    </div>
                </div>
                ) : 
                // Picking players page
                (<div className="row picker_mode"> 
                    <div className="col col_no_bootstrap set_picks_col">
                        <h1 className="h1_main pick_col_header">Set {this.props.draftMode} Picks</h1>
                        <div className="list_of_unpicked_players">
                        {/* Mapping the unranked Players */}
                        {this.props.unpicked ? (this.props.unpicked
                            .map(player => {
                                return (
                                    <div className="player_picking_div" key={player._id}>
                                        <button className="content_button player_picking lighter_color"  onClick={() => this.addPick(this.props.draftMode, player._id)} >{player.name}</button>
                                        <FontAwesomeIcon icon="angle-right" className="pick_arrow arrows" onClick={() => this.addPick(this.props.draftMode, player._id)} />
                                    </div>
                                )
                            } )
                        ) : ( <p>Bogus data</p> )
                        }
                        </div>
                    </div>
                        <div className="col col_no_bootstrap ranks_col">
                            <h1 className="h1_main pick_col_header">Ranks</h1>
                            {/* mapping the ranked available players */}
                            <div className="list_of_picked_players">
                            {this.props.picked ? (this.props.picked
                                .map(player => {
                                    return (    
                                        <div className="player_picking_div" key={player._id}>
                                            <button className="content_button player_button darker_color">{player.name}</button>
                                            <FontAwesomeIcon icon="minus-circle" className="remove remove_pick" onClick={() => this.removePick(this.props.draftMode, player)} />
                                            <div className="sorter"> 
                                                <FontAwesomeIcon icon="chevron-up" className="up_arrow" onClick={() => this.rankOneUp(player)}/>
                                                <FontAwesomeIcon icon="chevron-down" className="down_arrow" onClick={() => this.rankOneDown(player)}/>
                                            </div>
                                        </div>
                                    )
                                } )
                            ) : ( <p>Bogus data</p> )
                            }
                            </div>
                        </div> 
                </div>)}
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
    draft: state.games.draft,
    gameDate: state.games.gameDate,
    unavailableMembers: state.games.unavailableMembers,
    notPlayingNonMembers: state.games.notPlayingNonMembers,
    gameInfo: state.games.gameInfo,
    lockStatus: state.games.lockStatus,
    draftMode: state.games.draftMode,
    picked: state.games.picked,
    unpicked: state.games.unpicked,
})

export default connect(mapStateToProps, { editGameInfo, addNonMember, setMemberUnavailable, setTenBuckerUnavailable, setAvailable, setPick }) (Drafter)
