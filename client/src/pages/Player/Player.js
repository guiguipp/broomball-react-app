import React, { Component } from "react";

import Logo from "../../components/images/logo.jpg";
import Form from "../../components/Form"
import PlayerList  from "../../components/PlayerList"

import "./Player.css";

class Player extends Component { 
    constructor(props) {
    super(props);
        this.state= {
            tab1: "show",
            tab2: "hide",
            panel1: "visible",
            panel2: "hidden"
        }
        this.toggleTab1Status = this.toggleTab1Status.bind(this)
        this.toggleTab2Status = this.toggleTab2Status.bind(this)
    }

    toggleTab1Status(tab1Visibility){
        console.log("Clicked. Tab1Visibility: ", tab1Visibility)
        if(tab1Visibility === "hide") {
            this.setState({
                ...this.state, 
                tab1: "show", 
                tab2: "hide",
                panel1: "visible",
                panel2: "hidden"
            })
            }
        }    
    toggleTab2Status(tab2Visibility){
        console.log("Other click. Tab2Visibility: ", tab2Visibility)
        if (tab2Visibility === "hide") {            
            this.setState({
                ...this.state, 
                tab1: "hide", 
                tab2: "show",
                panel1: "hidden",
                panel2: "visible"
            })
            }
        }
        
render() {
    return (
    <div>
        <img className="logo_img" src={Logo} alt="logo"/>
        <div className="main_alternate">
                <h1 className="h1_alternate">Summit Broomball</h1>
                <div className="row tab_centering">
                    <span className={"tab " + this.state.tab1} onClick={() => this.toggleTab1Status(this.state.tab1) }> Players</span>
                    <span className={"tab " + this.state.tab2} onClick={() => this.toggleTab2Status(this.state.tab2) }> Add Player</span>
                    {/* <span className="tab passive_tab"> \_ _ '/ </span>
                    <span className="tab passive_tab">(° - ° ) </span> */}
                </div>
                <div className= "row main_for_tab">
                    <span className={this.state.panel1}> <PlayerList /> </span> 
                    <span className={this.state.panel2}> <Form /> </span> 
                </div>
            </div>
        </div>
    
    )
    }
}


export default Player
