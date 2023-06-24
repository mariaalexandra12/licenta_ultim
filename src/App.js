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
import SignUpPers from "./pages/Authentification/signUpPers";
import ResetPass from "./pages/Authentification/resetParola";
import ForgetPass from "./pages/Authentification/forgetParola";
import SignUpFirma from "./pages/Authentification/signUpFirma";

function App() {
  return (
   
    <BrowserRouter >
          <Routes> 
            <Route  path="/"  element={<Auth/>}></Route>
            <Route path="/signUp" exact element={<SignUp/>}></Route>
            <Route path="/signUpFirma" exact element={<SignUpFirma/>}></Route>
            <Route path="/reset" exact element={<ResetPass/>}></Route>
            <Route path="/forget" exact element={<ForgetPass/>}></Route>
            <Route path="/sPers" exact element={<SignUpPers/>}></Route>

            
            <Route path="/navig" element={<Navig/>}  ></Route>
            <Route path="/analiza" exact element={<Analiza/>}></Route>
            <Route path="/adaugaFacturi" exact element={<AdaugaFacturi/>}></Route>
            <Route path="/facturi" exact element={<Facturi/>}></Route>
           
            </Routes>

    </BrowserRouter>
  

  );
}

export default App;
