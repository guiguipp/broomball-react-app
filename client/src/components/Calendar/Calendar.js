import React, { Component } from "react";
// see doc: https://www.npmjs.com/package/react-datepicker
import DatePicker from "react-datepicker";
import API from "../../utils/API"
import "react-datepicker/dist/react-datepicker.css"
import "./Calendar.css";
const moment = require("moment");
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
        console.log("date in handle change: ", moment(date).format("YYYY-MM-DD"))
        this.setState({
            dateSelected: date
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        let newGame = moment(this.state.dateSelected).format("YYYY-MM-DD")
        API.createNewGame(newGame)
            .then(res => {
                if(res.status !== 200) {
                    throw new Error(res.statusText)
                }
                else {
                    console.log("res.data: ", res.data)
                    // this.setState({...this.state, gameList: res.data})
                }
            })
    }


    render() {
        return (
            <div id="schedule_game">
                <div>
                    <h2>Create a new game</h2>
                </div>

                <div>
                    <form onSubmit={this.handleSubmit} >
                        <div id="in-line">
                            <DatePicker 
                                placeholderText="MM DD YYYY"
                                selected={this.state.dateSelected}
                                onChange={this.handleChange}
                                value={this.state.value}
                                />
                            <button id="date_submit" className="btn contrast_color" name="submit" type="submit" >Submit</button>
                        </div>
                    </form>
                </div>


            </div>
            )
        }
    }
export default Calendar;
