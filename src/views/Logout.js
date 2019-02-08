import React from 'react';
import {withRouter} from 'react-router-dom';

class Logout extends React.Component {
    componentDidMount(){
        fetch('http://localhost:3030/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json()
        }).then(obj => {
            console.log(obj);
            this.props.history.push('/home');
        })
    }
    render(){
        return(
            <div>
                LOGOUT
            </div>
        )
    }
}

export default withRouter(Logout);