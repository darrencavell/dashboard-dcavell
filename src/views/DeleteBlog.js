import React from 'react';
import {withRouter} from 'react-router-dom';

class DeleteBlog extends React.Component {
    componentDidMount(){
        fetch('http://localhost:3030/blog/delete', {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('data') 
            }),
            body: JSON.stringify({
                id: this.props.match.params.id,
            })
        }).then(response => {
            console.log(response);
            return response.json()
        }).then(obj => {
            console.log(obj);
            if(obj.deleted === true)
                this.props.history.push('/blog');
            else if(obj.deleted === false)
                this.props.history.push('/blog');
            else if(obj.isAuthenticated === false)
                this.props.history.push('/login');
        })
    }
    render(){
        return(
            <div>
                DELETE BLOG
            </div>
        )
    }
}

export default withRouter(DeleteBlog);