import React from 'react';
import logo from './logo.svg';
import { LoginPage } from "./pages"
import './App.css';
import './firebase/config'

function App() {
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
