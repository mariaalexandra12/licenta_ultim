import React, { useEffect, useState } from "react";
import "./uploader.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

export default function AdauagaFacturi(){

  const [selectedImage, setSelectedImage ]=useState(null);
  const [fileName, setFileName]=useState("");
  const [vendorName, setVendorName]=useState("");
  const [totalValue,setTotalValue] = useState(0);
  const [dueDate , setDueDate]=useState("");
  const [ services,setServices]=useState("");


  const tess=require("tesseract.js");


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
     tess.recognize(selectedImage,"ron").then(out=>{
      const pattern = /Data scadentă: (\d{2}\.\d{2}\.\d{4})/; 
      const match = out.data.text.match(pattern);
      if(match && match[1]){
        setDueDate(match[1]);
      }
      else
      {
        setDueDate(' ');
      }

      console.log(out.data.text)
    const patternValue=/Total de plata:\s*([\d.]+)\s*lei/gmi;
    const matchValue=out.data.text.match(patternValue);
    if(matchValue && matchValue[1]){
      setTotalValue(matchValue[1]);
    }
    else{
      setTotalValue(0);
    }
     
  })}
  //"Data scadentă"


  return(    
    <div className="adaugaFact">
        <div className="uploadDocDisplay">
           <div className="uploadDocument">
            <form action="">
            <input type="file" className="inputFile" hidden={true} onChange={handleChangeImage}></input>
            <Tooltip title="Incarca o factura ">
           <CloudUploadIcon fontSize="large" className="uploadIcon" onClick={()=>document.querySelector(".inputFile").click()}>
           </CloudUploadIcon>
           </Tooltip>

              <section>
              {fileName ? 
               <p style={{marginLeft: "50px",}}>A fost incarcat documentul {fileName} </p>
                :
                <p style={{marginLeft: "80px"}}>Nu a fost incarcata nicio factura</p>}
              </section>
             </form>
          </div>

          
          <div className="displayDocument">
            {selectedImage && <>
            <img className="document" src={selectedImage} alt="invoice"  />
             </>}
          </div>
         
         </div>

         <div className="showProgressDisplayResult">

         <div className="showProgress">
              
               <Button onClick={ocr} endIcon={<LibraryBooksIcon/>} color="secondary" 
               variant="outlined" disabled={!selectedImage} >Extrage date</Button>
               
  
          </div>
           

           <div className="displayResult">
           
            <div>
            <label>Nume furnizor</label>
             <input type="text"  style={{
              marginLeft:'5px',
              marginTop:'5px'}} value={vendorName}></input>

             <label>Data Scadenta</label>
             <input type="text"  style={{
              marginLeft:'5px',
              marginTop:'5px'}} value={dueDate}></input>
             

              <label>Total plata</label>
              <input type="text"  style={{
              marginLeft:'5px',
            marginTop:'5px'}} value={totalValue}></input>

              <label>Denumire servicii</label>
              <input type="text"  style={{
              marginLeft:'5px',
            marginTop:'5px'}} value={services}></input>
            </div>
            
            
         </div>

        
          
         </div>
        
      
    
   
  </div>
)
}