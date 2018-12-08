import React, { Component } from "react";
// Redux
import { connect } from 'react-redux';

import NavBar from "../components/NavBar.js"
import DateSelector from "../components/RecordsPageComp/DateSelector.js"
import GameSelector from "../components/RecordsPageComp/GameSelector.js"
import PlayerSelector from "../components/RecordsPageComp/PlayerSelector.js"
import Showcase from "../components/RecordsPageComp/Showcase.js"
import Filters from "../components/RecordsPageComp/Filters.js"
import DataChart from "../components/RecordsPageComp/DataChart.js"
class Records extends Component { 

render() {
    return (
    <div>
        <NavBar />
        <main className="main_main main_padded"> 
            <h1 className="h1_main">League Records</h1>
            
            <section>
                < DateSelector />
            </section>
            
            <section>
                < GameSelector />
            </section>
            
            <section>
                < PlayerSelector />
            </section>
            
            <section>
                < DataChart />
            </section>

            <section>
                < Showcase />
            </section>

            <section>
                < Filters />
            </section>
        </main>
    </div>
    )
    }
}
// export default Draft;

const mapStateToProps = state => ({
    games: state.games.games
    })

// export default Draft;
export default connect(mapStateToProps) (Records)
