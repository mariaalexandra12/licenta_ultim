import React from 'react';
import { useState } from 'react';

function AdaugaFacturi(){

   const [pdfFile, setPdfFile]=useState(null);
   const [pdfError, setPdfError]=useState('');

   const fisierePermise=['application/pdf']
   const handleFile=(e)=>{
      let selectedFile=e.target.files[0];
      if(selectedFile){
        if(selectedFile&&fisierePermise.includes(selectedFile.type)){
            let reader=new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend=(e)=>{
               setPdfError('');
               setPdfFile(e.target.result);
               console.log(e.target.result);
            }
        }
        else{
         setPdfError('Ai incarcat un document care nu are un format valid. Incarca un fisier de tip pdf!');
        }
      }
      else{
         console.log('Please select a PDF file');
      }
   }

   return(
      
      <div className="container">
         <form>
          <label><h5>Adauga o factura</h5></label>    
          <br/>
          <input type='file' className="form-control"
          onChange={handleFile}></input>     
          {pdfError&& <span className="text">{pdfError}</span>}
      </form>

      <h5>Vizualizare Factura</h5>
      <div className="viewer">
          {pdfFile&&(
            <div>Afisare Factura</div>
          )}
          {!pdfFile && <>Nu a fost selectat niciun fisier</>}
      </div>
      </div>
   
   )
}

export default AdaugaFacturi
