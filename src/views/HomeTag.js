import React from 'react';
import {Link} from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Blog from '../components/Blog';

class HomeTag extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pages: 0,
            content: '',
            tag: props.match.params.tagName ? props.match.params.tagName : '',
            pageNumber: props.match.params.page ? props.match.params.page : 1
        }
    }
    _refreshTag = (tagName) => {
        this.setState({
            tag: tagName,
            pageNumber: 1
        })
    }
    _refreshPage = (id) => {
        this.setState({
            pageNumber: id
        })
    }
    _generatePages = () => {
        const links = [];
        for(let i = 1; i <= this.state.pages; i++){
            links.push(
                <Link to={`/${this.state.tag}/get/${i}`} className="pagination" onClick={(e) => this._refreshPage(i)} key={i}>{i}</Link>
            );
        }
        return links;
    }
    componentDidMount(){
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
        console.log('lewatl');
        console.log('PAGE NUMBER');
        console.log(this.state.pageNumber);
        console.log('TAG')
        console.log(this.state.tag)
        if(prevState.tag !== this.state.tag || prevState.pageNumber !== this.state.pageNumber){
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
                this.setState({
                    content: obj.content,
                    pages: obj.pages
                });
            })
        }
    }
    render(){
        return(
            <div>
                <Header/>
                <div className="container">
                    <div className="horizontal-center">
                        <div className="blog-list">
                        {
                            this.state.content === '' ? 'NOTHING' : this.state.content.map(blogTag => {
                                console.log("BLLOG TAG");
                                console.log(blogTag);
                                return <Blog key={blogTag.id} blog={blogTag.Blog} triggerTagUpdate={(tagName) => this._refreshTag(tagName)}/>
                                // return <span style={{display: 'block', backgroundColor: 'yellow'}}>{blogTag.Blog.id} {blogTag.Tag.id}</span>
                            })
                        }
                        </div>

                        <div className="page-list">
                        {
                            this.state.pages === '' ? 'NOTHING 2' :  <div>{this._generatePages()}</div>
                        }
                        </div> 
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default HomeTag;