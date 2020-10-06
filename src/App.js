import React from 'react';
import logo from './logo.svg';
import { LoginPage } from "./pages"
import { NavBar, Navigation } from "./components"
import './App.css';
import './firebase/config'
import { ReactQueryDevtools } from "react-query-devtools"






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
