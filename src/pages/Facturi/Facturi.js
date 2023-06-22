import React from 'react';
import './facturi.css';
import Box from '@mui/material/Box';
import Navig from "../../components/Navig";

const Facturi=()=>{
    return (
        <>
            <Box component={Navig} sx={{ display: 'flex' }}>
           <h1>Facturi</h1>
           </Box>
        </>
    )

}

export default Facturi