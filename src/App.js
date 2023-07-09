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
import ForgetPass from "./pages/Authentification/forgetParola";
import SignUpFirma from "./pages/Authentification/signUpFirma";
import './App.css';
import { AuthContextProvider } from "./context/userAuthContext";
import ContFirma from "./components/contFirma";
import ContPers from "./components/contPers";


function App() {
  return (
    <AuthContextProvider>
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/navig" element={<Navig />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/signUp" exact element={<SignUp />} />
            <Route path="/signUpFirma" exact element={<SignUpFirma />} />
            <Route path="/contPers" exact element={<ContPers/>}/>
            <Route path="/contFirma" exact element={<ContFirma/>}/>
            <Route path="/forget" exact element={<ForgetPass />} />
            <Route path="/sPers" exact element={<SignUpPers />} />
            <Route path="/analiza" element={<Analiza />} />
            <Route path="/adaugaFacturi" element={<AdaugaFacturi />} />
            <Route path="/facturi" element={<Facturi />} />
        </Routes>
    </BrowserRouter>
    </AuthContextProvider>
  );
}


export default App;
