import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../Redux/Reducers/UserReducer'
import axios from 'axios';
import './Register.css';

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            errorMessage: ''
        }
    }

    registerUser = () => {
        const { firstName, lastName, email, username, password } = this.state
        const userInfo = { firstName, lastName, email, username, password }
        axios.post('/api/register', userInfo).then(response => {
            this.props.setUser(response.data)
            this.props.history.push('/dashboard')
        }).catch(err => {
            console.log(err.response.data.message)
            this.setState({
                errorMessage: err.response.data.message
            })
        })
    }

    showPassword = () => {
        let passwordInput = document.getElementsByClassName('input-Password')
        passwordInput[0].type === 'password' ? passwordInput[0].type = 'text' : passwordInput[0].type = 'password'
        passwordInput[1].type === 'password' ? passwordInput[1].type = 'text' : passwordInput[1].type = 'password'
    }

    errorCheck = () => {
        if(this.state.errorMessage){
            return (
                <span className='error-span'>{this.state.errorMessage}</span>
            )
        }
    }

    passwordCheck = () => {
        if(this.state.password){
            if(this.state.password === this.state.confirmPassword) {
                return (
                    <Link 
                    className="btn btn-primary mr-3 button-container"
                    onClick={e => {
                        this.registerUser()
                    }}>Submit</Link>
                )
            } else {
                return (
                    <Link 
                    disabled
                    to='/dashboard' 
                    className="btn btn-primary mr-3 button-container disabled"
                    onClick={e => {
                        this.registerUser()
                    }}>Submit</Link>
                )
            }
        } else {
            return (
                <Link 
                disabled
                to='/dashboard' 
                className="btn btn-primary mr-3 button-container disabled"
                onClick={e => {
                    this.registerUser()
                }}>Submit</Link>
            )
        }
    }

    render(){
        return(
            <div className='container register-container border border-secondary rounded-sm shadow p-4'>
                {this.errorCheck()}
                <form>
                    <div className='row'>
                        <div className='col'>
                            <label htmlFor="firstNameInput">First Name</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='First name' 
                                id='firstNameInput'
                                onChange={e => {
                                    this.setState({
                                        firstName: e.target.value
                                    })
                                }} />
                        </div>
                        <div className='col'>
                            <label htmlFor="lastNameInput">Last Name</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Last name' 
                                id='lastNameInput'
                                onChange={e => {
                                    this.setState({
                                        lastName: e.target.value
                                    })
                                }} />
                        </div>
                    </div>
                    <div className='form-group email-input'>
                        <label htmlFor="emailInput">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="emailInput" 
                            placeholder="Email Address"
                            onChange={e => {
                                this.setState({
                                    email: e.target.value
                                })
                            }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputUsername">Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputUsername" 
                            placeholder="Enter Username"
                            onChange={e => {
                                this.setState({
                                    username: e.target.value
                                })
                            }} />
                    </div>
                    <div className="form-group row">
                        <div className='col'>
                            <label htmlFor="inputPassword">Password</label>                            <input 
                                type="password" 
                                className="form-control input-Password" 
                                id="inputPassword" 
                                placeholder="Password" 
                                onChange={e => {
                                    this.setState({
                                        password: e.target.value
                                    })
                                }}/>
                        </div>
                        <div className='col'>
                            <label htmlFor="inputPassword">Confirm Password</label>
                            <input 
                                type="password" 
                                className="form-control input-Password" 
                                id="inputPassword" 
                                placeholder="Password"
                                onChange={e => {
                                    this.setState({
                                        confirmPassword: e.target.value
                                    })
                                }} />
                        </div> 
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="showPasswordCheck" onClick={this.showPassword} />
                        <label className="form-check-label" htmlFor="showPasswordCheck">Show Password</label>
                    </div>
                    {this.passwordCheck()}
                    <Link to='/dashboard' className="btn btn-danger button-container">Cancel</Link>
                </form>
                <div className='register-account-container'>
                    <span className='span-register'>Already have an account?</span>
                    <Link to='/login'>Click Here</Link>
                </div>
            </div>
        )
    }
}

export default connect(null, {setUser})(Register)