import React, {Component} from 'react';

import { connect } from 'react-redux';
import { editGameInfo } from '../../../js/actions/gameActions'
// import { deletePlayer } from '../../../js/actions/playerActions'
// import { editForm } from '../../../js/actions/playerActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./ScoreBoard.css"

class ScoreBoard extends Component {
    
    logStat(playerID, type, currentValue){
        switch (type){
            case "add_goal_dark":
            let goalUpdate = currentValue + 1;
            let scoreUpdate = this.props.game.goals_dark + 1;
            this.props.editGameInfo(this.props.game._id, {player: playerID, gameInfo: {goals: goalUpdate}})
            this.props.editGameInfo(this.props.game._id, {goals_dark: scoreUpdate})
            // this.props.editGameInfo(this.props.game._id, {combinedUpdate: {goals_dark: scoreUpdate,player: playerID, gameInfo: {goals: newValue}}})
            break;

            case "add_goal_white":
            goalUpdate = currentValue + 1;
            scoreUpdate = this.props.game.goals_white + 1;
            this.props.editGameInfo(this.props.game._id, {player: playerID, gameInfo: {goals: goalUpdate}})
            this.props.editGameInfo(this.props.game._id, {goals_white: scoreUpdate})
            break;

            case "substract_goal_dark":
            goalUpdate = currentValue - 1;
            scoreUpdate = this.props.game.goals_dark - 1;
            if (goalUpdate >= 0 && scoreUpdate >= 0){
                this.props.editGameInfo(this.props.game._id, {player: playerID, gameInfo: {goals: goalUpdate}})
                this.props.editGameInfo(this.props.game._id, {goals_dark: scoreUpdate})
                }
            break;

            case "substract_goal_white":
            goalUpdate = currentValue - 1;
            scoreUpdate = this.props.game.goals_white - 1;
            if (goalUpdate >= 0 && scoreUpdate >= 0){
                this.props.editGameInfo(this.props.game._id, {player: playerID, gameInfo: {goals: goalUpdate}})
                this.props.editGameInfo(this.props.game._id, {goals_white: scoreUpdate})
                }
            break;

            case "add_assist":
            let assistUpdate = currentValue + 1;
            this.props.editGameInfo(this.props.game._id, {player: playerID, gameInfo: {assists: assistUpdate}})
            break;

            
            case "substract_assist":
            assistUpdate = currentValue - 1;
            if (assistUpdate >= 0){
                this.props.editGameInfo(this.props.game._id, {player: playerID, gameInfo: {assists: assistUpdate}})
                }
            break;

            default:
            return;
        }

    }

    render() {
        return (
            <div className="row tables_container">
                <div className="col table_container">
                    <h1 className="h1_alternate">Dark<br/>{this.props.game.goals_dark}</h1>
                    <table>
                        <thead>
                            <tr>
                                <th className="table_col_name">Player</th> 
                                <th className="table_col_name">Goals</th>
                                <th className="table_col_name">Assists</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.players ? (this.props.players
                                .filter(player => player.gameInfo.available === true && player.gameInfo.team === "Dark")
                                .map(player => {
                                    return (
                                        <tr className="stats_row" key={player._id}> 
                                            <td className="player_stats">{player.name}
                                            </td>
                                            <td className="player_stats">
                                                <div className="stats">
                                                    <FontAwesomeIcon icon="plus-circle" className="darker_icon" onClick={()=> this.logStat(player._id,"add_goal_dark",player.gameInfo.goals)} />
                                                    <div className={player.gameInfo.goals > 0 ? "nice" : null + " data"}>{player.gameInfo.goals}</div> 
                                                    <FontAwesomeIcon icon="minus-circle" className="darker_icon" onClick={()=> this.logStat(player._id,"substract_goal_dark",player.gameInfo.goals)}  />
                                                </div>
                                            </td>

                                            <td className="player_stats">
                                                <div className="stats">
                                                    <FontAwesomeIcon icon="plus-circle" className="lighter_icon" onClick={()=> this.logStat(player._id,"add_assist",player.gameInfo.assists)} />
                                                    <div className={player.gameInfo.assists > 0 ? "good" : null + " data"}>{player.gameInfo.assists}</div> 
                                                    <FontAwesomeIcon icon="minus-circle" className="lighter_icon" onClick={()=> this.logStat(player._id,"substract_assist",player.gameInfo.assists)} />
                                                </div>
                                            </td>
                                        </tr>
                                        )
                                    })
                                ) : null
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col table_container">
                        <h1 className="h1_alternate">White<br/>{this.props.game.goals_white}</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th className="table_col_name">Player</th> 
                                    <th className="table_col_name">Goals</th>
                                    <th className="table_col_name">Assists</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.players ? (this.props.players
                                    .filter(player => player.gameInfo.available === true && player.gameInfo.team === "White")
                                    .map(player => {
                                        return (
                                            <tr className="stats_row" key={player._id}> 
                                                <td className="player_stats">{player.name}
                                                </td>
                                                <td className="player_stats">
                                                    <div className="stats">
                                                        <FontAwesomeIcon icon="plus-circle" size="2x" className="darker_icon" onClick={()=> this.logStat(player._id,"add_goal_white",player.gameInfo.goals)} />
                                                        <div className={player.gameInfo.goals > 0 ? "nice" : null + " data"}>{player.gameInfo.goals}</div> 
                                                        <FontAwesomeIcon icon="minus-circle" size="2x" className="darker_icon" onClick={()=> this.logStat(player._id,"substract_goal_white",player.gameInfo.goals)}  />
                                                    </div>
                                                </td>

                                                <td className="player_stats">
                                                    <div className="stats">
                                                        <FontAwesomeIcon icon="plus-circle" size="2x" className="lighter_icon" onClick={()=> this.logStat(player._id,"add_assist",player.gameInfo.assists)} />
                                                        <div className={player.gameInfo.assists > 0 ? "good" : null + " data"}>{player.gameInfo.assists}</div> 
                                                        <FontAwesomeIcon icon="minus-circle" size="2x" className="lighter_icon" onClick={()=> this.logStat(player._id,"substract_assist",player.gameInfo.assists)} />
                                                    </div>
                                                </td>
                                            </tr>
                                            )
                                        })
                                    ) : null
                                    }
                            </tbody>
                        </table>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => ({
    game: state.games.draft,
    players: state.games.draft.players,
})

export default connect(mapStateToProps, { editGameInfo }) (ScoreBoard)
