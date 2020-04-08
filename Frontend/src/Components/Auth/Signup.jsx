import React, { Component } from 'react'
import { connect } from 'react-redux'
import {registerUser} from '../../Redux/Authorization/Action'

class Signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: "",
            email: "",
            password: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    signup = (e) => {
        e.preventDefault()
        const userInfo = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        const url = "http://127.0.0.1:5000/auth/signup"
        this.props.registerUser(userInfo, url)
    }

    back = () => {
        this.props.history.push("/auth/login")
    }
    
    render() {
        // console.log(this.props)
        return (
            <div>
                <div className = "container m-auto">
                    <h2>Signup</h2>
                    <div className="row">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input name = "name" onChange = {(e) => this.handleChange(e)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input name = "email" onChange = {(e) => this.handleChange(e)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Password</label>
                                <input name = "password" onChange = {(e) => this.handleChange(e)} type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            
                            <button onClick = {this.signup} type="submit" className="btn btn-primary">Signup</button>
                            <button onClick = {this.back} type="submit" className="btn btn-primary ml-2">Go To Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) => ({
    registerUser: (payloadUserInfo, payloadUrl) => 
    dispatch(registerUser(payloadUserInfo, payloadUrl))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
