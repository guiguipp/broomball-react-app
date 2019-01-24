import {
  SHOW_GAMES_TO_STATS,
  GET_GAMES_IN_TIMESPAN,
  SET_YEARS_VISIBILITIES,
  ADD_GAME_TO_SELECTED,
  REMOVE_GAME_FROM_SELECTED,
  ADD_PLAYER_TO_SELECTED,
  REMOVE_PLAYER_FROM_SELECTED,
  TOGGLE_RECORDS_VIEWS,
  ADD_PLAYER_RECORDS,
  REMOVE_PLAYER_RECORDS,
  REPLACE_PLAYERS_RECORDS,
  SORT_AZ_ASC,
  SORT_AZ_DESC,
  SORT_GAMES_ASC,
  SORT_GAMES_DESC,
  SORT_WINS_ASC,
  SORT_WINS_DESC,
  SORT_LOSSES_ASC,
  SORT_LOSSES_DESC,
  SORT_TIES_ASC,
  SORT_TIES_DESC,
  SORT_GOALS_ASC,
  SORT_GOALS_DESC,
  SORT_GPG_ASC,
  SORT_GPG_DESC,
  SORT_ASSISTS_ASC,
  SORT_ASSISTS_DESC,
  SORT_APG_ASC,
  SORT_APG_DESC,
  SET_DATE_RANGE,
  // SET_CHART_DATA,
  TOGGLE_SELECT_ALL,
  BATCH_CARD_UPDATE,
  BATCH_CHART_UPDATE,
  BATCH_UNSELECT,
  // TOGGLE_POSITIONS,
  TOGGLE_PLAYER_MODAL,
  BATCH_GAMES,
  UNSELECT_ALL_GAMES,
  FILTER_PLAYER_RECORDS_BY_TYPE,
  FILTER_PLAYER_RECORDS_BY_GAMES
} from "./types";

import API from "../../utils/API";
import { beautifyGames } from "../../components/GameDisplayUtils.js";

const moment = require("moment");
// need a separate function to fetch games within a time span
export const getGamesForRecords = () => dispatch => {
  API.getGames().then(res => {
    if (res.status !== 200) {
      throw new Error(res.statusText);
    } else {
      let arrayOfTenBuckerIDs = [];
      let allTenBuckers = res.data.map(game =>
        game.players.filter(player => player.membershipStatus !== "Member")
      );
      allTenBuckers.forEach(array =>
        array.map(player => arrayOfTenBuckerIDs.push(player._id))
      );
      let pastGames = res.data.filter(
        game => game._id <= moment().format("YYYY-MM-DD")
      );
      let reducedGames = beautifyGames(pastGames);
      // setting the visibility of each year's games. We only want the current year's games to be visible
      // let years = Object.keys(Object.values(reducedGames)).map(year => ([year] = "visible"))
      let years = [];
      for (let i = 0; i < reducedGames.length; i++) {
        if (i == 0) {
          years.push("visible");
        } else {
          years.push("hidden");
        }
      }

      dispatch({
        type: GET_GAMES_IN_TIMESPAN,
        payload: {
          games: res.data,
          reducedGames: reducedGames,
          allTenBuckers: arrayOfTenBuckerIDs,
          visibility: years
        }
      });
    }
  });
};

export const toggleVisibility = currentState => dispatch => {
  if (currentState === "dead") {
    dispatch({
      type: SHOW_GAMES_TO_STATS
    });
  }
};

export const setVisibility = array => dispatch => {
  dispatch({
    type: SET_YEARS_VISIBILITIES,
    payload: array
  });
};

export const selectGame = id => dispatch => {
  dispatch({
    type: ADD_GAME_TO_SELECTED,
    payload: id
  });
};

export const unselectGame = game => dispatch => {
  dispatch({
    type: REMOVE_GAME_FROM_SELECTED,
    payload: game
  });
};

export const selectPlayer = player => dispatch => {
  dispatch({
    type: ADD_PLAYER_TO_SELECTED,
    payload: { selected: player }
  });
};

export const unselectPlayer = player => dispatch => {
  dispatch({
    type: REMOVE_PLAYER_FROM_SELECTED,
    payload: { selected: player }
  });
};
// There has to be a better way to do this (based on the index, maybe?)
export const toggleViews = (currentStatus, element) => dispatch => {
  if (currentStatus === "visible") {
    dispatch({
      type: TOGGLE_RECORDS_VIEWS,
      payload: {
        dates: "dead",
        games: "dead",
        players: "dead",
        sort: "dead",
        chart: "dead"
      }
    });
  } else {
    switch (element) {
      case "dates":
        dispatch({
          type: TOGGLE_RECORDS_VIEWS,
          payload: {
            dates: "visible",
            games: "dead",
            players: "dead",
            sort: "dead",
            chart: "dead"
          }
        });

        break;

      case "games":
        dispatch({
          type: TOGGLE_RECORDS_VIEWS,
          payload: {
            dates: "dead",
            games: "visible",
            players: "dead",
            sort: "dead",
            chart: "dead"
          }
        });
        break;

      case "players":
        dispatch({
          type: TOGGLE_RECORDS_VIEWS,
          payload: {
            dates: "dead",
            games: "dead",
            players: "visible",
            sort: "dead",
            chart: "dead"
          }
        });
        break;

      case "sort":
        dispatch({
          type: TOGGLE_RECORDS_VIEWS,
          payload: {
            dates: "dead",
            games: "dead",
            players: "dead",
            sort: "visible",
            chart: "dead"
          }
        });
        break;

      case "chart":
        dispatch({
          type: TOGGLE_RECORDS_VIEWS,
          payload: {
            dates: "dead",
            games: "dead",
            players: "dead",
            sort: "dead",
            chart: "visible"
          }
        });
        break;

      default:
        return;
    }
  }
};

