import React, { useState } from "react";
import "./uploader.css";
import { Button } from '@mui/material'


export default function AdauagaFacturi(){

  
 

  return(    
    <div className="adaugaFact">
        <span>Selecteaza un document</span>
        <input className='selectfile' type="file"></input>
        <Button variant="contained" color="success" style={{
          marginTop:'25px'
        }}>Extrage date</Button>
        <span id="result">Result text</span>
        <textarea className="text" ></textarea>
  </div>
)

}