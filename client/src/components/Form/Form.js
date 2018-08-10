import React, { Component } from "react";

// import API from "../../utils/API"
import { connect } from 'react-redux';

import { addPlayer } from '../../js/actions/playerActions'
// import { formUpdate } from '../../js/actions/playerActions'
// import { update } from '../../js/actions/playerActions'
// import { editPlayer } from '../../js/actions/playerActions'



import "./Form.css";

class Form extends Component {
    
    constructor(props) {
        super(props);
        this.state= {
                    name: "",
                    fullName: "",
                    preferredPosition: "Forward",
                    membershipStatus: "Member",
                    email: "",
                    playerLevel: "A+"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
/*
    handleChange(name, value) { 
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log("Name: ", name, "\nValue: ", value)
        this.setState(
            {...this.state, [name]: value})
        this.props.handleFormChange(name, value)
}*/
    handleUpdate(value) {
        
    }
    
    handleChange(event) {
        // console.log("Event: ", event)
        // this.handleFormChange()
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log("Name: ", name, "\nValue: ", value)
        this.setState({
                ...this.state,
                [name]: value
                })
            }

    handleSubmit(event) {
        event.preventDefault();
        console.log("State: ", this.state)
        
        let newPlayer = {
            name: this.state.name,
            fullName: this.state.fullName,
            playerLevel: this.state.playerLevel,
            preferredPosition: this.state.name,
            membershipStatus: this.state.membershipStatus,
            email: this.state.email
            }
        
        this.props.addPlayer(newPlayer)        
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
                                value= {this.state.name}
                                onChange={(event) => this.handleChange(event)}
                                />
                        </div>
                        
                        <div className="field">
                            <label>Full Name: </label>
                            <input 
                                type="text" 
                                name="fullName"
                                value= {this.state.fullName}
                                onChange={(event) => this.handleChange(event)}
                                />
                        </div>

                        <div className="field">
                            <label>Preferred Position: </label>
                            <select name="preferredPosition" onChange={(event) => this.handleChange(event)} value={this.state.preferredPosition}>
                                <option defaultValue="Forward">Forward</option>
                                <option value="Defense">Defense</option>
                                <option value="Goalie">Goalie</option>
                            </select>
                        </div>

                        <div className="field">
                            <label>Membership Status:</label>
                            <select name="membershipStatus" onChange={(event) => this.handleChange(event)} value= {this.state.membershipStatus}>
                                <option defaultValue="Member">Member</option>
                                <option value="Ten Bucker">Ten Bucker</option>
                            </select>
                        </div>

                        <div className="field"> 
                            <label>Level: </label>
                            <select name="playerLevel" onChange={(event) => this.handleChange(event)} value= {this.state.level}>
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
                            </select>
                        </div>

                        <div className="field">
                            <label>Email: </label>
                            <input 
                                type="text" 
                                name="email"
                                value= {this.state.email}
                                onChange={(event) => this.handleChange(event)}
                                />
                        </div>
                        
                        
                        <button type="submit" value="Submit"> Submit </button>
                        <button type="cancel" value="Cancel"> Cancel </button>
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
/*
const mapStateToProps = state => ({
    players: state.players.players,
    player: state.players.player,
    
})
*/


// export default Form;
export default connect(null, { addPlayer }) (Form)
