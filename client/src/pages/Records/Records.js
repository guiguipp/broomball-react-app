import React, { Component } from "react";
// Redux
import { connect } from 'react-redux';

import NavBar from "../../components/NavBar"
import DateSelector from "../../components/RecordsPageComp/DateSelector"
import GameSelector from "../../components/RecordsPageComp/GameSelector"
import PlayerSelector from "../../components/RecordsPageComp/PlayerSelector"
import Showcase from "../../components/RecordsPageComp/Showcase"
import DataChart from "../../components/RecordsPageComp/DataChart"

import "./Records.css";

class Records extends Component { 

render() {
    return (
    <div>
        <NavBar />
        <div className="main_main"> 
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
