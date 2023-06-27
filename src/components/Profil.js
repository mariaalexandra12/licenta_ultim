import React from "react";
import { Box, Button } from '@mui/material';
import Navig from "./Navig";

const Profil=()=>{
    
    return (
        <>
        <Box sx={{display: 'flex'}}>
        <Navig/>
        <Box sx={{marginTop: '80px'}}>
          <h1>Profil</h1>
        </Box>
    
        </Box>
        </>
    )
}

export default Profil