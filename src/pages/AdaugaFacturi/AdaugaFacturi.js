import React, { useState } from "react";
import "./uploader.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CircularProgress from '@mui/material/CircularProgress';
import 'pdfjs-dist/build/pdf.worker.entry';

export default function AdauagaFacturi(){

  const handleClick=()=>{
    console.log('buna');
  }

  return(    
    <div className="adaugaFact">
        <Button variant='outlined' color='secondary' onClick={handleClick}>Apasa aici</Button>
  </div>
)
}