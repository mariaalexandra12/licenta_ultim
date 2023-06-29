import React from 'react';
import { useNavigate } from "react-router-dom";
import './facturi.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Navig from '../../components/Navig';


const Facturi=()=>{

    const nav=useNavigate();
    return (
        <>
        <Box sx={{display: 'flex'}}>
        <Navig/>
        <Box sx={{marginTop: '80px'}}>
        <h2>Vizualizare istoric facturi</h2>
        


      <Button onClick={()=>{nav('/adaugaFacturi')}} color="secondary" 
       sx={{marginTop:'30px'}}>Adauga facturi</Button>
        
        
        </Box>
    </Box>
      
        </>
    )

}

export default Facturi