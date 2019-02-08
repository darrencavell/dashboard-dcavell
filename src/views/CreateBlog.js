import React from 'react';
import {withRouter} from 'react-router-dom';

class CreateBlog extends React.Component {
    componentWillMount(){
        fetch('http://localhost:3030/checkauth', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            return response.json()
        }).then(obj => {
            console.log(obj);
            if(obj.status == 404)
                this.props.history.push('/home');
            
        })
    }
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                CREATE
            </div>
        )
    }
}

export default withRouter(CreateBlog);