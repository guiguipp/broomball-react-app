import React, { Component } from "react";

import Logo from "../../components/images/logo.jpg";
import Form from "../../components/Form"
import PlayerList  from "../../components/PlayerList"

import "./Player.css";

class Player extends Component { 
    constructor(props) {
    super(props);
        this.state= {
            tab1: "tab show",
            tab2: "tab hide"
        }
        this.toggleTab1Status = this.toggleTab1Status.bind(this)
        this.toggleTab2Status = this.toggleTab2Status.bind(this)
    }

    toggleTab1Status(tab1Visibility){
        if(tab1Visibility === "tab hide") {
            this.setState({...this.state, tab1: "tab show", tab2: "tab hide"})
            }
        }    
    toggleTab2Status(tab2Visibility){
        if (tab2Visibility === "tab hide") {            
            this.setState({...this.state, tab1: "tab hide", tab2: "tab show"})
            }
        }
        
render() {
    return (
    <div>
        <img className="logo_img" src={Logo} alt="logo"/>
        <div className="main_alternate">
                <h1 className="h1_alternate">Summit Broomball</h1>
                <div className="row tab_centering">
                    <span className={this.state.tab1} onClick={() => this.toggleTab1Status(this.state.tab1) }> Players</span>
                    <span className={this.state.tab2} onClick={() => this.toggleTab2Status(this.state.tab2) }> Add Player</span>
                    <span className="tab passive_tab">Nothing</span>
                    <span className="tab passive_tab">Nothing</span>
                </div>
                <div className= "row main_for_tab">
                    <PlayerList />
                    <Form />
                    
                </div>
            </div>
        </div>
    
    )
    }
}


export default Player
