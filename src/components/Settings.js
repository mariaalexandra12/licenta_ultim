import React from 'react';
import Box from '@mui/material/Box'
import Navig from './Navig';

const Settings=()=>{
   return (
    
      <>
        <Box sx={{display: 'flex'}}>
        <Navig/>
        <Box sx={{marginTop: '80px'}}>
          <h1 >Settings</h1>
        </Box>
    
        </Box>
        </>
   
   )
}

export default Settings