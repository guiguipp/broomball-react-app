import React, { Component } from "react";
import SmallLogo from "../../components/images/logo_sm.jpeg"

import "./NavBar.css";


class NavBar extends Component {
    render() {
        return (
            <nav>
                <div className="pos-f-t">
                    <div className="collapse" id="navbarToggleExternalContent">
                        <div className="bg-dark p-4">
                        <h4 className="nav_title">Summit Broomball</h4>
                        <div className="navbar-nav">
                            <a className="nav-item nav-link" href="/">Home</a>
                            <a className="nav-item nav-link" href="/Player">Players</a>
                            <a className="nav-item nav-link" href="/Draft">Draft</a>
                            <a className="nav-item nav-link" href="/Stats">Stats</a>
                            <a className="nav-item nav-link" href="/Records">Records</a>
                            <a className="nav-item nav-link" href="/Login">Login</a> {/* Will change depending on state*/}
                        </div>
                    </div>
                    </div>
                    <nav className="navbar bg">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                            <img className="toggler_img" src={SmallLogo} alt="logo" />
                        </button>
                    </nav>
                    </div>
            </nav>
            )
        }
}


export default NavBar
