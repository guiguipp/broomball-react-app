import React, { Component } from "react";
// Redux
import { connect } from 'react-redux';
import { toggleGames } from "../../js/actions/displayActions"
/*
import { showFuture } from '../../js/actions/displayActions'
import { showPast } from '../../js/actions/displayActions'
*/
import Logo from "../../components/images/logo.jpg";
import GameList from "../../components/DraftPageComp/GameList";
import Calendar from "../../components/DraftPageComp/Calendar";
import Drafter from "../../components/DraftPageComp/Drafter"
import GameOptionsBottom from "../../components/DraftPageComp/GameOptionsBottom"
import GameOptionsTop from "../../components/DraftPageComp/GameOptionsTop"

import "./Draft.css";

class Draft extends Component { 
toggleGamesFunc(currentlyShowing) {
    this.props.toggleGames(currentlyShowing)
}

render() {
    return (
    <div>
        <img className="logo_img" src={Logo} alt="logo"/>
        <div className="main_main"> 
            <h1 className="h1_main">Summit Broomball</h1>
            <div className= "row">
                <div className="col"><Calendar/></div>
                <div className="col"><GameList/></div>
            </div>
            <div className="row">
                <button className="btn contrast_color change_list_display" onClick={() => this.toggleGamesFunc(this.props.showing)}> {this.props.buttonMsg} </button>
            </div>
        </div>
        <div className={"main_main " + this.props.visibility}>
            <GameOptionsTop />
        </div>
        <div className={"main_main " + this.props.visibility}>
            <Drafter />
        </div>
        <div className={"main_main " + this.props.visibility}>
            <GameOptionsBottom />
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
