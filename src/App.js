import React from 'react';
<<<<<<< HEAD
=======
import logo from './logo.svg';
import { LoginPage } from "./pages"
>>>>>>> 6e814a79d0e10af81c4a63ac6a16fcd0981c2e21
import './App.css';
import './firebase/config';
import './pages/Signup';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Signup from './pages/Signup';


function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <header></header>
      <div className="app">
        <Switch>
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
=======
    <div className="App">
      <LoginPage />
    </div>
>>>>>>> 6e814a79d0e10af81c4a63ac6a16fcd0981c2e21
  );
}

export default App;
