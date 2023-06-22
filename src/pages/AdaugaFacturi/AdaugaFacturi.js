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
  const selected_file=selectedFiles?.map(file=>(
    <div>

      <img src={file.preview} style={{
        width:"450px",
        height:"500px",
        }} alt=""/>

    </div>

  ))

  return(    
    <>
    <Box sx={{display: 'flex'}}>
    <Navig/>
    <Box sx={{marginTop: '50px',}}>
      <Box sx={{marginLeft:'15px'}}>

      <div {...getRootProps()}>
      <input {...getInputProps()} />
          <p>Insereaza o factura aici</p>
      </div>
      {selected_file}
    
      </Box>
    </Box>

    </Box>
    </>
)

}

export default AdaugaFacturi;