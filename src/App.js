import React from 'react';
import logo from './logo.svg';
import { LoginPage } from "./pages"
import { NavBar } from "./components"
import './App.css';
import './firebase/config'
import 


function App() {
  return (
    <div className="App">
      <LoginPage />
      <NavBar />
    </div>

  );
}

export default App;
