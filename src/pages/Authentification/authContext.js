import React,{useContext , useState} from 'react';
import { auth } from '../../firebaseUtils/firebase_ut';


const AuthContext=React.createContext()

export function useAuth(){
  return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [currentUser,setCurrentUser]=useState()
    
    function signUp(email,password){
        
    }

    const value={
        currentUser
    }
    return (
     <AuthContext.Provider value={value}>
        {children}
     </AuthContext.Provider>

    )
}