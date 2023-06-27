import React from 'react';
import Navig from './Navig';
import { Box } from '@mui/material';
import Profil from './Profil';

const ContFirma=()=>{
  return (
    <>
    <Box sx={{display: 'flex'}}>
    <Profil/>
    <Box sx={{marginTop: '80px'}}>
      <h1>Cont firma</h1>
    </Box>

    </Box>
    </>
  )

}

export default ContFirma;