import React, { Component } from "react";

import { connect } from 'react-redux';
import { toggleViews } from '../../../js/actions/statsActions'
import { toggleChartOptions } from '../../../js/actions/statsActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {HorizontalBar} from "react-chartjs-2";
// see https://www.npmjs.com/package/react-chartjs-2 for documentation

import "./DataChart.css";

class DataChart extends Component {

    componentDidMount() {
        // console.log("this.props.playerRecord: ", this.props.playerRecord)
        // not when it mounts, because it's going to receive props after players + games are selected
    }
    toggleViews(currentStatus) {
        this.props.toggleViews(currentStatus, "sort")
    }

    toggleChart(tabChanging, az, games, wins, goals, gpg, assists, apg){
        switch (tabChanging) {
            case "az":
            if (az === "unselected_chart") {
                this.props.toggleChartOptions({ 
                    azTab: "selected_chart",
                    gamesTab: games,
                    winsTab: wins,
                    goalsTab: goals,
                    gpgTab: gpg,
                    assistsTab: assists,
                    apgTab: apg
                    })
                }
            else {
                this.props.toggleChartOptions({ 
                    azTab: "unselected_chart",
                    gamesTab: games,
                    winsTab: wins,
                    goalsTab: goals,
                    gpgTab: gpg,
                    assistsTab: assists,
                    apgTab: apg
                    })
            }
            break;
            
            case "games":
            if (games === "unselected_chart") {
                this.props.toggleChartOptions({ 
                    azTab: az,
                    gamesTab: "selected_chart",
                    winsTab: wins,
                    goalsTab: goals,
                    gpgTab: gpg,
                    assistsTab: assists,
                    apgTab: apg
                    })
                }
            else {
                this.props.toggleChartOptions({ 
                    gamesTab: "unselected_chart",
                    azTab: az,
                    winsTab: wins,
                    goalsTab: goals,
                    gpgTab: gpg,
                    assistsTab: assists,
                    apgTab: apg
                    })
            }
            break;

            case "wins":
            if (wins === "unselected_chart") {
                this.props.toggleChartOptions({ 
                    winsTab: "selected_chart",
                    gamesTab: games,
                    azTab: az,
                    goalsTab: goals,
                    gpgTab: gpg,
                    assistsTab: assists,
                    apgTab: apg
                    })
                }
            else {
                this.props.toggleChartOptions({ 
                    winsTab: "unselected_chart",
                    gamesTab: games,
                    azTab: az,
                    goalsTab: goals,
                    gpgTab: gpg,
                    assistsTab: assists,
                    apgTab: apg
                    })
            }
            break;

            case "goals":
            if (goals === "unselected_chart") {
                this.props.toggleChartOptions({ 
                    goalsTab: "selected_chart",
                    gamesTab: games,
                    winsTab: wins,
                    azTab: az,
                    gpgTab: gpg,
                    assistsTab: assists,
                    apgTab: apg
                    })
                }
            else {
                this.props.toggleChartOptions({ 
                    goalsTab: "unselected_chart",
                    gamesTab: games,
                    winsTab: wins,
                    azTab: az,
                    gpgTab: gpg,
                    assistsTab: assists,
                    apgTab: apg
                    })
            }
            break;

            case "gpg":
            if (gpg === "unselected_chart") {
                this.props.toggleChartOptions({ 
                    gpgTab: "selected_chart",
                    gamesTab: games,
                    winsTab: wins,
                    goalsTab: goals,
                    azTab: az,
                    assistsTab: assists,
                    apgTab: apg
                    })
                }
            else {
                this.props.toggleChartOptions({ 
                    gpgTab: "unselected_chart",
                    gamesTab: games,
                    winsTab: wins,
                    goalsTab: goals,
                    azTab: az,
                    assistsTab: assists,
                    apgTab: apg
                    })
            }
            break;

            case "assists":
            if (assists === "unselected_chart") {
                this.props.toggleChartOptions({ 
                    assistsTab: "selected_chart",
                    gamesTab: games,
                    winsTab: wins,
                    goalsTab: goals,
                    gpgTab: gpg,
                    azTab: az,
                    apgTab: apg
                    })
                }
            else {
                this.props.toggleChartOptions({ 
                    assistsTab: "unselected_chart",
                    gamesTab: games,
                    winsTab: wins,
                    goalsTab: goals,
                    gpgTab: gpg,
                    azTab: az,
                    apgTab: apg
                    })
            }
            break;

            case "apg":
            if (apg === "unselected_chart") {
                this.props.toggleChartOptions({ 
                    apgTab: "selected_chart",
                    gamesTab: games,
                    winsTab: wins,
                    goalsTab: goals,
                    gpgTab: gpg,
                    assistsTab: assists,
                    azTab: az
                    })
                }
            else {
                this.props.toggleChartOptions({ 
                    apgTab: "unselected_chart",
                    gamesTab: games,
                    winsTab: wins,
                    goalsTab: goals,
                    gpgTab: gpg,
                    assistsTab: assists,
                    azTab: az
                    })
            }
            break;

            default:
            break;
        }
        
        
    }


    render(){
        
        return (
                <div className="full">
                    <div className="header">
                        <div>
                            <h3 className="header_h3 " onClick={()=> this.toggleViews(this.props.sortOptionsDisplay)}> {this.props.sortOptionsDisplay === "hidden" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Chart</h3>
                        </div>
                    </div>
                    <div className="content">
                        <div className={"list_of_options " + this.props.sortOptionsDisplay}>
                            
                            <button className={this.props.chartingOptions.azTab + " chart_button"} onClick={()=> this.toggleChart("az", this.props.chartingOptions.azTab, this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>A-Z </button>
                            <button className={this.props.chartingOptions.gamesTab + " chart_button"} onClick={()=> this.toggleChart("games", this.props.chartingOptions.azTab, this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>Games Played </button>
                            <button className={this.props.chartingOptions.winsTab + " chart_button"} onClick={()=> this.toggleChart("wins", this.props.chartingOptions.azTab, this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>Games Won </button>
                            <button className={this.props.chartingOptions.goalsTab + " chart_button"} onClick={()=> this.toggleChart("goals", this.props.chartingOptions.azTab, this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>Goals </button>
                            <button className={this.props.chartingOptions.gpgTab + " chart_button"} onClick={()=> this.toggleChart("gpg", this.props.chartingOptions.azTab, this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>GPG </button>
                            <button className={this.props.chartingOptions.assistsTab + " chart_button"} onClick={()=> this.toggleChart("assists", this.props.chartingOptions.azTab, this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>Assists </button>
                            <button className={this.props.chartingOptions.apgTab + " chart_button"} onClick={()=> this.toggleChart("apg", this.props.chartingOptions.azTab, this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>APG </button>
                        
                        </div>
                        <div className={"chart " + this.props.sortOptionsDisplay}>
                            {this.props.chartData.labels.length > 0 ?  
                            <HorizontalBar
                                data={this.props.chartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true
                                    }}
                            /> : null }  
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
    sortOptionsDisplay: state.stats.sortOptionsDisplay,
    chartingOptions: state.stats.chartingOptions,
})

export default connect(mapStateToProps, { toggleViews, toggleChartOptions }) (DataChart)
