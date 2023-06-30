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
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('') 

    useEffect(()=>{
      const unsubscribe=onAuthStateChanged(auth,user=>{
        if(user){
            setCurrentUser(user.email)
        }
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