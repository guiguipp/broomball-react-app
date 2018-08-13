import React, { Component } from "react";

import { connect } from 'react-redux';
import { toggleTabStatus } from '../../js/actions/playerActions';

import Logo from "../../components/images/logo.jpg";
import Form from "../../components/Form";
// import PlayerList  from "../../components/PlayerList";
import PlayerList from "../../components/PlayerList/"

import "./Player.css";

class Player extends Component { 

toggleStatus(id, currentStatus) {
    let tabIndex = parseInt(id, 10) - 1
    console.log("TabIndex: ",tabIndex, "\ncurrentStatus: ", currentStatus)
    if(currentStatus === "hide") {
        this.props.toggleTabStatus(tabIndex)
    }
}
        
render() {
    return (
    <div>
        <img className="logo_img" src={Logo} alt="logo"/>
        <div className="main_alternate">
                <h1 className="h1_alternate">Summit Broomball</h1>
                <div className="row tab_centering">
                    <span id="1" className={"tab " + this.props.tab1} onClick={() => this.toggleStatus("1", this.props.tab1) }> Members </span>
                    <span id="2" className={"tab " + this.props.tab2} onClick={() => this.toggleStatus("2", this.props.tab2) }> Ten Buckers </span>
                    <span id="3" className={"tab " + this.props.tab3} onClick={() => this.toggleStatus("3", this.props.tab3) }> {this.props.formMode} Player </span>
                    {/* <span className="tab passive_tab"> \_ _ '/ </span>
                    <span className="tab passive_tab">(° - ° ) </span> */}
                </div>
                <div className= "row main_for_tab">
                    <span className={this.props.panel1}> <PlayerList /> </span> 
                    <span className={this.props.panel2}> <p>Nothing yet</p> </span> 
                    <span className={this.props.panel3}> <Form /> </span> 
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
