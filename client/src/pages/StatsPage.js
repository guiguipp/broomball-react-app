import React, { Component } from "react";

// Redux
import { connect } from 'react-redux';
import { toggleVisibility } from "../js/actions/statsActions"

import NavBar from "../components/NavBar";
import PastGameList from "../components/StatsPageComp/PastGamesList.js"
import ScoreBoard from "../components/StatsPageComp/ScoreBoard.js"
import NoStatsBoard from "../components/StatsPageComp/NoStatsBoard.js"

class Stats extends Component {         
render() {
    return (
        <div>
            <NavBar />
            <main>
                <section className="main_main">
                    <h1 className="h1_main">Enter Stats</h1>
                    <PastGameList />
                </section>
                {this.props.visibility.noStatsMessage === "visible" ? 
                (<section className={"main_main " + this.props.visibility.noStatsMessage}>
                    <NoStatsBoard />
                </section>) : 
                (<section className={"main_main " + this.props.visibility.gameStats}>
                    <ScoreBoard />
                </section>)}
            </main>
        </div>
        )
    }
}

// export default Stats
const mapStateToProps = state => ({
    visibility: state.games.visibility,
    })

// export default Draft;
export default connect(mapStateToProps, { toggleVisibility } ) (Stats)
