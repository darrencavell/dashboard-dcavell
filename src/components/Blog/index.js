import React from "react";
import {Link} from "react-router-dom";

class Blog extends React.Component {
    _generateTags = () => {
        return this.props.blog.BlogTags.map(tag => {
            return <Link key={tag.id} to={`/tag/${tag.Tag.name.toLowerCase()}`}>{tag.Tag.name}</Link>
        });
        
    }
    render(){
        console.log('BLOG')
        console.log(this.props.blog)
        return(
            <article style={{backgroundColor: 'green'}}>
                <h2>Title: {this.props.blog.name}</h2>
                <p>Content: {this.props.blog.content}</p>
                <span>{ this._generateTags() }</span>
            </article>
        )
    }
}

export default Blog;