import React, { Component } from "react";

import { connect } from 'react-redux';
import { toggleViews } from '../../../js/actions/statsActions'
import { toggleChartOptions } from '../../../js/actions/statsActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {HorizontalBar} from "react-chartjs-2";
// see https://www.npmjs.com/package/react-chartjs-2 for documentation
import "./DataChart.css";

// defaults.global.barThickness = 20;
class DataChart extends Component {
    
    toggleViews(currentStatus) {
        this.props.toggleViews(currentStatus, "chart")
    }

    toggleChart(tabChanging, games, wins, goals, gpg, assists, apg){
        // we create an empty array with the # of players we pull records from, that way, we can remove bars from chart by showing data = 0 
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
            case "unselected_chart_games":
            this.props.toggleChartOptions( 
                {
                    gamesTab: "selected_chart_games",
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
            break;

            case "selected_chart_games":
            this.props.toggleChartOptions({
                    gamesTab: "unselected_chart_games",
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
            break;

            case "unselected_chart_wins":
            this.props.toggleChartOptions({
                    winsTab: "selected_chart_wins",
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
            break;
            
            case "selected_chart_wins":
            this.props.toggleChartOptions({
                    winsTab: "unselected_chart_wins",
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
            break;

            case "unselected_chart_goals":
            this.props.toggleChartOptions({
                    goalsTab: "selected_chart_goals",
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
            break;

            case "selected_chart_goals":
            this.props.toggleChartOptions({
                    goalsTab: "unselected_chart_goals",
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
            break;

            case "unselected_chart_gpg":
            this.props.toggleChartOptions({
                gpgTab: "selected_chart_gpg",
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
            break;

            case "selected_chart_gpg":
            this.props.toggleChartOptions({
                gpgTab: "unselected_chart_gpg",
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
            break;

            case "unselected_chart_assists":
            this.props.toggleChartOptions({
                assistsTab: "selected_chart_assists",
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
            break;

            case "selected_chart_assists":
            this.props.toggleChartOptions({
                assistsTab: "unselected_chart_assists",
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
            break;

            case "unselected_chart_apg":
            this.props.toggleChartOptions({ 
                apgTab: "selected_chart_apg",
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
            break;

            case "selected_chart_apg":
            this.props.toggleChartOptions({ 
                apgTab: "unselected_chart_apg",
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
                            <h3 className="header_h3 " onClick={()=> this.toggleViews(this.props.chartDisplay)}> {this.props.chartDisplay === "hidden" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Chart</h3>
                        </div>
                    </div>
                    <div className="content">
                        <div className={"list_of_options " + this.props.chartDisplay}>
                            
                            <button className={this.props.chartingOptions.gamesTab + " chart_button"} onClick={()=> this.toggleChart(this.props.chartingOptions.gamesTab, this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>Games Played </button>
                            <button className={this.props.chartingOptions.winsTab + " chart_button"} onClick={()=> this.toggleChart(this.props.chartingOptions.winsTab, this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>Win %</button>
                            <button className={this.props.chartingOptions.goalsTab + " chart_button"} onClick={()=> this.toggleChart(this.props.chartingOptions.goalsTab, this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>Goals </button>
                            <button className={this.props.chartingOptions.gpgTab + " chart_button"} onClick={()=> this.toggleChart(this.props.chartingOptions.gpgTab, this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>GPG </button>
                            <button className={this.props.chartingOptions.assistsTab + " chart_button"} onClick={()=> this.toggleChart(this.props.chartingOptions.assistsTab, this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>Assists </button>
                            <button className={this.props.chartingOptions.apgTab + " chart_button"} onClick={()=> this.toggleChart(this.props.chartingOptions.apgTab, this.props.chartingOptions.gamesTab, this.props.chartingOptions.winsTab, this.props.chartingOptions.goalsTab, this.props.chartingOptions.gpgTab, this.props.chartingOptions.assistsTab, this.props.chartingOptions.apgTab )}>APG </button>
                        
                        </div>
                        <div className={"chart " }>
                            {this.props.curatedChartData ?  
                            <div className="chartAreaWrapper">
                                <HorizontalBar
                                    data={this.props.curatedChartData}
                                    options={{
                                            responsive: true,
                                            maintainAspectRatio: true,
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

export default connect(mapStateToProps, { toggleViews, /*toggleChartVisibility,*/ toggleChartOptions }) (DataChart)
