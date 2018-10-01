import React, { Component } from "react";

import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { toggleViews } from '../../../js/actions/statsActions'
import { filterPlayerRecords } from '../../../js/actions/statsActions'
import { enableFilter } from '../../../js/actions/statsActions'


import "./Filters.css";

class Filters extends Component {
    /*
    constructor(props){
        super(props);
        this.state = {
            offense: "selected",
            defense: "selected",
            goalie: "selected"
        }
    }*/

    playerSelection(setting, status){
        // console.log("setting: ", setting, "status: ", status)
        switch (setting) {
            case "offense":
            if (status === "selected") {
                this.props.enableFilter({offense: "unselected", defense: this.props.defense, goalie: this.props.goalie})
                this.props.filterPlayerRecords({offense: "unselected", defense: this.props.defense, goalie: this.props.goalie})
            }
            else {
                this.props.enableFilter({offense: "selected", defense: this.props.defense, goalie: this.props.goalie})
                this.props.filterPlayerRecords({offense: "selected", defense: this.props.defense, goalie: this.props.goalie})

            }
            break;

            case "defense":
            if (status === "selected") {
                this.props.enableFilter({defense: "unselected", offense: this.props.offense, goalie: this.props.goalie})
                this.props.filterPlayerRecords({defense: "unselected", offense: this.props.offense, goalie: this.props.goalie})

            }
            else {
                this.props.enableFilter({defense: "selected", offense: this.props.offense, goalie: this.props.goalie})
                this.props.filterPlayerRecords({defense: "selected", offense: this.props.offense, goalie: this.props.goalie})

            }
            break;

            case "goalie":
            if (status === "selected") {
                this.props.enableFilter({goalie: "unselected", defense: this.props.defense, offense: this.props.offense})
                this.props.filterPlayerRecords({goalie: "unselected", defense: this.props.defense, offense: this.props.offense})

            }
            else {
                this.props.enableFilter({goalie: "selected", defense: this.props.defense, offense: this.props.offense})
                this.props.filterPlayerRecords({goalie: "selected", defense: this.props.defense, offense: this.props.offense})

            }
            break;

            default:
            return;
        }
    }


    toggleViews(currentStatus) {
        this.props.toggleViews(currentStatus, "sort")
    }

    render() {
        return(
            <div className="full">
                <div className="header">
                    <div>
                        <h3 className="header_h3 " onClick={()=> this.toggleViews(this.props.sortOptionsDisplay)}> {this.props.sortOptionsDisplay === "hidden" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Filters</h3>
                    </div>
                </div>
            <div className="content">
                <div className={"list_of_options " + this.props.sortOptionsDisplay}>
                    <div className="filter_panel">
                        <h3 className="filter_name">Players</h3>
                        <ul className="check_list">
                            <li className="filter_item" onClick={()=> this.playerSelection("offense",  this.props.offense)}>{ this.props.offense === "selected" ? <FontAwesomeIcon icon="check-square" className="checkbox"/> : <FontAwesomeIcon icon={faSquare} className="checkbox"/>}  Offense Players</li>
                            <li className="filter_item" onClick={()=> this.playerSelection("defense",  this.props.defense)}>{ this.props.defense === "selected" ? <FontAwesomeIcon icon="check-square" className="checkbox" /> : <FontAwesomeIcon icon={faSquare} className="checkbox" />}  Defense Players</li>
                            <li className="filter_item" onClick={()=> this.playerSelection("goalie",  this.props.goalie)}>{ this.props.goalie === "selected" ? <FontAwesomeIcon icon="check-square" className="checkbox" /> : <FontAwesomeIcon icon={faSquare} className="checkbox" />}  Goalies</li>
                            
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
    offense: state.stats.filters.offense,
    defense: state.stats.filters.defense,
    goalie: state.stats.filters.goalie,
})

export default connect(mapStateToProps, { toggleViews, filterPlayerRecords, enableFilter }) (Filters)
