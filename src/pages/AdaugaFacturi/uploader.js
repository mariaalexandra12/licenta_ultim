import React, { useState } from 'react';
import "./uploader.css"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Tesseract from "tesseract.js";

export function Uploader(){
    
    const [extractedData, setExtractedData] = useState(null);

    const extractDataFromPDF = async (file) => {
      const worker = Tesseract.createWorker();
      //await worker.load();
      await worker.loadLanguage('ron');
      await worker.initialize('ron');
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();
  
      const extractedValues = extractValuesFromText(text);
      setExtractedData(extractedValues);
    };
  
    const extractValuesFromText = (text) => {
  
      const regex = /Total de plata:\s*(\d+\.\d+)/;
      const match = text.match(regex);
      const totalValue = match ? match[1] : '';
  
      return {
        total: totalValue,
  
      };
    };




   return(    
    <div className="adaugaFact">
     <form action="">
        <input type="file" className="inputFile" hidden={true} onChange={(event) => extractDataFromPDF(event.target.files[0])}
        ></input>
        <CloudUploadIcon className="uploadIcon" onClick={()=>document.querySelector(".inputFile").click()}>

        </CloudUploadIcon>
     
        <p>Incarca o factura</p>
        
     </form>
     {extractedData && (
        <div>
          <p>Total factură: {extractValuesFromText.totalValue}</p>
        </div>
      )}
     
     
     

    </div>
)

}