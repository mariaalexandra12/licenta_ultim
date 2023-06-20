import React, { useState , useEffect ,useRef} from "react";
import "./uploader.css";
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function AdauagaFacturi(){

  
  const [progress,setProgress]=useState(0);
  const [progressLabel , setProgressLabel]=useState('idle');
  const [imageData, setImageData]=useState();
  const [ocrResult,setOcrResult]=useState('');


  return(    
    <div className="adaugaFact">
        <span>Selecteaza un document</span>
        <input className='selectfile' type="file"></input>
        <Button variant="contained" color="success" style={{
          marginTop:'25px'
        }}>Extrage date</Button>
        <LinearProgress variant="determinate" value={progress} style={{
          width:'250px',
          marginTop:'20px',
          }}></LinearProgress>
        <span id="result" style={{marginTop:'10px'}}>Result text</span>
        <textarea className="text" ></textarea>
  </div>
)

}