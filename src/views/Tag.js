import React from 'react';
import {Link} from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Blog from '../components/Blog';

class Tag extends React.Component {
    _refreshPage = (id) => {
        this.setState({
            pageNumber: id
        })
    }
    _generatePages = () => {
        const links = [];
        for(let i = 1; i <= this.state.pages; i++){
            links.push(
                <Link to={`/${this.state.tag}/get/${i}`} onClick={(e) => this._refreshPage(i)} key={i}>{i}</Link>
            );
        }
        return links;
    }
    constructor(props){
        super(props);
        this.state = {
            pages: 0,
            content: '',
            tag: props.match.params.tagName ? props.match.params.tagName : 'coding',
            pageNumber: props.match.params.page ? props.match.params.page : 1
        }
    }
    componentDidMount(){
        console.log('PAGE NUMBER');
        console.log(this.state.pageNumber);
        fetch(`http://localhost:3030/${this.state.tag}/get/${this.state.pageNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json()
        }).then(obj => {
            this.setState({
                content: obj.content,
                pages: obj.pages
            });
        })
    }
    componentDidUpdate(prevProps, prevState){
        fetch(`http://localhost:3030/${this.state.tag}/get/${this.state.pageNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json()
        }).then(obj => {
            console.log('OBJECT')
            console.log(obj)
            if(prevState.pageNumber !== this.state.pageNumber){
                console.log("OBJ");
                console.log(obj);
                this.setState({
                    content: obj.content,
                    pages: obj.pages
                });
            }else if(prevState.tag !== this.state.tag){
                this.setState({
                    content: obj.content,
                    pages: obj.pages
                });
            }
        })
    }
    render(){
        return(
            <div>
                <Header/>
                {
                    this.state.content === '' ? 'NOTHING' : this.state.content.map(blogTag => {
                        console.log("BLLOG TAG");
                        console.log(blogTag);
                        return <Blog key={blogTag.id} blog={blogTag.Blog}/>
                        // return <span style={{display: 'block', backgroundColor: 'yellow'}}>{blogTag.Blog.id} {blogTag.Tag.id}</span>
                    })
                }
                { this._generatePages() }
                <Footer/>
            </div>
        )
    }
}

export default Tag;