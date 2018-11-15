import React, { Component } from 'react';

class NoStatsBoard extends Component {
    render(){
        return (
            <div className="no_stats_message">
                <p className="no_game">The teams for this game have not been drafted yet. Please come back later!
                </p>    
            </div>
        )
    }
}

export default NoStatsBoard;
