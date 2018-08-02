import React, { Component } from "react";

import { connect } from 'react-redux';
import { addGame } from '../../js/actions/gameActions'

// see doc: https://www.npmjs.com/package/react-datepicker
import DatePicker from "react-datepicker";

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
        console.log("Creating a game")
        let dateOfGame = moment(this.state.dateSelected).format("YYYY-MM-DD")
        this.props.addGame(dateOfGame)
    }


    render() {
        return (
            <div id="schedule_game">
                <div>
                    <h2 className="h2_main">Schedule a game</h2>
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


const mapStateToProps = state => ({
    game: state.game
    })


export default connect(mapStateToProps, { addGame }) (Calendar)
    
