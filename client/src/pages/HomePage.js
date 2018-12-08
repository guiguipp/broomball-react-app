import React from "react";
import NavBar from "../components/NavBar.js";

const Home = () => (
    <div>
        <NavBar />
        <main className="main_main"> 
            <h1 className="h1_main">Summit Broomball</h1>
            <div className="instructions_div">
                <div className="page_div">
                    <div className="instruction">
                        <p className="instructions_text">Create, Manage, and Edit Players:</p>
                    </div>
                    <div className="instruction">
                        <a href="/Player"><button className="btn contrast_color menu_button">Players</button></a>
                    </div>
                </div>

                <div className="page_div">
                    <div className="instruction">
                        <p className="instructions_text">Schedule Games and Draft Teams:</p>
                    </div>
                    <div className="instruction">
                        <a href="./Draft"><button className="btn contrast_color menu_button">Draft</button></a>
                    </div>
                    
                </div>

                <div className="page_div">
                    <div className="instruction">
                        <p className="instructions_text">Enter Stats for Games:</p>
                    </div>
                    <div className="instruction">
                        <a href="./Stats"><button className="btn contrast_color menu_button" >Stats</button></a>
                    </div>
                    
                </div>

                <div className="page_div">
                    <div className="instruction">
                        <p className="instruction instructions_text">Visualize Recorded Stats:</p>
                    </div> 
                    <div className="instruction">
                        <a href="./Records"><button className="btn contrast_color menu_button" >Records</button></a>
                    </div>
                    
                </div>
            </div>
                
                
                <div className="container">
                    <div className="welcome_text">
                        <p className="text_center">
                        Click on the logo at any time to switch page.
                        </p>
                    </div>
                </div>
            </main>        
        </div>

)
export default Home;
