import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import "./uploader.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function AdauagaFacturi(){

  const [selectedImage, setSelectedImage ]=useState(null)
  const [ocrResult , setOcrResult] = useState("")
  const [ocrState, setOcrState ]=useState(STATUS.IDLE)
  
  const worker=createWorker();

 const STATUS={
  IDLE:"",
  FAILED:"Factura nu a putut fi incarcata",
  PENDING:"In curs de procesare....",
  SUCCEEDED:"Factura a fost citita cu succes",
 }

  try{
    const getOcrResult=async()=>{
     (await worker).load();
     (await worker).loadLanguage("ron");
     (await worker).initialize("ron");
     const { data  }=(await worker).recognize(selectedImage);
     await worker.terminate();
     console.log(data);
     setOcrState(STATUS.SUCCEEDED);
  }} catch(err){
     setOcrState(STATUS.FAILED);
  }
}

  useEffect(()=>{
     getOcrResult();
  },[selectedImage])

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