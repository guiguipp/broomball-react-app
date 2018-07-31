import React from "react";
import "./Draft.css";
import GameList from "../../components/GameList";
import Logo from "../../components/images/logo.jpg";
import Calendar from "../../components/Calendar";

const Draft = () => (
    <div>
        <img src={Logo} alt="logo"/>
        <div className="main"> 
            <h1>Summit Broomball</h1>
            <div className= "row">
                <div className="col"><Calendar/></div>
                <div className="col"><GameList/></div>
            </div>
        </div>
    </div>

)
export default Draft;
