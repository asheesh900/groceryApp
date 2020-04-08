import React, { Component } from 'react'
import {connect} from 'react-redux'
import {checkUser} from '../../Redux/Authorization/Action'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: "",
             password: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = (e) => {
        e.preventDefault()
        const userCredential = {
            email: this.state.email,
            password: this.state.password
        }
        const loginUrl = `http://127.0.0.1:5000/auth/login`
        this.props.checkUser(userCredential, loginUrl)
    }
    
    render() {
        return (
            this.props.isLogin ?
            (
                <Redirect to = "/home" />
            ) : 
            (
                <div>
                    <div className = "container m-auto">
                        <h2>Login</h2>
                        <div className="row">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email</label>
                                    <input value = {this.state.email} name = "email" onChange = {(e) => this.handleChange(e)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Password</label>
                                    <input value = {this.state.password} name = "password" onChange = {(e) => this.handleChange(e)} type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                
                                <button onClick = {this.login} type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>

            )
        )
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.authReducer.isLogin,
    data: state.authReducer.data,
    ifToken: state.authReducer.ifToken,
    state: state
})

const mapDispatchToProps = (dispatch) => ({
    checkUser: (payloadUserCredential, payloadLoginUrl) => 
    dispatch(checkUser(payloadUserCredential, payloadLoginUrl))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

