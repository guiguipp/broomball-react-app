import React, { Component } from "react";
// Redux
import { connect } from 'react-redux';

import NavBar from "../components/NavBar"
import DateSelector from "../components/RecordsPageComp/DateSelector.js"
import GameSelector from "../components/RecordsPageComp/GameSelector.js"
import PlayerSelector from "../components/RecordsPageComp/PlayerSelector.js"
import Showcase from "../components/RecordsPageComp/Showcase.js"
import Filters from "../components/RecordsPageComp/Filters.js"
import DataChart from "../components/RecordsPageComp/DataChart.js"

import "../styles/css/records.css";

class Records extends Component { 

render() {
    return (
    <div>
        <NavBar />
        <div className="main_main main_padded"> 
            <h1 className="h1_main">League Records</h1>
            
            <div className= "row">
                < DateSelector />
            </div>
            
            <div className= "row">
                < GameSelector />
            </div>
            
            <div className= "row">
                < PlayerSelector />
            </div>
            
            <div className= "row">
                < DataChart />
            </div>

            <div className= "row">
                < Showcase />
            </div>

            <div className= "row">
                < Filters />
            </div>
        </div>
    </div>
    )
    }
}
// export default Draft;

const mapStateToProps = state => ({
    games: state.games.games
    })

// export default Draft;
export default connect(mapStateToProps) (Records)