export const addPlayerStatObject = player => dispatch => {
  dispatch({
    type: ADD_PLAYER_RECORDS,
    payload: player
  });
};

export const removePlayerStatObject = player => dispatch => {
  dispatch({
    type: REMOVE_PLAYER_RECORDS,
    payload: player
  });
};

export const selectDateRange = (start, end) => dispatch => {
  if (start === "Invalid date") {
    start = "2000-01-01";
  }
  if (end === "Invalid date") {
    end = moment().format("YYYY-MM-DD");
  }
  dispatch({
    type: SET_DATE_RANGE,
    payload: {
      from: start,
      to: end
    }
  });
};

export const toggleSortOptions = (tab, currentStatus, ascArrow) => dispatch => {
  switch (tab) {
    case "az":
      if (currentStatus === "unselected_tab") {
        dispatch({
          type: SORT_AZ_DESC,
          payload: {
            alphaDesc: "active",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "selected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      } else if (currentStatus === "selected_tab" && ascArrow === "active") {
        dispatch({
          type: SORT_AZ_DESC,
          payload: {
            alphaDesc: "active",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "selected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      } else {
        dispatch({
          type: SORT_AZ_ASC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "active",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "selected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      }
      break;

    case "games":
      if (currentStatus === "unselected_tab") {
        dispatch({
          type: SORT_GAMES_DESC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "active",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "selected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      } else if (currentStatus === "selected_tab" && ascArrow === "active") {
        dispatch({
          type: SORT_GAMES_DESC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "active",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "selected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      } else {
        dispatch({
          type: SORT_GAMES_ASC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "active",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "selected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      }
      break;

    case "wins":
      if (currentStatus === "unselected_tab") {
        dispatch({
          type: SORT_WINS_DESC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "active",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "selected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      } else if (currentStatus === "selected_tab" && ascArrow === "active") {
        dispatch({
          type: SORT_WINS_DESC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "active",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "selected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      } else {
        dispatch({
          type: SORT_WINS_ASC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "active",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "selected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      }
      break;

    case "losses":
      if (currentStatus === "unselected_tab") {
        dispatch({
          type: SORT_LOSSES_DESC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "active",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "selected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      } else if (currentStatus === "selected_tab" && ascArrow === "active") {
        dispatch({
          type: SORT_LOSSES_DESC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "active",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "selected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      } else {
        dispatch({
          type: SORT_LOSSES_ASC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "active",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "selected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      }
      break;

    case "ties":
      if (currentStatus === "unselected_tab") {
        dispatch({
          type: SORT_TIES_DESC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "active",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "selected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      } else if (currentStatus === "selected_tab" && ascArrow === "active") {
        dispatch({
          type: SORT_TIES_DESC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "active",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "selected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      } else {
        dispatch({
          type: SORT_TIES_ASC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "active",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "selected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      }
      break;

    case "goals":
      if (currentStatus === "unselected_tab") {
        dispatch({
          type: SORT_GOALS_DESC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "active",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "selected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      } else if (currentStatus === "selected_tab" && ascArrow === "active") {
        dispatch({
          type: SORT_GOALS_DESC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "active",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "selected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      } else {
        dispatch({
          type: SORT_GOALS_ASC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "active",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "selected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      }
      break;

    case "gpg":
      if (currentStatus === "unselected_tab") {
        dispatch({
          type: SORT_GPG_DESC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "active",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "selected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      } else if (currentStatus === "selected_tab" && ascArrow === "active") {
        dispatch({
          type: SORT_GPG_DESC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "active",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "selected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      } else {
        dispatch({
          type: SORT_GPG_ASC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "active",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "selected_tab",
            assistsTab: "unselected_tab",
            apgTab: "unselected_tab"
          }
        });
      }
      break;

    case "assists":
      if (currentStatus === "unselected_tab") {
        dispatch({
          type: SORT_ASSISTS_DESC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "active",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "selected_tab",
            apgTab: "unselected_tab"
          }
        });
      } else if (currentStatus === "selected_tab" && ascArrow === "active") {
        dispatch({
          type: SORT_ASSISTS_DESC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "active",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "selected_tab",
            apgTab: "unselected_tab"
          }
        });
      } else {
        dispatch({
          type: SORT_ASSISTS_ASC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "active",
            apgDesc: "inactive",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "selected_tab",
            apgTab: "unselected_tab"
          }
        });
      }
      break;

    case "apg":
      if (currentStatus === "unselected_tab") {
        dispatch({
          type: SORT_APG_DESC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "active",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "selected_tab"
          }
        });
      } else if (currentStatus === "selected_tab" && ascArrow === "active") {
        dispatch({
          type: SORT_APG_DESC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "active",
            apgAsc: "inactive",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "selected_tab"
          }
        });
      } else {
        dispatch({
          type: SORT_APG_ASC,
          payload: {
            alphaDesc: "inactive",
            alphaAsc: "inactive",
            gamesDesc: "inactive",
            gamesAsc: "inactive",
            goalsDesc: "inactive",
            goalsAsc: "inactive",
            gpgDesc: "inactive",
            gpgAsc: "inactive",
            winsDesc: "inactive",
            winsAsc: "inactive",
            lossesDesc: "inactive",
            lossesAsc: "inactive",
            tiesDesc: "inactive",
            tiesAsc: "inactive",
            assistsDesc: "inactive",
            assistsAsc: "inactive",
            apgDesc: "inactive",
            apgAsc: "active",
            azTab: "unselected_tab",
            gamesTab: "unselected_tab",
            winsTab: "unselected_tab",
            lossesTab: "unselected_tab",
            tiesTab: "unselected_tab",
            goalsTab: "unselected_tab",
            gpgTab: "unselected_tab",
            assistsTab: "unselected_tab",
            apgTab: "selected_tab"
          }
        });
      }
      break;

    default:
      return;
  }
};

export const toggleSelectAll = update => dispatch => {
  switch (update) {
    case "unselected_member":
      dispatch({
        type: TOGGLE_SELECT_ALL,
        payload: {
          player: "member",
          memberSelection: "selected_member"
        }
      });
      break;

    case "selected_member":
      dispatch({
        type: TOGGLE_SELECT_ALL,
        payload: {
          player: "member",
          memberSelection: "unselected_member"
        }
      });

      break;

    case "unselected_non_member":
      dispatch({
        type: TOGGLE_SELECT_ALL,
        payload: {
          player: "tenBucker",
          tenBuckerSelection: "selected_non_member"
        }
      });
      break;

    case "selected_non_member":
      dispatch({
        type: TOGGLE_SELECT_ALL,
        payload: {
          player: "tenBucker",
          tenBuckerSelection: "unselected_non_member"
        }
      });
      break;

    default:
      return;
  }
};

export const batchCardUpdate = newData => dispatch => {
  dispatch({
    type: BATCH_CARD_UPDATE,
    payload: newData
  });
};

export const batchChartUpdate = newData => dispatch => {
  dispatch({
    type: BATCH_CHART_UPDATE,
    payload: newData
  });
};

export const batchUnselect = type => dispatch => {
  dispatch({
    type: BATCH_UNSELECT,
    payload: type
  });
};

// this handles when games are removed after the players. In this case, data needs to be re-initiated
// we recreate the array of players
export const updatePlayers = players => dispatch => {
  dispatch({
    type: REPLACE_PLAYERS_RECORDS,
    payload: players
  });
};
// data is sent to the modal in showcase.js
export const togglePlayerModal = (newStatus, data) => dispatch => {
  dispatch({
    type: TOGGLE_PLAYER_MODAL,
    payload: {
      status: newStatus,
      data: data
    }
  });
};

export const selectAllGames = status => dispatch => {
  dispatch({
    type: BATCH_GAMES,
    payload: status
  });
};

export const unselectAllGames = () => dispatch => {
  dispatch({
    type: UNSELECT_ALL_GAMES
  });
};

export const filterPlayerRecordsByType = object => dispatch => {
  let operator;
  let playerType;

  if (object.offense === "unselected") {
    if (object.defense === "unselected") {
      if (object.goalie === "unselected") {
        operator = "null";
        playerType = "null";
      } else {
        operator = "only";
        playerType = "Goalie";
      }
    } else {
      if (object.goalie === "unselected") {
        operator = "only";
        playerType = "Defense";
      } else {
        operator = "but";
        playerType = "Forward";
      }
    }
  } else {
    if (object.defense === "unselected") {
      if (object.goalie === "unselected") {
        operator = "only";
        playerType = "Forward";
      } else {
        operator = "but";
        playerType = "Defense";
      }
    } else {
      if (object.goalie === "unselected") {
        operator = "but";
        playerType = "Goalie";
      } else {
        operator = "null";
        playerType = "null";
      }
    }
  }
  dispatch({
    type: FILTER_PLAYER_RECORDS_BY_TYPE,
    payload: {
      operator: operator,
      playerType: playerType,
      playerFilters: object
    }
  });
};

export const filterPlayerRecordsByGames = object => dispatch => {
  console.log("object received in filterGames statsActions.js: ", object);
  dispatch({
    type: FILTER_PLAYER_RECORDS_BY_GAMES,
    payload: object
  });
};
