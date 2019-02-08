import React from 'react';

import Blog from './../components/Blog';

class Tag extends React.Component {
    _generatePages = () => {
        
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
            if(prevState.pageNumber !== this.state.pageNumber){
                console.log("OBJ");
                console.log(obj);
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
                {
                    this.state.content === '' ? 'NOTHING' : this.state.content.map(blogTag => {
                        console.log("BLLOG TAG");
                        console.log(blogTag);
                        return <Blog key={blogTag.id} blog={blogTag.Blog}/>
                        // return <span style={{display: 'block', backgroundColor: 'yellow'}}>{blogTag.Blog.id} {blogTag.Tag.id}</span>
                    })
                }
            </div>
        )
    }
}

export default Tag;