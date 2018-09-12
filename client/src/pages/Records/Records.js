import React, { Component } from "react";
// Redux
import { connect } from 'react-redux';
// import { fetchGames } from "../../js/actions/gameActions"
import DateSelector from "../../components/RecordsPageComp/DateSelector"
import GameSelector from "../../components/RecordsPageComp/GameSelector"
import PlayerSelector from "../../components/RecordsPageComp/PlayerSelector"
import Showcase from "../../components/RecordsPageComp/Showcase"
import DataChart from "../../components/RecordsPageComp/DataChart"

import Logo from "../../components/images/logo.jpg";

import "./Records.css";

class Records extends Component { 
componentDidMount() {
    // this.props.fetchGames()
}

render() {
    return (
    <div>
        <img className="logo_img" src={Logo} alt="logo"/>
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
