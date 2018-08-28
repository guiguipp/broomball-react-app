import React, { Component } from "react";
import { connect } from 'react-redux';

import { editGameInfo } from '../../../js/actions/gameActions'
import { addNonMember } from '../../../js/actions/gameActions'
import { setMemberUnavailable } from '../../../js/actions/gameActions'
import { setTenBuckerUnavailable } from '../../../js/actions/gameActions'
import { setAvailable } from '../../../js/actions/gameActions'

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

    setPick(team, playerID){
        console.log("Click recorded")
    }

    render() {
        return (
            <div>
                {this.props.draftMode === "Draft" ? 
                    (<div className="row">
                    <div className="col col_no_bootstrap">
                        <h1 className="h1_main"><br/>Dark</h1>
                        {this.props.draft.players ? (this.props.draft.players
                                .filter(player => player.gameInfo.available === true && player.gameInfo.team === "Dark")
                                .map(player => {
                                    return (
                                        <div className="player_div" key={player._id}>
                                            <button className="player_button leaning_right_color">{player.name}</button>
                                            <i className={"fa fa-times-circle remove remove_player " + this.props.lockStatus} onClick={() => this.setUnavailable(player._id, player.membershipStatus)}> </i>
                                            <i className={"fa fa-arrow-circle-o-right arrows " + this.props.lockStatus} onClick={() => this.assignTeam(player._id, "N/A")}></i>
                                        </div>
                                        )
                                        })
                                ) : (<p>Data has not loaded yet</p>)
                            }
                    </div>
                    <div className="col col_no_bootstrap">
                    <h1 className="h1_alternate">{this.props.gameDate}<br/><br/></h1>
                        {this.props.draft.players ? (this.props.draft.players
                            .filter(player => player.gameInfo.available === true && player.gameInfo.team === "N/A")
                            .map(player => {
                                return (
                                    <div className="player_div" key={player._id}>
                                        <i className={"fa fa-arrow-circle-left arrows " + this.props.lockStatus} onClick={() => this.assignTeam(player._id, "Dark")}></i>
                                        <button className="player_button plain_color">{player.name}</button>
                                        <i className={"fa fa-times-circle remove remove_player " + this.props.lockStatus} onClick={() => this.setUnavailable(player._id, player.membershipStatus)}> </i>
                                        <i className={"fa fa-arrow-circle-o-right arrows " + this.props.lockStatus} onClick={() => this.assignTeam(player._id, "White")}></i>
                                    </div>
                                    )
                                    })
                            ) : (<p>Data has not loaded yet</p>)
                        }

                        {this.props.unavailableMembers ? (this.props.unavailableMembers
                            .map(player => {
                                return (
                                    <div className="player_div" key={player._id}>   
                                        <button className="player_button unavailable" onClick={() => this.makeAvailable(player._id)}>{player.name}</button>
                                    </div>
                                    )
                                    })
                            ) : (<p>Unable to retrieve unavailable Members</p>)
                        }

                        {this.props.notPlayingNonMembers ? (this.props.notPlayingNonMembers
                            .map(player => {
                                return (
                                    <div className="player_div" key={player._id}>   
                                        <button className="player_button negative_color" onClick={() => this.addTenBuckerToDraft(player)}>{player.name}</button>
                                    </div>
                                    )
                                    })
                            ) : (<p>Unable to retrieve Ten Buckers</p>)
                        }


                    </div>
                    <div className="col col_no_bootstrap">
                    
                    <h1 className="h1_main"><br/>White</h1>
                        {this.props.draft.players ? (this.props.draft.players
                                    .filter(player => player.gameInfo.available === true && player.gameInfo.team === "White")
                                    .map(player => {
                                        return (
                                            <div className="player_div" key={player._id}>
                                                <i className={"fa fa-arrow-circle-left arrows " + this.props.lockStatus} onClick={() => this.assignTeam(player._id, "N/A")}></i>
                                                <button className={"player_button leaning_left_color "}>{player.name}</button>
                                                <i className={"fa fa-times-circle remove remove_player " + this.props.lockStatus} onClick={() => this.setUnavailable(player._id, player.membershipStatus)}> </i>
                                            </div>
                                            )
                                            })
                                    ) : (<p>Data has not loaded yet</p>)
                                }
                    </div>
                </div>
                ) : 
                (<div className="row"> 
                    <div className="col col_no_bootstrap">
                        <h1 className="h1_main">Set {this.props.draftMode} Picks</h1>
                        {/* Setting the Dark Picks case */}
                        
                        {/* Mapping the unranked Players */}
                        {this.props.draft.players ? (this.props.draft.players
                            // mapping the unranked available players
                            .filter(player => player.gameInfo.pickDark === 0 && player.gameInfo.available === true)
                            .map(player => {
                                return (
                                    <div className="player_div" key={player._id}>
                                        <button className="player_button lighter_color">{player.name}</button>
                                        <i className="fa fa-arrow-circle-o-right pick_arrow arrows" onClick={() => this.setPick(this.props.draftMode, player._id)}></i>
                                    </div>
                                )
                            } )
                        ) : ( <p>Bogus data</p> )
                    }
                    </div>
                    <div className="col col_no_bootstrap">
                        <h1 className="h1_main">Ranks</h1>
                        
                        {this.props.draft.players ? (this.props.draft.players
                            // mapping the ranked available players
                            .filter(player => player.gameInfo.pickDark !== 0 && player.gameInfo.available === true)
                            .map(player => {
                                return (
                                    <div className="player_div" key={player._id}>
                                        <button className="player_button lighter_color">{player.name}</button>
                                        <i className="fa fa-arrow-circle-o-right pick_arrow arrows" onClick={() => this.setPick(this.props.draftMode, player._id)}></i>
                                    </div>
                                )
                            } )
                        ) : ( <p>Bogus data</p> )
                        }
            
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
    draftMode: state.games.draftMode
})

export default connect(mapStateToProps, { editGameInfo, addNonMember, setMemberUnavailable, setTenBuckerUnavailable, setAvailable }) (Drafter)
