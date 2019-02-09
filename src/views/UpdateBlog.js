import React from 'react';
import {withRouter} from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

class UpdatedBlog extends React.Component {
    constructor(){
        super();
        this.state = {
            name: '',
            content: '',
        }
    }
    _handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.name);
        console.log(JSON.stringify({
            name: this.state.name,
            content: this.state.content
        }));
        fetch('http://localhost:3030/blog/update', {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('data') 
            }),
            body: JSON.stringify({
                id: this.props.match.params.id,
                name: this.state.name,
                content: this.state.content
            })
        }).then(response => {
            console.log(response);
            return response.json()
        }).then(obj => {
            console.log(obj);
            if(obj.updated === true)
                this.props.history.push('/blog');
            else if(obj.updated === false)
                this.props.history.push('/blog/update');
            else if(obj.isAuthenticated === false)
                this.props.history.push('/login');
        })
    }
    _addTag = (event) => {
        console.log(event);
        if(this.state.tags.indexOf(event.target.value) == -1){
            this.setState({
                tags: this.state.tags.concat(event.target.value)
            })
        }
    }
    _removeTag = (tagId) => {
        console.log('tags')
        console.log(this.state.tags)
        console.log('tagId');
        console.log(tagId);
        const indexSearched = this.state.tags.indexOf(tagId);
        if(indexSearched !== -1){
            console.log('indexSearched');
            console.log(indexSearched);
            const arr = this.state.tags;
            arr.splice(indexSearched, 1);
            this.setState({
                tags: arr
            })
        }
    }
    _generateTags = (event) => {
        return <span>
            {
                this.state.tags.map(tagSelected => {
                    console.log(tagSelected);
                    const arr = this.state.listTags;
                    return <a href="" style={{cursor: 'pointer'}} onClick={(e) => {
                        e.preventDefault();
                        console.log(tagSelected);
                        this._removeTag(tagSelected)}
                    }>{arr[tagSelected-1].name}</a>
                })
            }
            </span>
    }
    _handleNameChanged = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    _handleContentChanged = (event) => {
        console.log(event);
        this.setState({
            content: event.target.value
        })
    }
    componentWillMount(){
        if(localStorage.getItem('data') === null){
            this.props.history.push('/blog');
        }
    }
    render(){
        console.log('RENDER LSIT TAGS')
        console.log(this.state.listTags);
        return(
            <div>
                <Header/>
                <div className="container">
                    <div className="title-section">
                        <h1 className="">Update Blog</h1>
                        <p>Feel free to do changes to you blog!</p>
                    </div>
                    <div className="gap-section"></div>
                    <form onSubmit={this._handleSubmit}>
                        <div className="form-group">
                            <label>Blog Name</label>
                            <input type="text" className="form-control" onChange={this._handleNameChanged} placeholder="Name"/>
                        </div>
                        <div className="form-group">
                            <label>Blog Content</label>
                            <textarea rows="4" className="form-control" onChange={this._handleContentChanged} placeholder="Content"/>
                        </div>
                        <input type="submit" value="Create"/>
                    </form>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default withRouter(UpdatedBlog);