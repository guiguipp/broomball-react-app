import React, { Component } from "react";
// Redux
import { connect } from 'react-redux';

import Logo from "../../components/images/logo.jpg";
import Calendar from "../../components/Calendar";

import "./Player.css";

class Player extends Component { 



render() {
    return (
    <div>
        <img className="logo_img" src={Logo} alt="logo"/>
        <div>
            <p>Here go the players</p>
        </div>
    </div>
    )
    }
}


export default Player
