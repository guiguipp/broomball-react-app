# broomball-react-app
This apps facilitates managing players, games, and stats for the *Summit Broomball* group. 

It is built using React/Redux as the Front End framework, and Express/Node on the Back End. The database is Mongo (through Mongoose).

Refactoring a previous attempt that was using JQuery and MySQL (through Sequelize), this version resolves bottlenecks which arose then by a better state management, and a faster DB solution – the object-oriented javascript used to query Mongo performing better than raw queries passed to MySQL via Sequelize.  

## Table of Contents

- [Players](## Players)
- [Draft](## Draft)
- [Stats](## Stats)
- [Records](## Records)

## Players
This page allows to add Players to the app's database.

Players can be of two types: **Members** and **Ten Buckers**. This reflects how the group is managed: there are 30 players who regularly pay membership fees to be able to play all games, while some players are added on a per game basis, as needed to fill page, for a cost of $10 (hence the "Ten Bucker" name).

>Later on, this page will be modified to implement the `react-redux-form` package which will allow better validation of input. 

## Draft
### Creating a game
The Draft page displays upcoming and past games in separate lists. To create a game, click on a date in the date picker. Alternatively, you can enter a date in the input field (format needs to be: "YYYY-MM-DD").


### Curating the player list
All members are automatically added to the draft by default. Click on the remove `x` icon to mark them a player as unavailable as needed. 
<img src="portfolio/unavailable.gif" width="350"/>
Click on "Show Unavailable" to display the list of all Members marked as unavailable for that game. Should the availability of a player change, click on their name to re-add them to the list of available players.

Ten Buckers can be viewed after clicking on "Show Non-Members". Clicking on their name adds them to the draft. Should their availability change, clicking on the remove `x` icon will reset these settings.

### Asynchronous draft
#### Manual draft
Players can be added to the Dark or White team by clicking on the left and right arrow icons respectively. Once drafted on a team. 

#### Autodraft
<img src="portfolio/autodraft.gif" width="350"/>
Players can be automatically drafted by clicking on **Autodraft**. Players added to the draft are added to either team based on their skill level to create balanced teams.  

#### Machine drafting
<img src="portfolio/setPicks.gif" width="350"/>
Players can be drafted by a designated captain by clicking on the **Set Dark Picks** or the **Set White Picks** respectively. 

Click on the player button to add a player to the list of picks in the order you would want to have them drafted. This order may be reset either by clicking on the `up` or `down` caret on the right of the list, or the `x` remove button that removes the player from the picks altogether.
<img src="portfolio/resetPicks.gif" width="350"/>

Once the two captains have set their order picks, two machine drafting options are available to create teams:
##### Alternate Draft
The `Alternate Draft` mode will draft players to the Dark and White teams alternatively (ABAB). That is, the captain of the Dark team gets their first pick, then the captain of the White team gets their first pick ...provided it has not already been drafted. Otherwise, they get their second pick, etc. Dark and White captains get turns alternatively until all players have been drafted. 

<img src="portfolio/machineDrafting.gif" width="350"/>

##### Serpentine Draft
The `Serpentine Draft` mode aims at counter-balancing the advantage the Dark team gets in the drafting process, by granting the White team (and Dark team subsequently) two turns in a row (ABBA). That is, the captain of the Dark team gets their first pick, then the captain of the White team gets to pick two players next: their "n" and "n+1" pick ("n" being their most highly ranked pick in the list of players undrafted yet). Then the Dark captain gets the next two turns, and so on until all players have been drafted. 

### Lock
Use the `Lock` / `Unlock` buttons to enable/disable making changes to the draft.

## Stats
The **Stats** page displays the list of all past games. They are dispatched by year/month for convenience. Clicking on a game button allows to enter the stats for all players, as set in the Draft page. 

<img src="portfolio/recordScore.gif" width="350"/>

Entering the stats updates the score recorded for the game.

## Records
The **Records** page displays the data recorded on the **Stats** page. 
Use the date picker from the `Select Date` option to narrow a time frame. All relevant games are then available for selection in the `Select Games` section. 

The `Select Players` shows the list of all Members + Ten Buckers having played at least one game in the chosen time span. Players can be individually selected, or by clicking on the **Select All Members** or **Select All Ten Buckers** respectively. 

<img src="portfolio/playerCards.gif" width="350"/>

This displays "Cards" with the recorded stats of players for the game selected.




