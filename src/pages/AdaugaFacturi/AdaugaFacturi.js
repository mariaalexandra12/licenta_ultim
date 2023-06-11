import React, { useEffect, useState } from "react";
import "./uploader.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function AdauagaFacturi(){

  const [selectedImage, setSelectedImage ]=useState(null);
  const [ocrResult , setOcrResult] = useState("");
  const [fileName, setFileName]=useState("");


  const tess=require("tesseract.js");

  useEffect(()=>{
     //console.log(ocrResult);
  },[selectedImage])

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
     tess.recognize(selectedImage,"ron").then(out=>{setOcrResult(out.data.text)});
     
  };
  


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
        
         {selectedImage && <>
         <img className="document" src={selectedImage} alt="invoice"  />
         </>}
     
      </div>

      <button className="extractData" disabled={!selectedImage} onClick={ocr}>Extract data</button>
    
    <div className="showResult">
        {ocrResult ? 
         <p>Result {ocrResult}</p>
         :
         <p>Nu a fost nimic incarcat!</p>
        }
  
    </div>
  </div>
)
}