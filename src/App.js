import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';

import Tag from './views/Tag';
import Home from './views/Home';
import Login from './views/Login';
import Counter from './views/Counter';
import CreateBlog from './views/CreateBlog';
import Logout from './views/Logout';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/:tagName/get/:page' component={Tag}/>
            <Route exact path='/home/:page' component={Home}/>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/counter' component={Counter}/>
            <Route exact path='/blog/create' component={CreateBlog}/>
            <Route exact path='/logout' component={Logout}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
