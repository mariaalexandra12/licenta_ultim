import React from 'react';
import './facturi.css';
import Box from '@mui/material/Box';
import Navig from "../../components/Navig";

const Facturi=()=>{
    return (
        <>
        <Box sx={{display: 'flex'}}>
        <Navig/>
        <Box sx={{marginTop: '80px'}}>
          <h1>Facturi</h1>
        </Box>
    
        </Box>
        </>
    )

}

export default Facturi