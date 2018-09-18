# broomball-react-app
This apps facilitates managing players, games, and stats for the *Summit Broomball* group. 

It is built using React/Redux as the Front End framework, and Express/Node on the Back End. The database is Mongo (through Mongoose).

Refactoring a previous attempt that was using JQuery and MySQL (through Sequelize), this version resolves bottlenecks which arose then by a better state management, and a faster DB solution – the object-oriented javascript used to query Mongo performing better than raw queries passed to MySQL via Sequelize.  

## Table of Contents

- [Players](#Players)
- [Draft](#Draft)
- [Stats](#Stats)
- [Records](#Records)

## Players
This page allows to add Players to the app's database.

Players can be of two types: **Members** and **Ten Buckers**. This reflects how the group is managed: there are 30 players who regularly pay membership fees to be able to play all games, while some players are added on a per game basis, as needed to fill page, for a cost of $10 (hence the "Ten Bucker" name).

>Later on, this page will be modified to implement the `react-redux-form` package which will allow better validation of input. 

## Draft
![](portfolio/autodraft.gif | width="200")
Relative no size
![Alt Text](portfolio/autodraft.gif)
img tag no size
![Autodraft Feature] <img src="portfolio/autodraft.gif" />
img tag size
![Autodraft Feature] <img src="portfolio/autodraft.gif" width="200"/>




## Stats
## Records



