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
import Settings from "./components/Settings";
import Profil from "./components/Profil";

function App() {
  return (
    <BrowserRouter>
     
        
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/navig" element={<Navig />} />
            <Route path="/analiza" element={<Analiza />} />
            <Route path="/adaugaFacturi" element={<AdaugaFacturi />} />
            <Route path="/facturi" element={<Facturi />} />
          <Route path="/signUp" exact element={<SignUp />} />
          <Route path="/signUpFirma" exact element={<SignUpFirma />} />
          <Route path="/reset" exact element={<ResetPass />} />
          <Route path="/forget" exact element={<ForgetPass />} />
          <Route path="/sPers" exact element={<SignUpPers />} />
          <Route path="/settings" exact element={<Settings/>}/>
          <Route path="/profil" exact element={<Profil/>}/>
        </Routes>
    
    </BrowserRouter>
  );
}


export default App;
