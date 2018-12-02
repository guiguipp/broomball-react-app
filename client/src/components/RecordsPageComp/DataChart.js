import React, { Component } from "react";

import { connect } from 'react-redux';
import { toggleViews } from '../../js/actions/statsActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {HorizontalBar} from "react-chartjs-2";
// see https://www.npmjs.com/package/react-chartjs-2 for documentation

// defaults.global.barThickness = 20;
class DataChart extends Component {
    
    toggleViews(currentStatus) {
        this.props.toggleViews(currentStatus, "chart")
    }

    render(){
        
        return (
                <div className="full">
                    <div className="header">
                        <div>
                            <h3 className="header_h3 " onClick={()=> this.toggleViews(this.props.chartDisplay)}> {this.props.chartDisplay === "dead" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Show Chart</h3>
                        </div>
                    </div>
                    <div className="content">
                        
                        <div className={"chart " }>
                            {this.props.chartData && this.props.chartDisplay !== "dead" ?  
                            <div className="chartAreaWrapper">
                                <HorizontalBar
                                    data={this.props.curatedChartData}
                                    height= { this.props.chartData.labels.length * 50 }
                                    className= { this.props.chartDisplay }
                                    options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            barThickness: 100
                                            }}
                                    />
                            </div> : null }  
                        </div>
                    </div>
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
    curatedChartData: state.stats.curatedChartData,
    chartDisplay: state.stats.chartDisplay,
    chartingOptions: state.stats.chartingOptions,
})

export default connect(mapStateToProps, { toggleViews }) (DataChart)
