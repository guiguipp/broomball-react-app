import React, { Component } from "react";

import Logo from "../../components/images/logo.jpg";
import Form from "../../components/Form"
import PlayerList  from "../../components/PlayerList"

import "./Player.css";

class Player extends Component { 
    
        
render() {
    return (
    <div>
        <img className="logo_img" src={Logo} alt="logo"/>
        <div className="main_alternate"> 
            <h1 className="h1_alternate">Summit Broomball</h1>
            <div className= "row">
                <Form />
                <PlayerList />
                
            </div>
        </div>
    </div>
    )
    }
}


export default Player
