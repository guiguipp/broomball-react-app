import React, { Component } from "react";

import { connect } from 'react-redux';
import { getGamesForRecords } from '../../js/actions/statsActions'
import { selectGame } from '../../js/actions/statsActions'
import { unselectGame } from '../../js/actions/statsActions'
import { selectAllGames } from '../../js/actions/statsActions'
import { unselectAllGames } from '../../js/actions/statsActions'
import { toggleViews } from '../../js/actions/statsActions'

import { updatePlayers } from '../../js/actions/statsActions'
import { batchChartUpdate } from '../../js/actions/statsActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class GameSelector extends Component {

    componentDidMount() {
        this.props.getGamesForRecords();
    }

    unselectGame(game) {
        this.props.unselectGame(game)
        /* Adapting the reducer from Player selector to re-create an array of playerRecords after game has been deleted */
        let playersForRecords = []
        // if the game is added after players have been selected
            if (this.props.selectedPlayers.length > 0) {
                this.props.selectedPlayers.forEach((broomballer) => {
                // re-filter the game array removing the game unselected
                let gamesPlayed = this.props.selectedGames.filter(match => match._id !== game._id).filter(game => game.players.filter(player => player._id === broomballer._id )[0])
                if (gamesPlayed.length > 0) {
                    let playerReduced = gamesPlayed.reduce((players, game) => {
                        let gameInfo = game.players.filter(player => player._id === broomballer._id).map(player => player.gameInfo)
                        let win;
                        let available;
                        players.name = broomballer.name
                        players._id = broomballer._id
                        players.membershipStatus = broomballer.membershipStatus
                        players.preferredPosition = broomballer.preferredPosition
                        
                        players.gamesPlayed = players.gamesPlayed || []
                        if(gameInfo[0].available === true){
                            available= 1
                            players.gamesPlayed.push(available)
                        }
                        
                        players.goals = players.goals || []
                        if(gameInfo[0].available === true) {
                            players.goals.push(gameInfo[0].goals)
                        }
                        
                        players.assists = players.assists || []
                        if (gameInfo[0].available === true) {
                            players.assists.push(gameInfo[0].assists)
                        }
                        
                        players.wins = players.wins || []
                        if(gameInfo[0].available === true && game.win === gameInfo[0].team){
                            win= "Win"
                            players.wins.push(win)
                        }
                        
                        players.losses = players.losses || []
                        if(gameInfo[0].available === true && game.win !== "Tie" && game.win !== gameInfo[0].team){
                            let loss= "Loss"
                            players.losses.push(loss)
                        }

                        players.ties = players.ties || []
                        if(gameInfo[0].available === true && game.win === "Tie"){
                            let tie= "Tie"
                            players.ties.push(tie)
                        }

                        return players
                        }, {});
                        // this line errors if the player is a ten-bucker who didn't play in the remaining games
                        let gamePlayedFromArray = playerReduced.gamesPlayed ? playerReduced.gamesPlayed.length : 0 
                        let winsFromArray = playerReduced.wins.length
                        let lossesFromArray = playerReduced.losses.length
                        let tiesFromArray = playerReduced.ties.length
                        let winPercent = gamePlayedFromArray > 0 ? Math.floor((playerReduced.wins.length / playerReduced.gamesPlayed.length) * 100) : "N/A"
                        let lossPercent = gamePlayedFromArray > 0 ? Math.floor((playerReduced.losses.length / playerReduced.gamesPlayed.length) * 100) : "N/A"
                        let tiePercent = gamePlayedFromArray > 0 ? Math.floor((playerReduced.ties.length / playerReduced.gamesPlayed.length) * 100) : "N/A"
                        let goalsFromArray = playerReduced.goals ? playerReduced.goals.reduce((a,b) => a + b, 0) : 0
                        let assistsFromArray = playerReduced.assists ? playerReduced.assists.reduce((a, b) => a + b, 0) : 0
                        let gpg = gamePlayedFromArray > 0 ? parseFloat((goalsFromArray / gamePlayedFromArray)) : "N/A"
                        let apg = gamePlayedFromArray > 0 ? parseFloat((assistsFromArray / gamePlayedFromArray)) : "N/A"

                        playerReduced.gamesPlayed = gamePlayedFromArray
                        playerReduced.wins = winsFromArray
                        playerReduced.losses = lossesFromArray
                        playerReduced.ties = tiesFromArray
                        playerReduced.winPercent = winPercent
                        playerReduced.lossPercent = lossPercent
                        playerReduced.tiePercent = tiePercent
                        playerReduced.goals = goalsFromArray 
                        playerReduced.assists = assistsFromArray
                        if (gpg !== "N/A") { playerReduced.gpg = Number.isInteger(gpg) ? gpg : gpg.toFixed(3) } else {playerReduced.gpg = gpg} 
                        if (apg !== "N/A") { playerReduced.apg = Number.isInteger(apg) ? apg : apg.toFixed(3) } else {playerReduced.apg = apg} 
                        
            
                        playersForRecords.push(playerReduced)
                        }
                        else {
                            let playerWithoutRecord = {
                                name: broomballer.name,
                                gamesPlayed: 0,
                                goals: "N/A",
                                assists: "N/A",
                                membershipStatus: broomballer.membershipStatus,
                                winPercent: "N/A",
                                lossPercent: "N/A",
                                tiePercent: "N/A",
                                win: "N/A",
                                loss: "N/A",
                                tie: "N/A",
                                gpg: "N/A",
                                apg: "N/A",
                                _id: broomballer._id
                            }
                            // we do not want to create empty cards if zero games are selected
                            if(this.props.selectedGames.length -1 > 0) {
                                playersForRecords.push(playerWithoutRecord)
                            }
                    }
                this.props.updatePlayers( playersForRecords )
                })
            }
    }
    
    gameSelection(arrayOfGames) {
        // this function takes an array of games so that it can be used for both individual and batch select
        // this array is all the games for which records need to be created. 
        
        // marks the selected games as such 
        arrayOfGames.forEach(game => this.markAsSelected(game))
        // need a function that marks non selected games as such
        
        /*  Adapting the reducer originally created in PlayerSelector */
        let transformedArrayForCards = []
        // if the game is added after players have been selected
            if (this.props.selectedPlayers.length > 0) {
                // We will create record for each player * each game selected
                this.props.selectedPlayers.forEach((broomballer) => {
                // we map/filter all games selected to create record for each game played. If the player didn't play any game, we create an empty "N/A" record instead
                let gamesPlayed = arrayOfGames.filter(game => game.players.filter(player => player._id === broomballer._id )[0])
                // If the broomballer played any game 
                if (gamesPlayed.length > 0) {
                    let playerReduced = gamesPlayed.reduce((players, game) => {
                        let gameInfo = game.players.filter(player => player._id === broomballer._id).map(player => player.gameInfo)
                        let win;
                        let available;
                        players.name = broomballer.name
                        players._id = broomballer._id
                        players.membershipStatus = broomballer.membershipStatus
                        players.preferredPosition = broomballer.preferredPosition
                        
                        players.gamesPlayed = players.gamesPlayed || []
                        if(gameInfo[0].available === true){
                            available = 1
                            players.gamesPlayed.push(available)
                        }
                        
                        players.goals = players.goals || []
                        if(gameInfo[0].available === true) {
                            players.goals.push(gameInfo[0].goals)
                        }
                        
                        players.assists = players.assists || []
                        if (gameInfo[0].available === true) {
                            players.assists.push(gameInfo[0].assists)
                        }
                        
                        players.wins = players.wins || []
                        if(gameInfo[0].available === true && game.win === gameInfo[0].team){
                            win= "Win"
                            players.wins.push(win)
                        }

                        players.losses = players.losses || []
                        if(gameInfo[0].available === true && game.win !== "Tie" && game.win !== gameInfo[0].team){
                            let loss= "Loss"
                            players.losses.push(loss)
                        }

                        players.ties = players.ties || []
                        if(gameInfo[0].available === true && game.win === "Tie"){
                            let tie= "Tie"
                            players.ties.push(tie)
                        }
                    
                        return players
                        }, {});
                        
                        let gamePlayedFromArray = playerReduced.gamesPlayed ? playerReduced.gamesPlayed.length : 0 
                        let winsFromArray = playerReduced.wins.length
                        let lossesFromArray = playerReduced.losses.length
                        let tiesFromArray = playerReduced.ties.length
                        let winPercent = gamePlayedFromArray > 0 ? Math.floor((playerReduced.wins.length / playerReduced.gamesPlayed.length) * 100) : "N/A"
                        let lossPercent = gamePlayedFromArray > 0 ? Math.floor((playerReduced.losses.length / playerReduced.gamesPlayed.length) * 100) : "N/A"
                        let tiePercent = gamePlayedFromArray > 0 ? Math.floor((playerReduced.ties.length / playerReduced.gamesPlayed.length) * 100) : "N/A"
                        let goalsFromArray = playerReduced.goals ? playerReduced.goals.reduce((a,b) => a + b, 0) : 0
                        let assistsFromArray = playerReduced.assists ? playerReduced.assists.reduce((a, b) => a + b, 0) : 0
                        let gpg = gamePlayedFromArray > 0 ? parseFloat((goalsFromArray / gamePlayedFromArray)) : "N/A"
                        let apg = gamePlayedFromArray > 0 ? parseFloat((assistsFromArray / gamePlayedFromArray)) : "N/A"

                        playerReduced.gamesPlayed = gamePlayedFromArray
                        playerReduced.wins = winsFromArray
                        playerReduced.losses = lossesFromArray
                        playerReduced.ties = tiesFromArray
                        playerReduced.winPercent = winPercent
                        playerReduced.lossPercent = lossPercent
                        playerReduced.tiePercent = tiePercent
                        playerReduced.goals = goalsFromArray 
                        playerReduced.assists = assistsFromArray
                        if (gpg !== "N/A") { playerReduced.gpg = Number.isInteger(gpg) ? gpg : gpg.toFixed(3) } else {playerReduced.gpg = gpg} 
                        if (apg !== "N/A") { playerReduced.apg = Number.isInteger(apg) ? apg : apg.toFixed(3) } else {playerReduced.apg = apg} 
                        
                        transformedArrayForCards.push(playerReduced)
                    }    
                else {
                    let playerWithoutRecord = {
                        name: broomballer.name,
                        gamesPlayed: 0,
                        goals: "N/A",
                        assists: "N/A",
                        membershipStatus: broomballer.membershipStatus,
                        winPercent: "N/A",
                        lossPercent: "N/A",
                        tiePercent: "N/A",
                        win: "N/A",
                        loss: "N/A",
                        tie: "N/A",
                        gpg: "N/A",
                        apg: "N/A",
                        _id: broomballer._id
                    }
                    transformedArrayForCards.push(playerWithoutRecord)
                }
            })        
            // preventing the data to send before the array is complete
            if (transformedArrayForCards.length === this.props.selectedPlayers.length) {
                this.props.updatePlayers( transformedArrayForCards )
                this.replaceBatchChartData( transformedArrayForCards )
                }
            }
    }

    toggleViews(currentStatus){
        this.props.toggleViews(currentStatus, "games")
    }

    replaceBatchChartData(arrayOfPlayers) {
        let labels = []
        let goalsArray = []
        let assistsArray = []
        let gamesPlayedArray = []
        let winPercentArray = []
        let lossPercentArray = []
        let tiePercentArray = []
        let gpgArray = []
        let apgArray = []
        arrayOfPlayers.forEach(e => {
            labels.push(e.name);
            goalsArray.push(e.goals);
            assistsArray.push(e.assists);
            gamesPlayedArray.push(e.gamesPlayed);
            winPercentArray.push(e.winPercent);
            lossPercentArray.push(e.lossPercent);
            tiePercentArray.push(e.tiePercent);
            gpgArray.push(e.gpg);
            apgArray.push(e.apg);
        })

        let newObject = {
            labels: labels,
            datasets: [
                // This is causing performance issues (reduxDevTools crashing)
                /*{...this.props.chartData.datasets[0], data: goalsArray},
                {...this.props.chartData.datasets[1], data: assistsArray},
                {...this.props.chartData.datasets[2], data: gamesPlayedArray},
                {...this.props.chartData.datasets[3], data: winPercentArray},
                {...this.props.chartData.datasets[4], data: lossPercentArray},
                {...this.props.chartData.datasets[5], data: tiePercentArray},
                {...this.props.chartData.datasets[6], data: gpgArray},
                {...this.props.chartData.datasets[7], data: apgArray}*/
                // we are reinitializing the "metadata" instead
                {
                    label: "Goals",
                    data: goalsArray,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(172,173,178,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255, 99, 132, 0.6)',
                    hoverBorderColor: 'rgba(255, 99, 132, 0.6)',
                },
                {
                    label: "Assists",
                    data: assistsArray,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(172,173,178,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(54, 162, 235, 0.6)',
                    hoverBorderColor: 'rgba(54, 162, 235, 0.6)',
                    barThickness: 15,
                },
                {
                    label: "Games",
                    data: gamesPlayedArray,
                    backgroundColor: 'rgba(255, 206, 86, 0.6)',
                    borderColor: 'rgba(172,173,178,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255, 206, 86, 0.6)',
                    hoverBorderColor: 'rgba(255, 206, 86, 0.6)',
                    barThickness: 15,
                },
                {
                    label: "Wins (%)",
                    data: winPercentArray,
                    backgroundColor: 'rgba(75,192,192,0.6)',
                    borderColor: 'rgba(172,173,178,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75,192,192,0.6)',
                    hoverBorderColor: 'rgba(75,192,192,0.6)',
                    barThickness: 15,
                },
                {
                    label: "Losses (%)",
                    data: lossPercentArray,
                    backgroundColor: '#d3b8ae',
                    borderColor: 'rgba(172,173,178,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: '#d3b8ae',
                    hoverBorderColor: '#d3b8ae',
                    barThickness: 15,
                },
                {
                    label: "Ties (%)",
                    data: tiePercentArray,
                    backgroundColor: '#ff8a65',
                    borderColor: 'rgba(172,173,178,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: '#ff8a65',
                    hoverBorderColor: '#ff8a65',
                    barThickness: 15,
                },
                {
                    label: "GPG",
                    data: gpgArray,
                    backgroundColor: 'rgba(153,102,255,0.6)',
                    borderColor: 'rgba(172,173,178,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(153,102,255,0.6)',
                    hoverBorderColor: 'rgba(153,102,255,0.6)',
                    barThickness: 15,
                },
                {
                    label: "APG",
                    data: apgArray,
                    backgroundColor: 'rgba(255, 159, 64, 0.6)',
                    borderColor: 'rgba(172,173,178,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255, 159, 64, 0.6)',
                    hoverBorderColor: 'rgba(255, 159, 64, 0.6)',
                    options: {barThickness: 100},
                },
                ]
        }
        this.props.batchChartUpdate(newObject)
    }

    selectAllGames(status){
        this.props.selectAllGames(status)
        // we send the whole array of games in the time span to the gameSelection function
        this.gameSelection(this.props.gamesForRecords)
        
    }
    unselectAllGames(){
        this.props.unselectAllGames()
        this.props.gamesForRecords.forEach(game => this.props.unselectGame(game))
        this.gameSelection([])
    }
    // When we hit the "Select All Games", we need to make sure the game has not already been selected
    // otherwise it might be sent twice 
    markAsSelected(game) {
        let arrayOfIds = this.props.selectedGames.map(gamesSelected => gamesSelected._id)
        if ( !arrayOfIds.includes(game._id) ){
            this.props.selectGame(game)
        }
    }

    markAsUnselected(game) {
        let arrayOfIds = this.props.unselectedGames.map(gamesUnselected => gamesUnselected._id)
        console.log("ids of games already unselected: ", arrayOfIds)
        if ( !arrayOfIds.includes(game._id) ){
            this.props.unselectGame(game)
        }
    }

    render() {
        return (
                <div className="full">
                    <div className="header">
                        <div>
                            <h3 className="header_h3" onClick={()=> this.toggleViews(this.props.listOfGames)}> {this.props.listOfGames === "hidden" ? <FontAwesomeIcon icon="caret-right" className="header_icon"/> : <FontAwesomeIcon icon="caret-down" className="header_icon" />}Select Games</h3>
                        </div>
                    </div>
                    <div className="content">
                    <div className={this.props.listOfGames + " select_all"}>
                            <div className="button_options_third_set">
                                {this.props.allGamesSelection === "unselected_game" ? 
                                    <button className={"record_game_button all_button " + this.props.allGamesSelection} onClick={() => this.selectAllGames(this.props.allGamesSelection)}> Games <FontAwesomeIcon icon="plus" className="game_action_icon"/> </button>
                                    :
                                    <button className={"record_game_button all_button " + this.props.allGamesSelection} onClick={() => this.unselectAllGames()}> Games <FontAwesomeIcon icon="times" className="game_action_icon"/> </button>
                                }
                            </div>
                            
                        </div>

                        <div className={"record_list_of_games " + this.props.listOfGames}>
                                {this.props.gamesForRecords.length > 0 ?
                                    this.props.gamesForRecords
                                    .map(game => this.props.selectedGames.indexOf(game) === -1 ? 
                                    (<button key={game._id} className="unselected_game record_game_button" onClick={() => this.gameSelection([game, ...this.props.selectedGames])}> {game._id} <FontAwesomeIcon icon="plus" className="game_action_icon"/> </button>)
                                    : 
                                    (<button key={game._id} className="selected_game record_game_button" onClick={() => this.unselectGame(game)}> {game._id} <FontAwesomeIcon icon="times" className="game_action_icon"/> </button>)
                                )
                                : <p className="no_game">There is currently no game to display</p> 
                            }
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
    selectedGames: state.stats.selectedGames,
    unselectedGames: state.stats.unselectedGames,
    gamesForRecords: state.stats.gamesForRecords, 
    listOfGames: state.stats.listOfGames, // to toggle the visibility
    selectedPlayers: state.stats.selectedPlayers,
    chartData: state.stats.chartData,
    allGamesSelection: state.stats.allGamesSelection
})

export default connect(mapStateToProps, { getGamesForRecords, selectGame, unselectGame, selectAllGames, unselectAllGames, toggleViews, updatePlayers, batchChartUpdate }) (GameSelector)
