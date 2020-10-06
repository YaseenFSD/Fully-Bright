import React from 'react';
import logo from './logo.svg';
import { LoginPage } from "./pages"
import './App.css';
import './firebase/config'
import { ReactQueryDevtools } from "react-query-devtools"


function App() {
  return (<>
    <div className="App">
      <LoginPage />
    </div>
    <ReactQueryDevtools />
  </>

  );
}

export default App;
