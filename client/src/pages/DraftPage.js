import React, { Component } from "react";
// Redux
import { connect } from 'react-redux';
import { toggleGames } from "../js/actions/displayActions"

import NavBar from "../components/NavBar";
import GameList from "../components/DraftPageComp/GameList.js";
import Calendar from "../components/DraftPageComp/Calendar.js";
import Drafter from "../components/DraftPageComp/Drafter.js"
import SmallScreenDrafter from "../components/DraftPageComp/SmallScreenDrafter.js"
import Picker from "../components/DraftPageComp/Picker.js"
import SmallScreenPicker from "../components/DraftPageComp/SmallScreenPicker.js"
import GameOptionsBottom from "../components/DraftPageComp/GameOptionsBottom.js"
import GameOptionsTop from "../components/DraftPageComp/GameOptionsTop.js"
import Locker from "../components/Locker.js"
import { loadState } from "../components/sessionStorage"

import "../styles/css/draft.css";

const screenSize = window.innerWidth
class Draft extends Component { 
constructor(props) {
    super(props);
    this.state = {
        changeLock: true
    }
}

componentDidMount() {
    const privileges = loadState()
    this.setState(privileges)
    console.log(screenSize)

}

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
                <button className="contrast_color change_list_display" onClick={() => this.toggleGamesFunc(this.props.showing)}> {this.props.buttonMsg} Games</button>
            </div>
        </div>
        <div className={"main_main " + this.props.visibility.top}>
            <GameOptionsTop />
        </div>
        <div className={"main_main " + this.props.visibility.main}>
            {this.props.draftMode === "Draft" ? screenSize > 900 ? <Drafter /> : <SmallScreenDrafter /> : screenSize > 500 ? <Picker /> : <SmallScreenPicker />}
        </div>
        <div className={"main_main " + this.props.visibility.bottom}>
            <GameOptionsBottom />
            {this.state.changeLock === true ? <Locker /> : null }
        </div>
    </div>
    )
    }
}

const mapStateToProps = state => ({
    showing: state.display.showing,
    dateHeader: state.display.dateHeader,
    today: state.display.today,
    buttonMsg: state.display.buttonMsg,
    visibility: state.games.visibility,
    draftMode: state.games.draftMode,
    })

// export default Draft;
export default connect(mapStateToProps, { toggleGames} ) (Draft)
