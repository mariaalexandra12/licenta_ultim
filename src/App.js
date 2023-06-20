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
            <Route  path="/" exact element={<Auth/>}></Route>
            <Route  path="/navig" exact element={<Navig/>}></Route>
              <Route path="/analiza" exact element={<Analiza/>}></Route>
              <Route path="/dashboard" exact element={<Dashboard/>}></Route>
              <Route path="/adaugaFacturi" exact element={<AdaugaFacturi/>}></Route>
              <Route path="/facturi" exact element={<Facturi/>}></Route>
              
            </Routes>

    </BrowserRouter>
  </React.StrictMode>

  );
}

export default App;
