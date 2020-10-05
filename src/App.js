import React from 'react';
import './App.css';
import './firebase/config';
import './pages/Signup';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <header></header>
      <div className="app">
        <Switch>
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
