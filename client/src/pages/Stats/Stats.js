import React, { Component } from "react";

// Redux
import { connect } from 'react-redux';
import { toggleVisibility } from "../../js/actions/statsActions"

import Logo from "../../components/images/logo.jpg";
import PastGameList from "../../components/StatsPageComp/PastGamesList"
import ScoreBoard from "../../components/StatsPageComp/ScoreBoard"
import NoStatsBoard from "../../components/StatsPageComp/NoStatsBoard"

import "./Stats.css";

class Stats extends Component {         
render() {
    return (
        <div>
            <img className="logo_img" src={Logo} alt="logo"/>
                    <h1 className="h1_alternate">Enter Stats</h1>
            <div className="main_main">
                <div className= "row ">
                    <PastGameList />
                </div>
            </div>
            <div className={"main_main " + this.props.visibility.gameStats}>
                <div className= "row ">
                    <ScoreBoard />
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
