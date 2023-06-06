import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Rapoarte from "./pages/Rapoarte/Rapoarte";
import Analiza from "./pages/Analiza/Analiza";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdaugaFacturi from "./pages/AdaugaFacturi/AdaugaFacturi";
import Facturi from "./pages/Facturi/Facturi"
import Auth from "./pages/Authentification/Auth";
import Navig from './components/Navig';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
          <Routes>
            <Route exact path="/" element={<Auth/>}></Route>
            <Route  path="navig" element={<Navig/>}></Route>
              <Route path="navig/analiza" element={<Analiza/>}></Route>
              <Route path="navig/dashboard" element={<Dashboard/>}></Route>
              <Route path="navig/adaugaFacturi" element={<AdaugaFacturi/>}></Route>
              <Route path="navig/facturi" element={<Facturi/>}></Route>
              
            </Routes>

    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
