import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Route,Routes} from "react-router-dom";
import Rapoarte from "./pages/Rapoarte/Rapoarte";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<App/>}/>
               <Route path="rapoarte" element={<Rapoarte/>}></Route>
            </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
