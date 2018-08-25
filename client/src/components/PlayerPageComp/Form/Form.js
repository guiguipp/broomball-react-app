import React, { Component } from "react";

import { connect } from 'react-redux';
import { addPlayer } from '../../../js/actions/playerActions'
import { editPlayer } from '../../../js/actions/playerActions'
import { resetTabs } from '../../../js/actions/playerActions'
import { updateField } from '../../../js/actions/playerActions'

import "./Form.css";

class Form extends Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleCancel(event) {
        event.preventDefault()
        this.props.resetTabs()
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let editedPlayer = {...this.props.player, [name]: value}
        this.props.updateField(editedPlayer)
        }

    handleSubmit(event) {
        event.preventDefault();
        
        let newPlayer = {
            name: this.props.player.name,
            fullName: this.props.player.fullName,
            playerLevel: this.props.player.playerLevel,
            preferredPosition: this.props.player.preferredPosition,
            membershipStatus: this.props.player.membershipStatus,
            email: this.props.player.email
            }
        
        if (this.props.formMode === "Add") {
            this.props.addPlayer(newPlayer)
            }
        else {
            let id = this.props.player._id
            this.props.editPlayer(id, newPlayer)
        }

        // go back to tab#1
        this.props.resetTabs()
        }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.handleSubmit}>
                        <div className="field">
                            <label>Name: </label>
                            <input 
                                type="text" 
                                name="name"
                                value= {this.props.player.name}
                                onChange={(event) => this.handleChange(event)}
                                />
                        </div>
                        
                        <div className="field">
                            <label>Full Name: </label>
                            <input 
                                type="text" 
                                name="fullName"
                                value= {this.props.player.fullName}
                                onChange={(event) => this.handleChange(event)}
                                />
                        </div>

                        <div className="field">
                            <label>Preferred Position: </label>
                            <select name="preferredPosition" onChange={(event) => this.handleChange(event)} value={this.props.player.preferredPosition}>
                                <option defaultValue="Forward">Forward</option>
                                <option value="Defense">Defense</option>
                                <option value="Goalie">Goalie</option>
                            </select>
                        </div>

                        <div className="field">
                            <label>Membership Status:</label>
                            <select name="membershipStatus" onChange={(event) => this.handleChange(event)} value= {this.props.player.membershipStatus}>
                                <option defaultValue="Member">Member</option>
                                <option value="Ten Bucker">Ten Bucker</option>
                            </select>
                        </div>

                        <div className="field"> 
                            <label>Level: </label>
                            <select name="playerLevel" onChange={(event) => this.handleChange(event)} value= {this.props.player.playerLevel}>
                                <option defaultValue="A+">A+</option>
                                <option value="A">A</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B">B</option>
                                <option value="B-">B-</option>
                                <option value="C+">C+</option>
                                <option value="C">C</option>
                                <option value="C-">C-</option>
                                <option value="D+">D+</option>
                                <option value="D">D</option>
                                <option value="D-">D-</option>
                                <option value="Goalie">Goalie</option>
                            </select>
                        </div>

                        <div className="field">
                            <label>Email: </label>
                            <input 
                                type="text" 
                                name="email"
                                value= {this.props.player.email}
                                onChange={(event) => this.handleChange(event)}
                                />
                        </div>
                        
                        <button type="submit" value="Submit"> Submit </button>
                        <button type="cancel" value="Cancel" onClick={(event) => this.handleCancel(event)} > Cancel </button>
                    </form>
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
    tab1: state.players.tab1,
    tab2: state.players.tab2,
    panel1: state.players.panel1,
    panel2: state.players.panel2,
    player: state.players.player,
    formMode: state.players.formMode
})

export default connect(mapStateToProps, { addPlayer, editPlayer, resetTabs, updateField }) (Form)

// do it without needing to reset... can it work?
// reset player when submitted
// HAVE TO GET RID OF THE TWO "PLAYER" OBJECTS FROM TWO DIFFERENT REDUCERS...
// Make the list pretty
