import React from 'react';
import logo from './logo.svg';
import { LoginPage } from "./pages"
import './App.css';
import './firebase/config';
import './pages/Signup';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Signup from './pages/Signup';


function App() {
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
