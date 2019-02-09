import React from "react";
import {Link} from "react-router-dom";

import './styles.css';

class Blog extends React.Component {
    _generateTags = () => {
        return this.props.blog.BlogTags.map(tag => {
            return <Link to={`/${tag.Tag.name.toLowerCase()}/get/1`} className="tag-style" onClick={() => this.props.triggerTagUpdate(tag.Tag.name.toLowerCase())}>{tag.Tag.name}</Link>
        });
    }
    render(){
        return(
            <article className="blog-post">
                <div className="user-profile">
                    <div className="image-section">
                        <img src={'./../../../img/person.png'}></img>
                    </div>
                </div>
                <div className="user-content">
                    <div className="description-section">
                        <div className="user-detail">
                            <h2>{this.props.blog.User.name}</h2>
                            <h5>{this.props.blog.User.email}</h5>
                            <p>Last Update: {this.props.blog.updatedAt}</p>
                        </div>
                            {
                                this.props.owner !== undefined && this.props.owner === this.props.blog.userId ? (
                                    <div className="user-configure">
                                        <Link to={`/blog/update/${this.props.blog.id}`} className="update-style">Update</Link>
                                        <Link to={`/blog/delete/${this.props.blog.id}`} className="delete-style">Delete</Link>
                                    </div>
                                ) : ''
                            }
                    </div>
                    <div className="content-section">
                        <div className="title">
                            <h2>{this.props.blog.name}</h2>
                        </div>
                        <p>{this.props.blog.content}</p>
                    </div>
                </div>
                <span>{ this._generateTags() }</span>
            </article>
        )
    }
}

export default Blog;