import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Header from './../components/Header';
import Footer from './../components/Footer';
import Blog from './../components/Blog';

class Home extends Component {
  _refreshPage = (id) => {
    console.log(id);
    this.setState({
      pageNumber: id
    })
  }
  _generatePages = () => {
    const links = [];
    for (let i = 1; i <= this.state.pages; i++) {
      links.push(
        <Link to={`/home/${i}`} onClick={(e) => this._refreshPage(i)} key={i}>{i}</Link>
      )
    }
    return links;
  }
  constructor(props){
    super(props);
    this.state = {
      pages: 0,
      content: '',
      pageNumber: props.match.params.page ? props.match.params.page : 1
    }
  }
  componentDidMount(){
    console.log(this.state.content);
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
  }
  componentDidUpdate(prevProps, prevState){
      fetch(`http://localhost:3030/blog/get/${this.state.pageNumber}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      }).then(response => {
        return response.json()
      }).then(obj => {
        if (prevState.pageNumber !== this.state.pageNumber) {
          this.setState({
            content: obj.content,
            pages: obj.pages
          });
        }
      })
  }
  render() {
    return (
      <div className="App">
        <Header/>
        { 
          this.state.content === '' ? 'NOTHING' : this.state.content.map(blog => {
            return <Blog key={blog.id} blog={blog}/>
          })
        }
        {
          this.state.pages === '' ? 'NOTHING 2' :  <span>{this._generatePages()}</span>
        }
        <Footer/>
      </div>
    );
  }
}

export default Home;
