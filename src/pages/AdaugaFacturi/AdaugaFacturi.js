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
        if(selectedFile && (fileType.includes(selectedFile.type))){
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

 // const newPlug=defaultLayoutPlugin()
  return(
    <div className="pdfwork">
      <form  >
          <input type="file" className="form-control" onChange={handleChange} placeholder="Alege o factura"></input>        
          <button type="submit" onClick={handleSubmit}>Vizualizeaza factura</button>
      </form>
      <h2>Vizualizeaza factura</h2>
        <div className="pdfView" style={{
        width:"60%",
        height:"500px",
        display:"flex",
        overflowY:"auto",
        justifyContent:"center",
        alignItems:"center",
       }}>
        
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
         {viewPdf && <>
            <Viewer fileUrl={viewPdf} ></Viewer>
         </>}
          {!viewPdf && <>Nu a fost incarcata nicio factura !</>}
        </Worker>
       
        
        </div>
    </div>
    
  )
}