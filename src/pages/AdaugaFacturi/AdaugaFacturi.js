import React, { useEffect, useState , useRef } from "react";
import Tesseract, { createWorker } from "tesseract.js";
import "./uploader.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function AdauagaFacturi(){

  const [selectedImage, setSelectedImage ]=useState(null);
  const [ocrResult , setOcrResult] = useState("");
  const [fileName, setFileName]=useState("");

  const worker=createWorker();

  const handleChangeImage = e =>{
    const reader=new FileReader();
    reader.onloadend=()=>{
    const image=reader.result;
    setSelectedImage(image);
    setFileName(e.target.files[0].name);
  }
  reader.readAsDataURL(e.target.files[0]);
  };

  const ocr=async()=>{
      (await worker).load();
      (await worker).loadLanguage("ron");
      (await worker).loadLanguage("ron");
      const { data : { text } } = (await worker).recognize(selectedImage); 
      (await worker).terminate();
      setOcrResult(text);
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
          <p>A fost incarcat documentul {fileName} </p>
           :
           <p>Nu a fost incarcata nicio factura</p>}
        </section>
     </form>
     <button >Extract data</button>
     {selectedImage && <>
     <img className="document" src={URL.createObjectURL(selectedImage)} alt="invoice"  />
     </>}


     {ocrResult ? 
     <>
     <p>Result {ocrResult}</p>
     </>
     :
      
     <p>Nu merge !</p>
    
    }


      </div>

    </div>
)
}