import React, { useState } from "react";
import "./uploader.css";
import { Button } from '@mui/material/Button'


export default function AdauagaFacturi(){


  return(    
    <div className="adaugaFact">
        <span>Selecteaza un document</span>
        <input className='selectfile' type="file"></input>
        <Button variant="outlined" >Extrage date</Button>
        <span id="result">Result text</span>
        <textarea className="text" ></textarea>
  </div>
)

}