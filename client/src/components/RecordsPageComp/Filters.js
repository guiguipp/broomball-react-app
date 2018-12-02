import React, { Component } from "react";

import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { toggleViews } from '../../js/actions/statsActions'
import { filterPlayerRecordsByType } from '../../js/actions/statsActions'
import { filterPlayerRecordsByGames } from '../../js/actions/statsActions'

class Filters extends Component {

    playerSelection(setting, status){
        switch (setting) {
            case "offense":
            if (status === "selected") {
                this.props.filterPlayerRecordsByType({offense: "unselected", defense: this.props.defense, goalie: this.props.goalie})
            }
            else {
                this.props.filterPlayerRecordsByType({offense: "selected", defense: this.props.defense, goalie: this.props.goalie})

            }
            break;

            case "defense":
            if (status === "selected") {
                this.props.filterPlayerRecordsByType({defense: "unselected", offense: this.props.offense, goalie: this.props.goalie})

            }
            else {
                this.props.filterPlayerRecordsByType({defense: "selected", offense: this.props.offense, goalie: this.props.goalie})

            }
            break;

            case "goalie":
            if (status === "selected") {
                this.props.filterPlayerRecordsByType({goalie: "unselected", defense: this.props.defense, offense: this.props.offense})

            }
            else {
                this.props.filterPlayerRecordsByType({goalie: "selected", defense: this.props.defense, offense: this.props.offense})

            }
            break;

            default:
            return;
        }
    }


    toggleViews(currentStatus) {
        this.props.toggleViews(currentStatus, "sort")
    }
    gameSelection(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        switch (name) {
            case "operator":
            this.props.filterPlayerRecordsByGames({[name]: value, gamePercent: this.props.gamePercent})
            break;
            
            case "gamePercent":
            this.props.filterPlayerRecordsByGames({operator: this.props.operator, [name]: value})
            break;

            default: 
            return;
        }
    }
    render() {
        return(
            <div className="full">
                <div className="header">
                    <div>
                        <h3 className="header_h3 " onClick={()=> this.toggleViews(this.props.sortOptionsDisplay)}> {this.props.sortOptionsDisplay === "dead" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Filters</h3>
                    </div>
                </div>
            <div className={"content " + this.props.sortOptionsDisplay}>
                <div className="list_of_options">
                    <div className="filter_panel">
                        <h3 className="filter_name">Players</h3>
                        <ul className="check_list">
                            <li className="filter_item" onClick={()=> this.playerSelection("offense",  this.props.offense)}>{ this.props.offense === "selected" ? <FontAwesomeIcon icon="check-square" className="checkbox"/> : <FontAwesomeIcon icon={faSquare} className="checkbox"/>}  Offense Players</li>
                            <li className="filter_item" onClick={()=> this.playerSelection("defense",  this.props.defense)}>{ this.props.defense === "selected" ? <FontAwesomeIcon icon="check-square" className="checkbox" /> : <FontAwesomeIcon icon={faSquare} className="checkbox" />}  Defense Players</li>
                            <li className="filter_item" onClick={()=> this.playerSelection("goalie",  this.props.goalie)}>{ this.props.goalie === "selected" ? <FontAwesomeIcon icon="check-square" className="checkbox" /> : <FontAwesomeIcon icon={faSquare} className="checkbox" />}  Goalies</li>        
                        </ul> 
                    </div>
                    
                    <div className="filter_panel">
                        <h3 className="filter_name">Attendance</h3>
                            <ul className="check_list">
                                <li className="filter_item">Played 
                                <select className="custom-select" name="operator" onChange={(event) => this.gameSelection(event)} value= {this.props.operator}>
                                    <option value="+"> more than </option>
                                    <option value="-"> less than </option>
                                </select>
                                <select className="custom-select" name="gamePercent" onChange={(event) => this.gameSelection(event)} value= {this.props.gamePercent}>
                                    <option value="100"> 100% </option>
                                    <option value="90"> 90% </option>
                                    <option value="80"> 80% </option>
                                    <option value="70"> 70% </option>
                                    <option value="60"> 60% </option>
                                    <option value="50"> 50% </option>
                                    <option value="40"> 40% </option>
                                    <option value="30"> 30% </option>
                                    <option value="20"> 20% </option>
                                    <option value="10"> 10% </option>
                                    <option value="0"> 0% </option>
                                </select>
                                    of the games </li>
                            </ul> 
                    </div>

                </div>
            </div>
        </div>
        )
    }

}

const mapStateToProps = state => ({
    playerRecords: state.stats.playerRecords,
    datePickers: state.stats.datePickers,
    selectedGames: state.stats.selectedGames,
    selectedPlayers: state.stats.selectedPlayers,
    sortOptionsDisplay: state.stats.sortOptionsDisplay,
    offense: state.stats.playerFilters.offense,
    defense: state.stats.playerFilters.defense,
    goalie: state.stats.playerFilters.goalie,
    operator: state.stats.gameFilters.operator,
    gamePercent: state.stats.gameFilters.gamePercent,
})

export default connect(mapStateToProps, { toggleViews, filterPlayerRecordsByType, filterPlayerRecordsByGames }) (Filters)
