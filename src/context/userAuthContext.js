import { createContext, useContext,useEffect,useState} from "react";
import {auth} from '../firebaseUtils/firebase_ut';

const userAuthContext = createContext({
    currentUser:null,
});

export function UserAuthContextProvider({children}) {
    
    const [currentUser,setCurrentUser]=useState(null) 

    const value={
        currentUser,
    }

    return (
        <userAuthContext.Provider value={value}>
            {children}
        </userAuthContext.Provider> 
    )
}

export function useUserAuth(){
    return useContext(userAuthContext);
}