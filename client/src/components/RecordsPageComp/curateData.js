export const createCardsArray = (arrayOfPlayers, arrayOfGames) => {
    // we do not want to fire the function if either array is empty
    if (arrayOfGames.length > 0 && arrayOfPlayers.length > 0) {
        // array to store the info
        let transformedArrayForCards = [];
        // for each player in the array
        arrayOfPlayers.forEach((broomballer) => {
            // we map/filter all games selected to create record for each game played.
    
            // if the player didn't play any game, we create an empty "N/A" record instead (otherwise misleading)
            let gamesPlayed = arrayOfGames.filter(game => game.players.filter(player => player._id === broomballer._id)[0])
            // if the broomballer played any game
            if (gamesPlayed.length > 0) {
                let playerReduced = gamesPlayed.reduce((players, game) => {
                    // variable to access "game info" of each player for each game
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
            } else {
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
        return transformedArrayForCards;
    }
};

export const createChartData = (arrayOfCards) => {
    let labels = []
    let goalsArray = []
    let assistsArray = []
    let gamesPlayedArray = []
    let winPercentArray = []
    let lossPercentArray = []
    let tiePercentArray = []
    let gpgArray = []
    let apgArray = []
    arrayOfCards.forEach(e => {
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
    
    let chartObject = {
        labels: labels,
        // For performance reason, it is better to re-initiate the data than to use the ... operator to merge new with existing
        datasets: [
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
        return chartObject;
    }