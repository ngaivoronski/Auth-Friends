import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Friends from "./components/Friends";

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
          <PrivateRoute path="/friends">
            <Route exact path="/friends" component={Friends} />
          </PrivateRoute>
          <Route path="/login" component={Login} />
          <Route component={Login} />
      </Switch>
      
      </div>
    </Router>
  );
}

export default App;
