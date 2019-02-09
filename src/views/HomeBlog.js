import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

import Header from '../components/Header';
import Footer from '../components/Footer';
import Blog from '../components/Blog';

class HomeBlog extends Component {
  constructor(props){
    super(props);
    this.state = {
      pages: 0,
      content: '',
      pageNumber: props.match.params.page ? props.match.params.page : 1
    }
  }
  _refreshPage = (id) => {
    console.log(id);
    this.setState({
      pageNumber: id,
      user: 0
    })
  }
  _generatePages = () => {
    const links = [];
    for (let i = 1; i <= this.state.pages; i++) {
      links.push(
        <Link to={`/blog/${i}`} className="pagination" onClick={(e) => this._refreshPage(i)} key={i}>{i}</Link>
      )
    }
    return links;
  }
  componentDidMount(){
    fetch(`http://localhost:3030/blog/get/${this.state.pageNumber}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      return response.json()
    }).then(obj => {
      console.log(obj);
      this.setState({
        content: obj.content,
        pages: obj.pages
      });
    })
    console.log(this.state.content);
  }
  componentDidUpdate(prevProps, prevState){
    if (prevState.pageNumber !== this.state.pageNumber) {
      fetch(`http://localhost:3030/blog/get/${this.state.pageNumber}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
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
  }
  render() {
    return (
      <div>
        <Header/>
        <div className="container">
          <div className="horizontal-center">
            <div className="blog-list">
            { 
              this.state.content === '' ? 'NOTHING' : this.state.content.map(blog => {
                return <Blog key={blog.id} blog={blog}/>
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
    );
  }
}

export default withRouter(HomeBlog);
