import React from 'react';
import Box from '@mui/material/Box'
import { Paper } from '@mui/material';
import './dashboard.css'
import Navig from '../../components/Navig';

const Dashboard=()=>{
    return (
        <div style={{display:'flex',}}>
           <Navig/>
           <Paper className="paperDash" elevation={24} sx={{width:'1250px',
            height:'250px' ,marginTop:'20px',marginLeft:'20px',
            borderRadius:'50px'}}></Paper>
        </div>
    )

}

export default Dashboard