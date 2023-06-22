import React,{ useState , useCallback} from "react";
import "./uploader.css";
import { Box, Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Navig from "../../components/Navig";
import {useDropzone} from 'react-dropzone'

function AdaugaFacturi(){
  const [selectedFiles, setSelectedFiles]=useState();
  const onDrop = useCallback(acceptedFiles => {
    setSelectedFiles(acceptedFiles.map(file =>
      Object.assign(file,{
        preview:URL.createObjectURL(file)
      })
      
      ));
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return(    
    <>
    <Box sx={{display: 'flex'}}>
    <Navig/>
    <Box sx={{marginTop: '50px',}}>
      <Box sx={{marginLeft:'15px'}}>
      <h2>Incarca o factura</h2>
      <div>
      <input {...getInputProps()} />
          <p>Insereaza o factura aici</p> :





      </div>
    
    
      </Box>
    </Box>

    </Box>
    </>
)

}

export default AdaugaFacturi;