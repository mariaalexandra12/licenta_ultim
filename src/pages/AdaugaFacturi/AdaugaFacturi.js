import React,{ useState , useCallback} from "react";
import "./uploader.css";
import { Box, Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Navig from "../../components/Navig";
import {useDropzone} from 'react-dropzone'
import Card from '@mui/material/Card';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { db, storage } from "../../firebaseUtils/firebase_ut";

function AdaugaFacturi(){
  const [selectedFiles, setSelectedFiles]=useState();
  const onDrop = useCallback(acceptedFiles => {
    setSelectedFiles(acceptedFiles.map(file =>
      Object.assign(file,{
        preview:URL.createObjectURL(file)
      })
      
      ));
  }, []);

  const {getRootProps, getInputProps} = useDropzone({onDrop})
  const selected_file=selectedFiles?.map(file=>(
    <div>
      <img src={file.preview} style={{
        width:"450px",
        height:"500px",
        }} alt=""/>
    </div>
  ))

  const [data , setData]=useState();

  return(    
    <>
    <Box sx={{display: 'flex'}}>
    <Navig/>
    <Box sx={{marginTop: '50px',
    display:'flex',
     }}>
      <Box sx={{marginLeft:'15px',flexDirection: 'column'}}>

      <div {...getRootProps()}>
      <input {...getInputProps()} />
        <Card sx={{ minWidth: 275 , marginTop:"50px" ,
      background: 'rgba( 177, 94, 241, 0.25 )',
      boxShadow:' 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      backdropFilter:' blur( 4px )',
      WebkitBackdropFilter: 'blur( 4px )',
      borderRadius:' 10px',
      border: '1px solid rgba( 255, 255, 255, 0.18 )'}}>
        <CardContent>
        <Typography sx={{ fontSize: 18 , marginLeft:"80px" }} color="text.secondary" gutterBottom variant="h5">
          <CloudUploadIcon sx={{marginLeft:"90px"}}></CloudUploadIcon>
          <br/>
          Incarca o factura aici
        </Typography>
        
      </CardContent>
    </Card>

      </div>
      <Button variant="contained" color="secondary">Incarca</Button>
      {selected_file}
       
      
      </Box>
      <div className="extractedData" style={{flexDirection: 'column',
      display:'flex',
      marginTop:'50px',
      marginLeft:'50px',}}>
        <div className="furnizor" style={{flexDirection: 'row',}}>
      <label>Numele furnizorului</label>
      <input type="text" name="numeFurnz"></input>
      </div>

       
       <div className="total" style={{flexDirection:'row',}}>
      <label>Total de plata</label>
      <input type="text" name="totalPlata"></input>
      </div>

       
       <div className="dataSc" style={{flexDirection:'row',}}>
      <label>Data Scadenta</label>
      <input type="text" name="dataScadenta"></input>
      </div>


      </div>
    </Box>

    </Box>
    </>
)

}

export default AdaugaFacturi;