
import React, { Component } from "react";

import { connect } from 'react-redux';
import { toggleTabStatus } from '../js/actions/playerActions';

import NavBar from "../components/NavBar.js";
import Form from "../components/PlayerPageComp/Form.js";
import MemberList from "../components/PlayerPageComp/MemberList.js"
import TenBuckerList from "../components/PlayerPageComp/TenBuckerList.js"

class Player extends Component {

toggleStatus(id, currentStatus) {
    // converting the # of the tab to its index
    let tabIndex = parseInt(id, 10) - 1
    if(currentStatus === "hide_tab") {
        this.props.toggleTabStatus(tabIndex)
    }
}
        
render() {
    return (
    <div>
        <NavBar />
        <main className="main_alternate">
            <h1 className="h1_alternate">Players</h1>
            <div className="player_table_head">
                    <div className="tab_centering">
                        <span id="1" className={"tab " + this.props.tab1} onClick={() => this.toggleStatus("1", this.props.tab1) }> Members </span>
                        <span id="2" className={"tab " + this.props.tab2} onClick={() => this.toggleStatus("2", this.props.tab2) }> Buckers </span>
                        <span id="3" className={"tab " + this.props.tab3} onClick={() => this.toggleStatus("3", this.props.tab3) }> {this.props.formMode} </span>
                    </div>
            </div>
                <section className= "main_for_tab">
                    <span className={this.props.panel1 + " full_tab_size"}> <MemberList /> </span> 
                    <span className={this.props.panel2 + " full_tab_size"}> <TenBuckerList /> </span> 
                    <span className={this.props.panel3 + " full_tab_size"}> <Form /> </span> 
                </section>
        </main>
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
