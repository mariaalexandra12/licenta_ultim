import React, { useState , useEffect ,useRef} from "react";
import "./uploader.css";
import { Button } from '@mui/material';

import LinearProgress from '@mui/material/LinearProgress';

export default function AdauagaFacturi(){

  
  const [progress,setProgress]=useState(0);
  const [progressLabel , setProgressLabel]=useState('idle');
  const [imageData, setImageData]=useState();
  const [ocrResult,setOcrResult]=useState('');

  const handleChange=(event) => {
    const reader=new FileReader();
    reader.onloadend = ()=>{
      const imageDataUrl=reader.result;
      setImageData(imageDataUrl);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  return(    
    <div className="adaugaFact">
      
        <span>Selecteaza un document</span>
        <input className='selectfile' type="file" onChange={handleChange}></input>
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