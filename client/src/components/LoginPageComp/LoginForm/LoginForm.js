import React, { Component } from "react";

import { connect } from 'react-redux';

import { updateUserForm } from '../../../js/actions/authenticateActions';
import { createNewUser } from '../../../js/actions/authenticateActions';
import { authenticateUser } from '../../../js/actions/authenticateActions';

import "./LoginForm.css";


class LoginForm extends Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleCancel(event) {
        event.preventDefault()
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let editedUser = {...this.props.user, [name]: value}
        this.props.updateUserForm(editedUser)
        // this.setState({...this.state, [name]: value})
        
        }

    handleSubmit(event) {
        event.preventDefault();
        /* If a player is a goalie, their level needs to be set as "Goalie" */
        
        
        if (this.props.in === "show") {
            console.log("Sign-in mode activated")
            let user = {
                username: this.props.user.username,
                password: this.props.user.password,
                }
            this.props.authenticateUser("local", user)
            }
        else {
            let newUser = {
                username: this.props.user.username,
                password: this.props.user.password,
                email: this.props.user.email,
                privilege: "user"
                }
            // let id = this.props.player._id
            this.props.createNewUser(newUser)
        }

        // go back to tab#1
        // this.props.resetTabs()
        }

    render() {
        return (
            <div className="form_container container">
                <div className="row">
                    <form onSubmit={this.handleSubmit}>
                        <div className="field">
                            <label>Username: </label>
                            <input 
                                type="text" 
                                name="username"
                                value= {this.props.user.username}
                                onChange={(event) => this.handleChange(event)}
                                />
                        </div>
                        
                        <div className="field">
                            <label>Password: </label>
                            <input 
                                type="text" 
                                name="password"
                                value= {this.props.user.password}
                                onChange={(event) => this.handleChange(event)}
                                />
                        </div>

                        {this.props.up === "show" ? (
                            <div className="field">
                                <label>Email: </label>
                                <input 
                                    type="text" 
                                    name="email"
                                    value= {this.props.user.email}
                                    onChange={(event) => this.handleChange(event)}
                                    />
                            </div>
                        ) : null}
                        
                        {this.props.in === "show" ? 
                            <button type="submit" value="Log In" className="contrast_color"> Sign in </button> 
                            :
                            <button type="submit" value="submit" className="contrast_color"> Sign up </button>
                        } 
                        <button type="cancel" value="Cancel" className="contrast_color" onClick={(event) => this.handleCancel(event)} > Cancel </button>
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
    user: state.authenticate.user,
    in: state.authenticate.tabs[0],
    up: state.authenticate.tabs[1]
})

export default connect(mapStateToProps, { updateUserForm, createNewUser, authenticateUser }) (LoginForm)