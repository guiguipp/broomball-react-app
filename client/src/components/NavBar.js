import React, { Component } from "react";
import SmallLogo from "../components/images/logo_sm.jpeg"

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navDisplay: "noShow",
            navItemsVisibility: "hidden",
        }
        this.handleScroll = this.handleScroll.bind(this);
    }
    handleScroll() {
        this.setState({scroll: window.scrollY})
    }
    componentDidMount() {
        const navbar = document.querySelector("nav")
        this.setState({...this.state, top: navbar.offsetTop, height: navbar.offsetHeight})
        window.addEventListener('scroll', this.handleScroll)
    }

    changeStatus(status) {
        this.setState({ navDisplay: status === "noShow" ? "show" : "noShow", navItemsVisibility: status === "noShow" ? "visible" : "hidden" })
    }

    render() {
        return (
            <nav className={this.state.scroll > this.state.height ? this.state.navDisplay + " stickyNav" : this.state.navDisplay + " nonStickyNav"}>
                <div className={this.state.navDisplay + " darkNavBar"}>
                    <h4 className={this.state.navItemsVisibility + " nav_title"}>Summit Broomball</h4>
                    <div className={this.state.navItemsVisibility + " navbar-nav"}>
                        <a className={this.state.navItemsVisibility + " nav-item nav-link"} href="/">Home</a>
                        <a className={this.state.navItemsVisibility + " nav-item nav-link"} href="/Player">Players</a>
                        <a className={this.state.navItemsVisibility + " nav-item nav-link"} href="/Draft">Draft</a>
                        <a className={this.state.navItemsVisibility + " nav-item nav-link"} href="/Stats">Stats</a>
                        <a className={this.state.navItemsVisibility + " nav-item nav-link"} href="/Records">Records</a>
                        <a className={this.state.navItemsVisibility + " nav-item nav-link"} href="/Login">Login</a>
                    </div>
                </div>

                <div className="navbar bg">
                    <button className="navbar-toggler" type="button">
                        <img onClick={() => this.changeStatus(this.state.navDisplay)} className=" toggler_img" src={SmallLogo} alt="logo" />
                    </button>
                </div>
            </nav>
            )
        }
}


export default NavBar
