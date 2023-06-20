import React, { useState } from "react";
import "./uploader.css";
import Button from '@mui/material/Button';



export default function AdauagaFacturi(){

  const handleClick=(event) => {
    let api="";
    let reader=new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=()=>{
      let result=reader.result;
      fetch(api,{
        method: "POST",
        body: JSON.stringify({
          
        })
      });
    }
  }

  return(    
    <div className="adaugaFact">
        <span>Selecteaza un document</span>
        <input className='selectfile' type="file"></input>
        <Button id="btn" variant='outlined' color='secondary' onClick={handleClick}
        style={{
          marginTop:'25px'
        }}>Extrage date</Button>
        <span id="result">Result text</span>
        <textarea className="text" ></textarea>
  </div>
)
}