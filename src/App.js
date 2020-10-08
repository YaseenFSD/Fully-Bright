import React, {useEffect} from 'react';
import logo from './logo.svg';
import { LoginPage } from "./pages"
import { NavBar } from "./components"
import { Navigation } from "./navigation"
import './App.css';
import './firebase/config'
import { ReactQueryDevtools } from "react-query-devtools"
import { UserProvider } from './firebase/UserProvider'
import { Route } from "react-router-dom"
import { useQueryCache } from "react-query"

function App() {
  // window.onload = () => {
  //   console.log("hey")
  // }
  const cache = useQueryCache()
  useEffect(() => {
    let testingStorage = JSON.parse(window.localStorage.getItem("userDataLocalStorage"))
    cache.setQueryData("userData", testingStorage)
  })
  return (<>

    <div className="App">

      <Navigation />
    </div>
    <ReactQueryDevtools />
  </>

  );
}

export default App;
