import React from "react";
import "./GameButton.css";

const GameButton = ({id}) => (
        <div>
            <button className="btn game_button default_color">{id}</button>
            <i className="fa fa-times-circle remove remove_game" id={id}></i>
        </div>
        
);
    
export default GameButton;