import React from "react";
import "./Button.css";

const Button = ({id}) => (
        <button className="btn game_button default_color">{id}</button>
    );
    
export default Button;