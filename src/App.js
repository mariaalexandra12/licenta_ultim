import React from "react";
import Navig from "./components/Navig";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Rapoarte from "./pages/Rapoarte/Rapoarte";
import Analiza from "./pages/Analiza/Analiza";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdaugaFacturi from "./pages/AdaugaFacturi/AdaugaFacturi";
import Facturi from "./pages/Facturi/Facturi"
import Auth from "./pages/Authentification/Auth";
import SignUp from "./pages/Authentification/signUp";
import SignUpFirma from "./pages/Authentication/SignUpFirma";
import SignUpPers from "./pages/Authentification/signUpPers";

function App() {
  return (
   
    <BrowserRouter >
          <Routes> 
            <Route  path="/"  element={<Auth/>}></Route>
            <Route path="/navig" element={<Navig/>}  ></Route>
    
            <Route path="/analiza" exact element={<Analiza/>}></Route>
            <Route path="/adaugaFacturi" exact element={<AdaugaFacturi/>}></Route>
            <Route path="/facturi" exact element={<Facturi/>}></Route>
            <Route path="/signUp" exact element={<SignUp/>}></Route>
            <Route path="/signUpFirma" exact element={<SignUpFirma/>}></Route>
            <Route path="/signupPers" exact element={<SignUpPers/>}></Route>
              
            </Routes>

    </BrowserRouter>
  

  );
}

export default App;
