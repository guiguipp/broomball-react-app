import React, { Component } from "react";

import { connect } from 'react-redux';
import { getGamesForRecords } from '../../js/actions/statsActions'
import { toggleViews } from '../../js/actions/statsActions'
import DateRange from "./DateRange"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class DateSelector extends Component {

    componentDidMount() {
        this.props.getGamesForRecords();
    }

    toggleViews(currentStatus){
        this.props.toggleViews(currentStatus, "dates")
    }

    render() {
        return (
                <div className="full">
                    <div className="header">
                        <div>
                            <h3 className="header_h3" onClick={()=> this.toggleViews(this.props.datePickers)}> {this.props.datePickers === "dead" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Select Dates</h3>
                        </div>
                    </div>
                    <div className="content">
                        <div className={"date_pickers " + this.props.datePickers}>
                            <div className={"calendar_container " + this.props.datePickers}>
                                <DateRange />
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
    allGames: state.stats.gamesForRecords,
    datePickers: state.stats.datePickers,
})

export default connect(mapStateToProps, { getGamesForRecords, toggleViews }) (DateSelector)
