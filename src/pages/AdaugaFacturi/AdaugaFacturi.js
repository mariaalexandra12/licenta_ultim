import React,{ useState } from "react";
import "./uploader.css";
import { Box, Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Navig from "../../components/Navig";


function AdaugaFacturi(){
  const [file, setFile]=useState();


  return(    
    <>
    <Box sx={{display: 'flex'}}>
    <Navig/>
    <Box sx={{marginTop: '50px'}}>
      <Box sx={{marginLeft:'15px'}}>
      <h2>Incarca o factura</h2>
      <form>
       <input type="file" name="file" ></input>
       <Button varinat="outlined" color="secondary">Incarca</Button>
      </form>
      </Box>
    </Box>

    </Box>
    </>
)

}

export default AdaugaFacturi;