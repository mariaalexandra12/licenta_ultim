import { createContext, useContext,useEffect,useState} from "react";
import {auth} from '../firebaseUtils/firebase_ut';
import {createUserWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

const AuthContext = createContext({
    currentUser:null,
});

export function AuthContextProvider({children}) {
    
    const [currentUser,setCurrentUser]=useState(null) 

    useEffect(()=>{
      const unsubscribe=onAuthStateChanged(auth,user=>{
        setCurrentUser(user);
      })
      return ()=>{
        unsubscribe();}
    },[])


    const value={
        currentUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider> 
    )
}

export function useUserAuth(){
    return useContext(AuthContext);
}