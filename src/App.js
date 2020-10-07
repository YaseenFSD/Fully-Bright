import React from 'react';
import { NavBar, Navigation } from "./components"
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import './firebase/config'
import { ReactQueryDevtools } from "react-query-devtools"
import { UserProvider } from './firebase/UserProvider'
import { Route } from "react-router-dom"
import {LoginPage} from './pages/login-page'


function App() {
  return (<>
    <div className="App">
      
      <Navigation />
      <NavBar />
    </div>
    <ReactQueryDevtools />
  </>

  );
}

export default App;
