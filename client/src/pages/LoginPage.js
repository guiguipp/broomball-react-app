import React, { Component } from "react";
// Redux
import { connect } from 'react-redux';
import { toggleTabStatus } from "../js/actions/authenticateActions"

import NavBar from "../components/NavBar.js";
import LoginForm from "../components/LoginForm.js";

class Login extends Component { 


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
        <div className="main_alternate">
            <h1 className="h1_alternate">Login</h1>
            <div className="two_tab_centering">
                <span id="1" className={"auth_tab " + this.props.tab1 } onClick={() => this.toggleStatus("1", this.props.tab1) }> Sign-in </span>
                <span id="2" className={"auth_tab " + this.props.tab2 } onClick={() => this.toggleStatus("2", this.props.tab2) }> Sign-up </span>
            </div>
            <div className= "main_for_tab">
                <LoginForm />
            </div>
        </div>
    </div>
    )
    }
}
// export default Draft;

const mapStateToProps = state => ({
    tab1: state.authenticate.tabs[0],
    tab2: state.authenticate.tabs[1],
    })

// export default Draft;
export default connect(mapStateToProps, { toggleTabStatus } ) (Login)
