import React, { useState } from 'react';
import "./uploader.css"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import Icon from '@mui/material/Icon';

export function Uploader(){

    const [fileName,setFileNames]=useState("Nu a fost selectat un document");
    const[image,setImage]=useState(null);

   return(    
    <div className="adaugaFact">
     <form action="">
        <input type="file" className="inputFile" hidden={true} onChange={({target:{files}})=>{
            files[0] && setFileNames(files[0].name);
            if(files){
                setImage(URL.createObjectURL(files[0]));
            }
        }}></input>
        <CloudUploadIcon className="uploadIcon" onClick={()=>document.querySelector(".inputFile").click()}>

        </CloudUploadIcon>
     
        <p>Incarca o factura</p>
     
     </form>
    
     {image && 
     
     
     
     <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer fileUrl={image}></Viewer>
     </Worker>
     }
     

    </div>
)

}