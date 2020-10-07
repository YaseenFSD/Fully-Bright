import React from 'react';
import { NavBar, Navigation } from "./components"
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import './firebase/config'
import { ReactQueryDevtools } from "react-query-devtools"
import { UserProvider } from './firebase/UserProvider'

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
