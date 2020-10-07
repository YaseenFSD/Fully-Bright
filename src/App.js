import React from 'react';
import logo from './logo.svg';
import { LoginPage } from "./pages"
import { NavBar } from "./components"
import { Navigation } from "./navigation"
import './App.css';
import './firebase/config'
import { ReactQueryDevtools } from "react-query-devtools"
import { UserProvider } from './firebase/UserProvider'

function App() {
  return (<>
    <div className="App">
      <Navigation />
    </div>
    <ReactQueryDevtools />
  </>

  );
}

export default App;
