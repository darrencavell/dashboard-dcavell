import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';

import HomeTag from './views/HomeTag';
import HomeBlog from './views/HomeBlog';
import Login from './views/Login';
import Counter from './views/Counter';
import CreateBlog from './views/CreateBlog';
import Logout from './views/Logout';
import './App.css';
import UpdateBlog from './views/UpdateBlog';
import DeleteBlog from './views/DeleteBlog';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/:tagName/get/:page' component={HomeTag}/>
            <Route exact path='/blog' component={HomeBlog}/>
            <Route exact path='/blog/create' component={CreateBlog}/>
            <Route exact path='/blog/update/:id' component={UpdateBlog}/>
            <Route exact path='/blog/delete/:id' component={DeleteBlog}/>
            <Route exact path='/blog/:page' component={HomeBlog}/>
            <Route exact path='/counter' component={Counter}/>
            <Route exact path='/logout' component={Logout}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
