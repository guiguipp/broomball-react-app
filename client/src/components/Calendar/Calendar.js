import React, { Component } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"
import "./Calendar.css";
class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(date) {
        console.log("date in handle change: ", date)
        this.setState({
            startDate: date
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(this.value)
        this.setState({...this.state, date: this.value})
    }


    render() {
        return (
            <div id="schedule_game">
                <div>
                    <h2>Create a new game</h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <DatePicker 
                        placeholderText="MM DD YYYY"
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        value={this.state.value}
                        />
                    <div className="form-group "> 
                        <button id="date_submit" className="btn btn-primary regular_grey" name="submit" type="submit">Submit</button>
                    </div>
                </form>
            </div>
            )
        }
    }
export default Calendar;
