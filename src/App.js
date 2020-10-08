import React, { useEffect, useState } from 'react';
import { NavBar } from "./components"
import { Navigation } from './navigation'
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import './firebase/config'
import { ReactQueryDevtools } from "react-query-devtools"
import { UserProvider } from './firebase/UserProvider'
import { Route } from "react-router-dom"
import {LoginPage} from './pages/login-page'
import { useQueryCache } from "react-query"
import { auth } from './firebase'



function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const cache = useQueryCache()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( (user) => {
      if (user){
        setLoggedIn(true)
        cache.setQueryData("userData", user)
      } else {
        setLoggedIn(false)
        cache.setQueryData("userData", null)
      }
    }
    )
    return () => unsubscribe()
  }, [])

  return (<>
  
    <div className="App">
      
      <Navigation isLoggedIn = {isLoggedIn} />
    </div>
    <ReactQueryDevtools />
  </>

  );
}

export default App;
