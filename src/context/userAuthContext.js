import { createContext, useContext,useEffect,useState} from "react";
import {auth, db} from '../firebaseUtils/firebase_ut';
import {createUserWithEmailAndPassword,
    onAuthStateChanged ,
} from 'firebase/auth'
import * as firebase from 'firebase/auth';
import { collection, query, where, getDocs,onSnapshot, QuerySnapshot} from "firebase/firestore";



const AuthContext = createContext({
    currentUser:null,
});

export function AuthContextProvider({children}) {
    
    const [currentUser,setCurrentUser]=useState(null) 

    useEffect(()=>{
      const unsubscribe=onAuthStateChanged(auth,user=>{
        if(user){
            setCurrentUser(user.email);
                }
      return ()=>{
        unsubscribe();
        }
    })
},[])

const value={
    currentUser
}

    return (
        // value={currentUser}
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider> 
    )
}

export function useUserAuth(){
    return useContext(AuthContext);
}

