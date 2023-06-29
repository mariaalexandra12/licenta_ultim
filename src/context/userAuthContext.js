import { createContext, useContext,useEffect,useState} from "react";
import {auth} from '../firebaseUtils/firebase_ut';

const AuthContext = createContext({
    currentUser:null,
});

export function AuthContextProvider({children}) {
    
    const [currentUser,setCurrentUser]=useState(null) 

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