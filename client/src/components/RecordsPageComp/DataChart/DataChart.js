import React, { Component } from "react";

import { connect } from 'react-redux';
import { toggleViews } from '../../../js/actions/statsActions'
import { toggleChartVisibility } from '../../../js/actions/statsActions'
import { toggleChartOptions } from '../../../js/actions/statsActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {HorizontalBar} from "react-chartjs-2";
// see https://www.npmjs.com/package/react-chartjs-2 for documentation

import "./DataChart.css";

class DataChart extends Component {
    toggleViews(currentStatus) {
        this.props.toggleViews(currentStatus, "sort")
    }
    createChart(status){
        this.props.toggleChartVisibility(status)

    }
    toggleChart(tabChanging, games, wins, goals, gpg, assists, apg){
        console.log("Player Records in DataChart.js: ", this.props.playerRecords)
        console.log("chartData: ", this.props.chartData )
        console.log("chartData: ", this.props.curatedChartData )
        let emptyArray = [];

        for (let i = 0; i < this.props.playerRecords.length; i ++) {
            emptyArray.push(0)
        }
        
        
        let newGoals = this.props.chartData.datasets[0]
        let newAssists = this.props.chartData.datasets[1]
        let newGames = this.props.chartData.datasets[2]
        let newWins = this.props.chartData.datasets[3]
        let newGpg = this.props.chartData.datasets[4]
        let newApg = this.props.chartData.datasets[5]
        
        let existingGoals = this.props.curatedChartData.datasets[0]
        let existingAssists = this.props.curatedChartData.datasets[1]
        let existingGames = this.props.curatedChartData.datasets[2]
        let existingWins = this.props.curatedChartData.datasets[3]
        let existingGpg = this.props.curatedChartData.datasets[4]
        let existingApg = this.props.curatedChartData.datasets[5]


        switch (tabChanging) {
            case "games":
            if (games === "unselected_chart") {
                this.props.toggleChartOptions( 
                    {
                        gamesTab: "selected_chart",
                        winsTab: wins,
                        goalsTab: goals,
                        gpgTab: gpg,
                        assistsTab: assists,
                        apgTab: apg
                        },
                        {
                        ...this.props.chartData,
                        datasets: [ existingGoals, existingAssists, newGames, existingWins, existingGpg, existingApg]
                        }
                    )
                }
            else {
                this.props.toggleChartOptions({
                        gamesTab: "unselected_chart",
                        winsTab: wins,
                        goalsTab: goals,
                        gpgTab: gpg,
                        assistsTab: assists,
                        apgTab: apg
                        },
                        {
                            ...this.props.chartData,
                            datasets: [existingGoals, existingAssists, {...existingGames, data: emptyArray}, existingWins, existingGpg, existingApg]
                        }
                    )
            }
            break;

            case "wins":
            if (wins === "unselected_chart") {
                this.props.toggleChartOptions({
                        winsTab: "selected_chart",
                        gamesTab: games,
                        goalsTab: goals,
                        gpgTab: gpg,
                        assistsTab: assists,
                        apgTab: apg
                    },
                    {
                    ...this.props.chartData,
                    datasets: [ existingGoals, existingAssists, existingGames, newWins, existingGpg, existingApg]
                    } 
                    )
                }
            else {
                this.props.toggleChartOptions({
                        winsTab: "unselected_chart",
                        gamesTab: games,
                        goalsTab: goals,
                        gpgTab: gpg,
                        assistsTab: assists,
                        apgTab: apg
                    },
                    {
                        ...this.props.chartData,
                        datasets: [existingGoals, existingAssists, existingGames, {...existingWins, data: emptyArray}, existingGpg, existingApg]
                    } 
                    )
            }
            break;

            case "goals":
            if (goals === "unselected_chart") {
                this.props.toggleChartOptions({
                        goalsTab: "selected_chart",
                        gamesTab: games,
                        winsTab: wins,
                        gpgTab: gpg,
                        assistsTab: assists,
                        apgTab: apg
                    },
                    {
                    ...this.props.chartData,
                    datasets: [ newGoals, existingAssists, existingGames, existingWins, existingGpg, existingApg]
                    }
                    )
                }
            else {
                this.props.toggleChartOptions({
                        goalsTab: "unselected_chart",
                        gamesTab: games,
                        winsTab: wins,
                        gpgTab: gpg,
                        assistsTab: assists,
                        apgTab: apg
                    }, 
                    {
                        ...this.props.chartData,
                        datasets: [{...existingGoals, data: emptyArray}, existingAssists, existingGames, existingWins, existingGpg, existingApg]
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
                        assistsTab: assists,
                        apgTab: apg
                    }, 
                    {
                    ...this.props.chartData,
                    datasets: [ existingGoals, existingAssists, existingGames, existingWins, newGpg, existingApg]
                    }
                    )
                }
            else {
                this.props.toggleChartOptions({
                        gpgTab: "unselected_chart",
                        gamesTab: games,
                        winsTab: wins,
                        goalsTab: goals,
                        assistsTab: assists,
                        apgTab: apg
                    },
                    {
                        ...this.props.chartData,
                        datasets: [existingGoals, existingAssists, existingGames, existingWins, {...existingGpg, data: emptyArray}, existingApg]
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
                        apgTab: apg
                    },
                    {
                    ...this.props.chartData,
                    datasets: [ existingGoals, newAssists, existingGames, existingWins, existingGpg, existingApg]
                    })
                }
            else {
                this.props.toggleChartOptions({
                        assistsTab: "unselected_chart",
                        gamesTab: games,
                        winsTab: wins,
                        goalsTab: goals,
                        gpgTab: gpg,
                        apgTab: apg
                    },
                    {
                    ...this.props.chartData,
                    datasets: [existingGoals, {...existingAssists, data: emptyArray}, existingGames, existingWins, existingGpg, existingApg]
                    }
                    )
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
                        assistsTab: assists
                    },
                    {
                    ...this.props.chartData,
                    datasets: [ existingGoals, existingAssists, existingGames, existingWins, existingGpg, newApg]
                    }
                    )
                }
            else {
                this.props.toggleChartOptions({ 
                        apgTab: "unselected_chart",
                        gamesTab: games,
                        winsTab: wins,
                        goalsTab: goals,
                        gpgTab: gpg,
                        assistsTab: assists
                    },
                    {
                        ...this.props.chartData,
                        datasets: [ existingGoals, existingAssists, existingGames, existingWins, existingGpg, {...existingApg, data: emptyArray}]
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
                            <h3 className="header_h3 " onClick={()=> this.createChart(this.props.chartDisplay)}> {this.props.chartDisplay === "hidden" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Chart</h3>
                        </div>
                    </div>
                    <div className="content">
                        <div className={"list_of_options " + this.props.chartDisplay}>
                            
                            <button className={this.props.chartingOptions.gamesTab + " chart_button"} onClick={()=> this.toggleChart("games", this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>Games Played </button>
                            <button className={this.props.chartingOptions.winsTab + " chart_button"} onClick={()=> this.toggleChart("wins", this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>Games Won </button>
                            <button className={this.props.chartingOptions.goalsTab + " chart_button"} onClick={()=> this.toggleChart("goals", this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>Goals </button>
                            <button className={this.props.chartingOptions.gpgTab + " chart_button"} onClick={()=> this.toggleChart("gpg", this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>GPG </button>
                            <button className={this.props.chartingOptions.assistsTab + " chart_button"} onClick={()=> this.toggleChart("assists", this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>Assists </button>
                            <button className={this.props.chartingOptions.apgTab + " chart_button"} onClick={()=> this.toggleChart("apg", this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>APG </button>
                        
                        </div>
                        <div className={"chart " + this.props.chartDisplay}>
                            {this.props.curatedChartData ?  
                            <HorizontalBar
                                data={this.props.curatedChartData}
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
    curatedChartData: state.stats.curatedChartData,
    chartDisplay: state.stats.chartDisplay,
    chartingOptions: state.stats.chartingOptions,
})

export default connect(mapStateToProps, { toggleViews, toggleChartVisibility, toggleChartOptions }) (DataChart)
