import React from 'react';
import {withRouter} from 'react-router-dom';

class Logout extends React.Component {
    componentDidMount(){
        localStorage.removeItem('data');
        this.props.history.push('/blog');
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