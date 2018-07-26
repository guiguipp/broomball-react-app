import React from "react";
import "./GameButton.css";

const GameButton = ({id}) => (
            <button className="btn game_button default_color">{id}</button>
    );
    
export default GameButton;