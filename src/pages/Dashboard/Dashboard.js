import React from 'react';
import Box from '@mui/material/Box'
import { Paper } from '@mui/material';
import './dashboard.css'

const Dashboard=()=>{
    return (
        <>
        <Paper className="paperDash" elevation={24} sx={{width:'1250px',
        height:'250px' ,marginTop:'20px',marginLeft:'20px',
        borderRadius:'50px'}}></Paper>
        </>
    )

}

export default Dashboard