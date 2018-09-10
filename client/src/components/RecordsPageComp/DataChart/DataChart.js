import React, { Component } from "react";

import { connect } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {HorizontalBar} from "react-chartjs-2";
// see https://www.npmjs.com/package/react-chartjs-2 for documentation

import "./DataChart.css";

class DataChart extends Component {

    componentDidMount() {
        // console.log("this.props.playerRecord: ", this.props.playerRecord)
        // not when it mounts, because it's going to receive props after players + games are selected
    }


    render(){
        
        return (
                <div className="chart">
                    <HorizontalBar
                        data={this.props.chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true
                            }}
                    />  
                </div>
                )
            
            }
        }
/*
Games.propTypes = {
    fetchGames: PropTypes.func.isRequired,
    games: PropTypes.array.isRequired
}
*/

const mapStateToProps = state => ({
    playerRecords: state.stats.playerRecords,
    chartData: state.stats.chartData,
})

export default connect(mapStateToProps, { /*getGamesForRecords, toggleViews*/ }) (DataChart)
