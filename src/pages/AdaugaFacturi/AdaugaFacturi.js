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
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';


import TextField from '@mui/material/TextField';

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
     
      {selected_file}
       
    </Box>
    </Box>

    <Box component="form" noValidate sx={{ 
      mt: 1 ,
      marginTop:'100px',
      marginLeft:'200px',
      width:'400px',
     }}>
      
      <Tooltip title="Extrage datele facturii">
        <IconButton  style={{
        marginLeft:'140px',
        width:'90px',
        height:'90px',
      }}
      onClick={()=>console.log('buna')}
      >
      <DocumentScannerIcon color="secondary" style={{
        width:'70px',
        height:'70px',
      }}>
      </DocumentScannerIcon>
      </IconButton>
      </Tooltip>
            <TextField
              margin="normal"
              fullWidth
              id="numeFurnizor"
              label="Numele Furnizorului"
              name="numeFurnizor"
              autoComplete="email"
              autoFocus
              color='secondary'
               ></TextField>
           

            <TextField
              margin="normal"
              fullWidth
              name="totalPlata"
              label="Total de Plata"
              type="text"
              id="totalPlata"
              color='secondary'
             ></TextField>

              <TextField
              margin="normal"
              fullWidth
              name="dataSc"
              label="Data Sacdenta"
              type="text"
              id="dataSc"
              color='secondary'></TextField>


              <Button
              fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="secondary">
            Inregistreaza datele facturii 
          </Button>

        </Box>

    </Box>
    </>
)

}

export default AdaugaFacturi;