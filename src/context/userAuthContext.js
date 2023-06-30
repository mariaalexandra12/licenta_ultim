import { createContext, useContext,useEffect,useState} from "react";
import {auth} from '../firebaseUtils/firebase_ut';
import {createUserWithEmailAndPassword,
    onAuthStateChanged 
} from 'firebase/auth'

import * as firebase from 'firebase/auth';

const AuthContext = createContext();

export function AuthContextProvider({children}) {
    
    const [currentUser,setCurrentUser]=useState(null) 
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('') 

    useEffect(()=>{
    
      const unsubscribe=onAuthStateChanged(auth,user=>{
        if(user){
            const userKey=user.uid;
            localStorage.setItem(userKey,user.email);
            setCurrentUser(user.email)
        }
        else{
            setCurrentUser('');
            const key=user.uid;
            localStorage.removeItem(key);
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

export function getFromLocalStorage(mail){
    for (let i=0;i<localStorage.length;i++){
        const key=localStorage.key(i);
        if(key.includes('@gmail.com')){
            const getEmail=localStorage.getItem(key);
            if(getEmail === mail)
            {
                 return getEmail;
            }
        }
    }
     return null;
}