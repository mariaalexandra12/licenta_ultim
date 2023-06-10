import React, { useState } from "react";
import { createWorker } from "tesseract.js";
import "./uploader.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function AdauagaFacturi(){

  const [selectedImage, setSelectedImage ]=useState(null)
  const [ocrResult , setOcrResult] = useState("")

  const handleChangeImage=e=>{
    setSelectedImage(e.target.files[0]);
  }

 
 
  return(    
    <div className="adaugaFact">
        <div className="imageUploadDisplay">
     <form action="">
        <input type="file" className="inputFile" hidden={true} onChange={handleChangeImage}></input>
        <CloudUploadIcon className="uploadIcon" onClick={()=>document.querySelector(".inputFile").click()}>

        </CloudUploadIcon>
     
        <p>Incarca o factura</p>
        
     </form>
   
    

   
     

        </div>
    </div>
)
}