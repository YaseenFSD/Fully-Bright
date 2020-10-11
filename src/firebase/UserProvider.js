import React, { useContext, useEffect, useState } from "react";
import {auth} from './config'

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [session, setSession] = useState({ user: null, loading: true });

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    setSession({ loading: false, user });
  });
  return ()=> unsubscribe()
},[]);
return (
    <UserContext.Provider value = {session}>
        {!session.loading &&props.children}
    </UserContext.Provider>
)

}
export const useSession = () => {
    const session =useContext(UserContext)
    console.log(session)
    console.log(UserContext)
    return session
}
