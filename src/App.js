import React, { useEffect, useState } from 'react';
import { Navigation } from './navigation'
import './App.css';
import './firebase/config'
import { ReactQueryDevtools } from "react-query-devtools"
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
