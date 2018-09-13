import React, { Component } from "react";

// Redux
import { connect } from 'react-redux';
import { toggleVisibility } from "../../js/actions/statsActions"

import NavBar from "../../components/NavBar";
import PastGameList from "../../components/StatsPageComp/PastGamesList"
import ScoreBoard from "../../components/StatsPageComp/ScoreBoard"
import NoStatsBoard from "../../components/StatsPageComp/NoStatsBoard"
import Locker from "../../components/Locker"

import "./Stats.css";

class Stats extends Component {         
render() {
    return (
        <div>
            <NavBar />
            <div className="main_main">
                    <h1 className="h1_main">Enter Stats</h1>
                <div className= "row ">
                    <PastGameList />
                </div>
            </div>
            <div className={"main_main " + this.props.visibility.gameStats}>
                <div className= "row ">
                    <ScoreBoard />
                </div>
                <div className= "row ">
                    <Locker />
                </div>
            </div>
            
            <div className={"main_main " + this.props.visibility.noStatsMessage}>
                <div className= "row ">
                    <NoStatsBoard />
                </div>
            </div>
        </div>
    
    )
    }
}

// export default Stats
const mapStateToProps = state => ({
    visibility: state.games.visibility,
    })

// export default Draft;
export default connect(mapStateToProps, { toggleVisibility } ) (Stats)
