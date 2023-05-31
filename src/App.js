import React from "react";
import Navig from "./components/Navig";
import {Route,Routes} from "react-router-dom";
import Rapoarte from "./components/Rapoarte";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navig/>}/>
        <Route path="rapoarte" element={<Rapoarte/>}/>
      </Routes>
    </div>
  );
}

export default App;
