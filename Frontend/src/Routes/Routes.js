import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link, Switch, Route, Redirect, } from 'react-router-dom'
import Signup from '../Components/Auth/Signup'
import Login from '../Components/Auth/Login'
import Home from '../Components/Common/Home'
import Dashboard from '../Components/Common/Dashboard'
import ErrorPage from '../Components/Common/ErrorPage'
import {logout} from '../Redux/Authorization/Action'

class Routes extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    signOut = (e) => {
        e.preventDefault()
        localStorage.clear()
        this.props.logout()
        return (
            <Redirect to = "/auth/login" />
        )
    }

    render() {
        console.log(this.props)
        return (
            <>
            {
            this.props.isLogin ?
            (
                <div className = "container-fluid bg-dark p-3">
                    <Link to = "/home" className = "ml-4 text-white">Home</Link>
                    <button className = "float-right" onClick = {this.signOut}>Sign Out</button>
                </div>
                
                
            ) :
            (
                <div className = "container-fluid bg-dark p-3">
                    <Link to = "/" className = "ml-4 text-white">Dashboard</Link>
                    <Link to = "/auth/login" className = "ml-4 text-white">Login</Link>
                    <Link to = "/auth/signup" className = "ml-4 text-white">Signup</Link>
                </div>
            )
            }

                <Switch>
                    <Route exact path = "/" component = {Dashboard} />
                    <Route path = "/home" component = {Home} />
                    <Route path = "/auth/login" component = {Login} />
                    <Route path = "/auth/signup" component = {Signup} />
                    <Route component = {ErrorPage} />
                </Switch>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.authReducer.isLogin,
    state: state
})

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
})

export default connect (mapStateToProps, mapDispatchToProps) (Routes)

