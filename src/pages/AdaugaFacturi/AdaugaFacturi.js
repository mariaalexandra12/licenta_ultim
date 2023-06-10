import React, { useEffect, useState } from "react";
import { createWorker } from 'tesseract.js';

import "./uploader.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function AdauagaFacturi(){

  const [selectedImage, setSelectedImage ]=useState(null)
  const [ocrResult , setOcrResult] = useState("")
  const [fileName, setFileName]=useState()
  
  const worker=createWorker();
 

    const getOcrResult=async()=>{

     const { data }=(await worker).recognize(selectedImage);
     console.log(data.text);
     console.log(5);
    (await worker).terminate();   }  
    else{
      console.log("nu a fost incarcata factura");
    }
    
     }



  const handleChangeImage = e =>{
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
        <section>
          {fileName ? 
          <p>A fost incarcat documentul  {fileName} </p>
           :
           <p>Nu a fost incarcata nicio factura</p>}
        </section>
     </form>
        </div>
    </div>
)
}