import React, { useState } from "react";
import { Worker , Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

export default function AdauagaFacturi(){

  const [pdfFile,setPdfFile]=useState(null)
  const [viewPdf,setViewPdf]=useState(null)
  const [error , setError]=useState(null)
  const fileType=['application/pdf']
  const handleChange=(event)=>{
     let selectedFile=event.target.files[0]
     if(selectedFile){
        if(selectedFile && fileType.include(selectedFile.type)){
            let reader=new FileReader()
            reader.readAsDataURL(selectedFile)
            reader.onload=(event)=>{
              setPdfFile(event.target.result)
            }
        }
        else{
          setPdfFile(null)
          alert('Ai introdus un format invalid! Incarca doar fisiere PDF!')
        }
     }
  }

  const handleSubmit=(e)=>{
        e.preventDefault()
        if(pdfFile !== null){
          setViewPdf(pdfFile)
        }
        else{
          setPdfFile(null)
        }
  }


  return(
    <div class="pdfwork">
      <form>
          <input type="file" className="form-control" onChange={handleChange}></input>        
          <button type="submit" onClick={handleSubmit}>View Pdf</button>
      </form>
      <h2>View Pdf</h2>
        <div className="pdfView" style={{
        width:"500px",
        height:"500px",
        display:"flex",
        overflowY:"auto",
        justifyContent:"center",
        alignItems:"center",
       }}>
        
        
       
      
        </div>
    </div>
    
  )
}