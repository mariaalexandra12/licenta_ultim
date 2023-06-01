import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Route,Routes} from "react-router-dom";
import Rapoarte from "./pages/Rapoarte/Rapoarte";
import Analiza from "./pages/Analiza/Analiza";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdaugaFacturi from "./pages/AdaugaFacturi/AdaugaFacturi";
import Facturi from "./pages/Facturi/Facturi"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
     <App/>
          <Routes>
                <Route path="rapoarte" element={<Rapoarte/>}></Route>
                <Route path="analiza" element={<Analiza/>}></Route>
                <Route path="dashboard" element={<Dashboard/>}></Route>
                <Route path="adaugaFacturi" element={<AdaugaFacturi/>}></Route>
                <Route path="facturi" element={<Facturi/>}></Route>
            </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
