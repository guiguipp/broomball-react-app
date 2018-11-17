import React, { Component } from "react";
import { connect } from 'react-redux';

import { editGameInfo } from '../../js/actions/gameActions'
import { setPick } from '../../js/actions/gameActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { loadState } from "../sessionStorage"

class Drafter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draftTeams: true,
            changeAvailability: true,
        }
    }
    componentDidMount() {
        const privileges = loadState()
        console.log("Data from SessionStorage: ", privileges )
        this.setState(privileges)
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
            <main>
                <div className="row picker_mode"> 
                    <div className="col col_no_bootstrap set_picks_col">
                        <h1 className="h1_main pick_col_header unpicked_list_header">Set {this.props.draftMode} Picks</h1>
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
                            <h1 className="h1_main pick_col_header picked_list_header">Ranks</h1>
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
    gameDate: state.games.gameDate,
    unavailableMembers: state.games.unavailableMembers,
    notPlayingNonMembers: state.games.notPlayingNonMembers,
    gameInfo: state.games.gameInfo,
    lockStatus: state.games.lockStatus,
    draftMode: state.games.draftMode,
    picked: state.games.picked,
    unpicked: state.games.unpicked,
})

export default connect(mapStateToProps, { editGameInfo, setPick }) (Drafter)
