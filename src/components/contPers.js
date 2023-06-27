import React from 'react';
import Navig from './Navig';
import { Box } from '@mui/material';
import Profil from './Profil';

const ContPers=()=>{
  return (
    <>
    <Box sx={{display: 'flex'}}>
    <Profil/>
    <Box sx={{marginTop: '80px'}}>
      <h1>Cont pers</h1>
    </Box>

    </Box>
    </>
  )

}

export default ContPers;