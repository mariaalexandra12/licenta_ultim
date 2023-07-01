import { createContext, useContext,useEffect,useState} from "react";
import {auth, db} from '../firebaseUtils/firebase_ut';
import {createUserWithEmailAndPassword,
    onAuthStateChanged ,
} from 'firebase/auth'
import * as firebase from 'firebase/auth';
import { collection, query, where, getDocs,onSnapshot, QuerySnapshot} from "firebase/firestore";



const AuthContext = createContext({
    currentUser:null,
    dateLogare:null,
});

export function AuthContextProvider({children}) {
    
    const [currentUser,setCurrentUser]=useState(null) 
    const [dateLogare,setDateLogare]=useState([]) 

    useEffect(()=>{
      const unsubscribe=onAuthStateChanged(auth,user=>{
        if(user){
            setCurrentUser(user.email);
                const q2 = query(collection(db, "utilizator"),where("emailUtilizator","==",user.email));
                let idF;
                onSnapshot(q2,(snapshot)=>{
               let userData=[];
               snapshot.docs.forEach((doc)=>{
                if(doc.exists()){
                    setDateLogare(JSON.stringify(doc.data()));
               }
             })});

                 const q=query(collection(db,"firma"),where("emailFirma","==",user.email));
                 onSnapshot(q,(snapshot)=>{
                    snapshot.docs.forEach((doc)=>{
                    if(doc.exists()){
                        setDateLogare(JSON.stringify(doc.data()));
                   }
                 })})
                }
      return ()=>{
        unsubscribe();}
    })
},[currentUser])

    // const value={
    //     currentUser,
    //     dateLogare
    // }

    return (
        // value={currentUser}
        <AuthContext.Provider value={{currentUser,dateLogare}}>
            {children}
        </AuthContext.Provider> 
    )
}

export function useUserAuth(){
    return useContext(AuthContext);
}

