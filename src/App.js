import React from "react";
import Navig from "./components/Navig";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Rapoarte from "./pages/Rapoarte/Rapoarte";
import Analiza from "./pages/Analiza/Analiza";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdaugaFacturi from "./pages/AdaugaFacturi/AdaugaFacturi";
import Facturi from "./pages/Facturi/Facturi"
import Auth from "./pages/Authentification/Auth";



function App() {
  return (
    <React.StrictMode>
    <BrowserRouter >
          <Routes> 
            <Route  path="/"  element={<Auth/>}></Route>
            <Route path="/navig" element={<Navig/>}></Route>
              <Route path="/analiza"  element={<Analiza/>}></Route>
              <Route path="/dashboard" element={<Dashboard/>}></Route>
                <Route path="/adaugaFacturi"  element={<AdaugaFacturi/>}></Route>
                <Route path="/facturi" element={<Facturi/>}></Route>
              
            </Routes>

    </BrowserRouter>
  </React.StrictMode>

  );
}

export default App;
