import React, { Component } from "react";

import { connect } from 'react-redux';
// import { editGameInfo } from '../../js/actions/gameActions'

import "./GameOptionsBottom.css";

class GameOptionsBottom extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className="row">
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
    gameDate: state.games.gameDate
})

export default connect(mapStateToProps/*, { editGameInfo }*/) (GameOptionsBottom)
