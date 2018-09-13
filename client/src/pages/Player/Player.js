import React, { Component } from "react";

import { connect } from 'react-redux';
import { toggleTabStatus } from '../../js/actions/playerActions';

import NavBar from "../../components/NavBar";
import Form from "../../components/PlayerPageComp/Form";

import MemberList from "../../components/PlayerPageComp/MemberList/"
import TenBuckerList from "../../components/PlayerPageComp/TenBuckerList/"

import "./Player.css";

class Player extends Component { 

toggleStatus(id, currentStatus) {
    // converting the # of the tab to its index
    let tabIndex = parseInt(id, 10) - 1
    if(currentStatus === "hide") {
        this.props.toggleTabStatus(tabIndex)
    }
}
        
render() {
    return (
    <div>
        <NavBar />
        <div className="main_alternate">
                <h1 className="h1_alternate">Players</h1>
                <div className="row tab_centering">
                    <span id="1" className={"tab " + this.props.tab1} onClick={() => this.toggleStatus("1", this.props.tab1) }> Members </span>
                    <span id="2" className={"tab " + this.props.tab2} onClick={() => this.toggleStatus("2", this.props.tab2) }> Ten Buckers </span>
                    <span id="3" className={"tab " + this.props.tab3} onClick={() => this.toggleStatus("3", this.props.tab3) }> {this.props.formMode} Player </span>
                </div>
                <div className= "row main_for_tab">
                    <span className={this.props.panel1 + " full_tab_size"}> <MemberList /> </span> 
                    <span className={this.props.panel2 + " full_tab_size"}> <TenBuckerList /> </span> 
                    <span className={this.props.panel3 + " full_tab_size"}> <Form /> </span> 
                </div>
            </div>
        </div>
    
    )
    }
}

const mapStateToProps = state => ({
    tab1: state.players.tabs[0],
    tab2: state.players.tabs[1],
    tab3: state.players.tabs[2],
    panel1: state.players.panels[0],
    panel2: state.players.panels[1],
    panel3: state.players.panels[2],
    formMode: state.players.formMode
})

export default connect(mapStateToProps, { toggleTabStatus }) (Player)
