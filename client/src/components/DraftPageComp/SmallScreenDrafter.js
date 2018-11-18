import React, { Component } from "react";
import { connect } from 'react-redux';

import { editGameInfo } from '../../js/actions/gameActions'
import { addNonMember } from '../../js/actions/gameActions'
import { setMemberUnavailable } from '../../js/actions/gameActions'
import { setTenBuckerUnavailable } from '../../js/actions/gameActions'
import { setAvailable } from '../../js/actions/gameActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import { loadState } from "../sessionStorage"

class SmallScreenDrafter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draftTeams: true,
            changeAvailability: true,
            draftedDark: 0,
            draftedWhite: 0,
            undrafted: 0
            
        }
    }
    componentDidMount() {
        const privileges = loadState()
        console.log("Data from SessionStorage: ", privileges )
        this.setState(privileges)
    }
    
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

    render() {
        return (
            <main>
                <div className="col_no_bootstrap undraft_players">
                    <h1 className="h1_alternate col_header game_date">{this.props.gameDate}</h1>
                    {this.props.undrafted !== 0 ? 
                    <div className="small_screen_team_names_header">
                        <div className="sstnh sstnhd">
                            <h1 className="h1_main col_header"> <FontAwesomeIcon icon="arrow-circle-left" className="arrows "/> Dark</h1>
                        </div>
                        <div className="sstnh sstnhw">
                            <h1 className="h1_main col_header">White <FontAwesomeIcon icon={faArrowAltCircleRight} className="arrows " /></h1> 
                        </div>
                    </div> : null }

                    {this.props.draft.players ? (this.props.draft.players
                        .filter(player => player.gameInfo.available === true && player.gameInfo.team === "N/A")
                        .map(player => {
                            return (
                                <div className="player_div leaning_center_div" key={player._id}>
                                    {this.state.draftTeams === true ? <FontAwesomeIcon icon="arrow-circle-left" className={"arrows " + this.props.lockStatus} onClick={() => this.assignTeam(player._id, "Dark")} /> : null }
                                    <button className="content_button player_button plain_color">{player.name}</button>
                                    {this.state.changeAvailability === true ? <FontAwesomeIcon icon="times-circle" className={"remove remove_player " + this.props.lockStatus} onClick={() => this.setUnavailable(player._id, player.membershipStatus)} /> : null }
                                    {this.state.draftTeams === true ? <FontAwesomeIcon icon={faArrowAltCircleRight} className={"arrows " + this.props.lockStatus} onClick={() => this.assignTeam(player._id, "White")} /> : null }
                                </div>
                                )
                                })
                        ) : (<p>Data has not loaded yet</p>)
                    }

                    {this.props.unavailableMembers ? (this.props.unavailableMembers
                        .map(player => {
                            return (
                                <div className="player_div" key={player._id}>   
                                    <button className="content_button player_button unavailable" onClick={() => this.state.changeAvailability === true ? this.makeAvailable(player._id) : null } >{player.name}</button>
                                </div>
                                )
                                })
                        ) : (<p>Unable to retrieve unavailable Members</p>)
                    }

                    {this.props.notPlayingNonMembers ? (this.props.notPlayingNonMembers
                        .map(player => {
                            return (
                                <div className="player_div" key={player._id}>   
                                    <button className="content_button player_button negative_color" onClick={() => this.state.changeAvailability === true ? this.addTenBuckerToDraft(player) : null }>{player.name}</button>
                                </div>
                                )
                                })
                        ) : (<p>Unable to retrieve Ten Buckers</p>)
                    }
                </div>
                <div className="small_teams">
                    <div className="col_no_bootstrap dark_draft_players">
                    {this.props.draftedDark || this.props.draftedWhite !== 0 ? <h1 className="h1_alternate col_header"><br/>Dark</h1> : null}
                        <div>
                            {this.props.draft.players ? (this.props.draft.players
                                    .filter(player => player.gameInfo.available === true && player.gameInfo.team === "Dark")
                                    .map(player => {
                                        return (
                                            <div className="player_div" key={player._id}>
                                                {this.state.draftTeams === true ? <FontAwesomeIcon icon="arrow-circle-left" className={"small_screen_arrows sm_dark " + this.props.lockStatus} onClick={() => this.assignTeam(player._id, "N/A")} /> : null }
                                                <button className="content_button player_button black_small_screen">{player.name}</button>
                                                {this.state.changeAvailability === true ? <FontAwesomeIcon icon="times-circle" className={"remove remove_player " + this.props.lockStatus} onClick={() => this.setUnavailable(player._id, player.membershipStatus)} /> : null }
                                            </div>
                                            )
                                            })
                                    ) : (<p>Data has not loaded yet</p>)
                                }
                        </div>
                    </div>
                    
                    <div className="col_no_bootstrap white_draft_players">
                        {this.props.draftedDark || this.props.draftedWhite !== 0 ? <h1 className="h1_alternate col_header"><br/>White</h1> : null}
                        <div>
                        {this.props.draft.players ? (this.props.draft.players
                                .filter(player => player.gameInfo.available === true && player.gameInfo.team === "White")
                                .map(player => {
                                    return (
                                        <div className="player_div" key={player._id}>
                                            <button className="content_button player_button white_small_screen">{player.name}</button>
                                            {this.state.changeAvailability === true ? <FontAwesomeIcon icon="times-circle" className={"remove remove_player " + this.props.lockStatus} onClick={() => this.setUnavailable(player._id, player.membershipStatus)} /> : null }
                                            {this.state.draftTeams === true ? <FontAwesomeIcon icon={faArrowAltCircleRight} className={"small_screen_arrows sm_white " + this.props.lockStatus} onClick={() => this.assignTeam(player._id, "N/A")} /> : null }
                                        </div>
                                        )
                                        })
                                ) : (<p>Data has not loaded yet</p>)
                            }

                        </div>
                    </div>
                </div>
            </main>

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
    draftedDark: state.games.draft.players ? state.games.draft.players.filter(player => player.gameInfo.team === "Dark").length : 0,
    draftedWhite: state.games.draft.players ? state.games.draft.players.filter(player => player.gameInfo.team === "White").length : 0,
    undrafted: state.games.draft.players ? state.games.draft.players.filter(player => player.gameInfo.team === "N/A" && player.gameInfo.available === true).length : 0,
    gameDate: state.games.gameDate,
    unavailableMembers: state.games.unavailableMembers,
    notPlayingNonMembers: state.games.notPlayingNonMembers,
    gameInfo: state.games.gameInfo,
    lockStatus: state.games.lockStatus,
    draftMode: state.games.draftMode,
})

export default connect(mapStateToProps, { editGameInfo, addNonMember, setMemberUnavailable, setTenBuckerUnavailable, setAvailable }) (SmallScreenDrafter)
