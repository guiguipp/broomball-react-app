import React, { Component } from "react";
// Redux
import { connect } from 'react-redux';
import { toggleGames } from "../../js/actions/displayActions"

import NavBar from "../../components/NavBar";
import GameList from "../../components/DraftPageComp/GameList";
import Calendar from "../../components/DraftPageComp/Calendar";
import Drafter from "../../components/DraftPageComp/Drafter"
import GameOptionsBottom from "../../components/DraftPageComp/GameOptionsBottom"
import GameOptionsTop from "../../components/DraftPageComp/GameOptionsTop"
import Locker from "../../components/Locker"

import "./Draft.css";

class Draft extends Component { 
toggleGamesFunc(currentlyShowing) {
    this.props.toggleGames(currentlyShowing)
}

render() {
    return (
    <div>
        <NavBar />
        <div className="main_main"> 
            <h1 className="h1_main">Draft Teams</h1>
            <div className= "row organizer">
                <div className="col"><Calendar/></div>
                <div className="col"><GameList/></div>
            </div>
            <div className="row">
                <button className="btn contrast_color change_list_display" onClick={() => this.toggleGamesFunc(this.props.showing)}> {this.props.buttonMsg} Games</button>
            </div>
        </div>
        <div className={"main_main " + this.props.visibility.top}>
            <GameOptionsTop />
        </div>
        <div className={"main_main " + this.props.visibility.main}>
            <Drafter />
        </div>
        <div className={"main_main " + this.props.visibility.bottom}>
            <GameOptionsBottom />
            <Locker />
        </div>
    </div>
    )
    }
}
// export default Draft;

const mapStateToProps = state => ({
    showing: state.display.showing,
    dateHeader: state.display.dateHeader,
    today: state.display.today,
    buttonMsg: state.display.buttonMsg,
    visibility: state.games.visibility
    })

// export default Draft;
export default connect(mapStateToProps, { toggleGames} ) (Draft)
