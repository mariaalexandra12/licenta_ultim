import React, { useState } from "react";
import "./uploader.css";


export default function AdauagaFacturi(){
  
  const express=require("express");
  const app = express();


  return(    
    <div className="adaugaFact">
        <span>Selecteaza un document</span>
        <input className='selectfile' type="file"></input>
        <span id="result">Result text</span>
        <textarea className="text" ></textarea>
  </div>
)

}