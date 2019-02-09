import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {authUser} from './../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Login extends React.Component {
    componentDidMount(){
        if(localStorage.getItem('data')){
            this.props.history.push('/blog');
        }
    }
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        }
    }
    _handleSubmit = (event) => {
        console.log('aye aye captain');
        console.log(this.state.email + " " + this.state.password)
        event.preventDefault();
        fetch('http://localhost:3030/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email, 
                password: this.state.password
            })
        }).then(response => {
            return response.json();
        }).then(obj => {
            console.log(obj.status);
            if(obj.status === 302) {
                localStorage.setItem('data', obj.token);
                console.log("You are signed in");
                this.props.history.push('/blog');
            }
        });
    }
    _handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    _handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    render(){
        return(
            <div className="background">
                <div className="login-header">
                    <img src={"../../img/logo.jpg"}></img>
                    <h1>Sign in to dcavell</h1>
                </div>
                <div className="login-form">
                    <form onSubmit={this._handleSubmit}>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="text" className="form-control" onChange={this._handleEmailChange}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control"  onChange={this._handlePasswordChange}/>
                        </div>
                        <input type="submit" className="form-control btn-primary" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(Login);