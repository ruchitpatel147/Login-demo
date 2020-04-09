import React from 'react';
import './App.css';
import Navigation from './components/Navigation'
import Auth from './components/Auth'
import Home from './components/Home'
import About from './components/About'
import List from './components/List'
import Logout from './components/Logout'
import Protected from './components/Protected'
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={Auth}/>
            <Route path="/login" exact component={Auth}/>
            <Route path="/home">
              <Protected cmp = {Home}/>
            </Route>
            <Route path="/about">
              <Protected cmp = {About}/>
            </Route>
            <Route path="/list">
              <Protected cmp = {List}/>
            </Route>
            <Route path="/logout">
              <Protected cmp = {Logout}/>
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
