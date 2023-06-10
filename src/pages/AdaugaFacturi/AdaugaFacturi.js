import React, { useEffect, useState , useRef } from "react";
import Tesseract, { createWorker } from "tesseract.js";
import "./uploader.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function AdauagaFacturi(){

  const [selectedImage, setSelectedImage ]=useState(null);
  const [ocrResult , setOcrResult] = useState("");
  const [fileName, setFileName]=useState("");
  const [progress , setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");

  const workerRef=useRef();

  useEffect(()=>{
     workerRef.current=createWorker({
      logger : message => {
        if ('progress' in message) {
          setProgress(message.progress);
          setProgressLabel(message.progress === 1 ? 'Done' : message.status);
        }
      }
    });
    return ()=>{
      if(workerRef.current){
      //workerRef.current.terminate();
      workerRef.current=null;
      }
    }
  },[])

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
    setProgress(0);
    setProgressLabel('starting');
    const worker=workerRef.current;
     await worker.load();
     await worker.loadLanguage("ron");
     await worker.initialize("ron");
      const response=await worker.recognize(selectedImage);
      
      setOcrResult(response.data.text);
      console.log(response.data);
     
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
     <button disabled={!selectedImage || !workerRef} onClick={()=>{ocr()}}>Extract data</button>
     {selectedImage && <>
     <img className="document" src={selectedImage} alt="invoice"  />
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