import React, { Component } from "react";

import { connect } from 'react-redux';
// see doc: https://www.npmjs.com/package/react-datepicker
import DatePicker from "react-datepicker";
import { selectDateRange } from "../../../js/actions/statsActions"
import "react-datepicker/dist/react-datepicker.css"
import "./DateRange.css";


const moment = require("moment");
class DateRange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChangeStart(date) {
        this.setState({
            startDate: date
        })
    }

    handleChangeEnd(date) {
        this.setState({
            endDate: date
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        let startDate = moment(this.state.startDate).format("YYYY-MM-DD")
        let endDate = moment(this.state.endDate).format("YYYY-MM-DD")
        this.props.selectDateRange(startDate, endDate)
    }


    render() {
        return (
            <div className={"records_calendar " + this.props.datePickers}>
                <div className="calendar_alignment">
                    <form onSubmit={this.handleSubmit} >
                        <div id="in-line">
                        <DatePicker
                            placeholderText="From: MM DD YYYY"
                            selected={this.state.startDate}
                            selectsStart
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChangeStart}
                            isClearable={true}
                        />

                        <DatePicker
                            placeholderText="To:     MM DD YYYY"
                            selected={this.state.endDate}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChangeEnd}
                            isClearable={true}
                        />
                            <div className="date_range_options">
                                <button id="range_submit" className="content_button btn contrast_color" name="submit" type="submit" >Submit</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
            )
        }
    }


const mapStateToProps = state => ({
    datePickers: state.stats.datePickers
    })


export default connect(mapStateToProps, { selectDateRange }) (DateRange)
    