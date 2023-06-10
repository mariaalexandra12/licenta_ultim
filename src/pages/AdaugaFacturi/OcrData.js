import React,{ useState } from 'react';
import { createWorker } from 'tesseract.js';

export default function OcrData({onReadOcrData}){


    const STATUSES={
        IDLE:"",
        FAILED:"Failed to perform OCR",
        PENDIND:"Processing...This may take a while",
        SUCCEEDED:"Completed",
    }

    
    const [ocrState, setOcrState]=useState(STATUSES.IDLE);
    const worker=createWorker();

    //PROCESS
    const readImage=async()=>{
        setOcrState(STATUSES.PENDIND);
        try{
            //am setat limba
            await worker.load()
            await worker.loadLanguage("ron")
            await worker.initialize("ron")
            //recunoaste textul de pe factura 
            const {data : {text}} = (await worker).recognize()
            (await worker).terminate()

            onReadOcrData(text)
            setOcrState(STATUSES.SUCCEEDED)
        }
        catch(err){
            setOcrState(STATUSES.FAILED)
        }
    }
   return (

   
       <div>
        {ocrState}
        
       </div>
   
   
       )
}