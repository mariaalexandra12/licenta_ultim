import React from 'react';
import "./uploader.css"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export function Uploader(){


    const handleClick=()=>{
        console.log("click")
      }
return(    
<div className="adaugaFact">
     <h3>Incarca o factura</h3>
     <CloudUploadIcon onClick={handleClick} className="upload"></CloudUploadIcon>
     

    </div>
)

}