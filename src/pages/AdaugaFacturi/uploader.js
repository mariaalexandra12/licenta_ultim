import React, { useState } from 'react';
import "./uploader.css"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createWorker } from "tesseract.js";

export function Uploader(){

    const [fileName,setFileNames]=useState();
    const[image,setImage]=useState(null);

   return(    
    <div className="adaugaFact">
        <div className="imageUploadDisplay">
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
        <section>
          {fileName ?
           <>A fost selectat documentul "{fileName}"</>
           :
           <>Nu a fost selectat un document</>
           }
        </section>
        
     </form>
     {image && <>
        <img  className="document"  src={image} alt="invoice"></img>
        </>}
     
    
        </div>
    </div>
)

}