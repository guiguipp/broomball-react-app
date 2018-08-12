import React, { Component } from "react";

import { connect } from 'react-redux';
import { toggleTab1 } from '../../js/actions/playerActions'
import { toggleTab2 } from '../../js/actions/playerActions'

import Logo from "../../components/images/logo.jpg";
import Form from "../../components/Form"
import PlayerList  from "../../components/PlayerList"

import "./Player.css";

class Player extends Component { 

    toggleStatusTab1(tab1){
        if (tab1 === "hide") {
            this.props.toggleTab1(tab1)
        }
    }
    toggleStatusTab2(tab2){
        if (tab2 === "hide") {
            this.props.toggleTab2(tab2)
        }
    }
        
render() {
    return (
    <div>
        <img className="logo_img" src={Logo} alt="logo"/>
        <div className="main_alternate">
                <h1 className="h1_alternate">Summit Broomball</h1>
                <div className="row tab_centering">
                    <span className={"tab " + this.props.tab1} onClick={() => this.toggleStatusTab1(this.props.tab1) }> Players</span>
                    <span className={"tab " + this.props.tab2} onClick={() => this.toggleStatusTab2(this.props.tab2) }> {this.props.formMode} Player</span>
                    {/* <span className="tab passive_tab"> \_ _ '/ </span>
                    <span className="tab passive_tab">(° - ° ) </span> */}
                </div>
                <div className= "row main_for_tab">
                    <span className={this.props.panel1}> <PlayerList /> </span> 
                    <span className={this.props.panel2}> <Form /> </span> 
                </div>
            </div>
        </div>
    
    )
    }
}


// export default Player
const mapStateToProps = state => ({
    tab1: state.players.tab1,
    tab2: state.players.tab2,
    panel1: state.players.panel1,
    panel2: state.players.panel2,
    formMode: state.players.formMode
})

// export default GameList;
export default connect(mapStateToProps, { toggleTab1, toggleTab2 }) (Player)
