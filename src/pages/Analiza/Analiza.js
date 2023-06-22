import React from 'react';
import Navig from "../../components/Navig";
import { Box, Button } from '@mui/material';

const Analiza=()=>{
    return (
        <>
        <Box sx={{display: 'flex'}}>
        <Navig/>
        <Box sx={{marginTop: '80px'}}>
          <Button variant="contained" color="secondary" style={{marginTop: '50px'}}>Apasa aici</Button>
        </Box>
    
        </Box>
        </>
    )

}

export default Analiza