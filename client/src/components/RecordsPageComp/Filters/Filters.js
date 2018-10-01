import React, { Component } from "react";

import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { toggleViews } from '../../../js/actions/statsActions'
import { filterPlayerRecords } from '../../../js/actions/statsActions'


import "./Filters.css";

class Filters extends Component {
    constructor(props){
        super(props);
        this.state = {
            offense: "selected",
            defense: "selected",
            goalie: "selected"
        }
    }
    playerSelection(setting, status){
        // console.log("setting: ", setting, "status: ", status)
        switch (setting) {
            case "offense":
            if (status === "selected") {
                this.setState({...this.state, offense: "unselected"})
                this.props.filterPlayerRecords({...this.state, offense: "unselected"})
            }
            else {
                this.setState({...this.state, offense: "selected"})
                this.props.filterPlayerRecords({...this.state, offense: "selected"})

            }
            break;

            case "defense":
            if (status === "selected") {
                this.setState({...this.state, defense: "unselected"})
                this.props.filterPlayerRecords({...this.state, defense: "unselected"})

            }
            else {
                this.setState({...this.state, defense: "selected"})
                this.props.filterPlayerRecords({...this.state, defense: "selected"})

            }
            break;

            case "goalie":
            if (status === "selected") {
                this.setState({...this.state, goalie: "unselected"})
                this.props.filterPlayerRecords({...this.state, goalie: "unselected"})

            }
            else {
                this.setState({...this.state, goalie: "selected"})
                this.props.filterPlayerRecords({...this.state, goalie: "selected"})

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
                            <li className="filter_item" onClick={()=> this.playerSelection("offense", this.state.offense)}>{this.state.offense === "selected" ? <FontAwesomeIcon icon="check-square" className="checkbox"/> : <FontAwesomeIcon icon={faSquare} className="checkbox"/>}  Offense Players</li>
                            <li className="filter_item" onClick={()=> this.playerSelection("defense", this.state.defense)}>{this.state.defense === "selected" ? <FontAwesomeIcon icon="check-square" className="checkbox" /> : <FontAwesomeIcon icon={faSquare} className="checkbox" />}  Defense Players</li>
                            <li className="filter_item" onClick={()=> this.playerSelection("goalie", this.state.goalie)}>{this.state.goalie === "selected" ? <FontAwesomeIcon icon="check-square" className="checkbox" /> : <FontAwesomeIcon icon={faSquare} className="checkbox" />}  Goalies</li>
                            
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
    sortOptionsDisplay: state.stats.sortOptionsDisplay
})

export default connect(mapStateToProps, { toggleViews, filterPlayerRecords }) (Filters)
