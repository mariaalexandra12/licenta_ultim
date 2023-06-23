import React from 'react';
import Paper from '@mui/material/Paper';
import LockResetIcon from '@mui/icons-material/LockReset';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function ResetPass(){

    const nav=useNavigate();
    return (
     <>
     
     <Paper elevation={24} style={{
               marginLeft:"350px",
               marginTop:"55px",
               width:"500px",
               height:'500px',
               color:"primary",
               padding:"10px",
               background: "rgba( 189, 16, 224,0.10)",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 0px )",
                WebkitBackdropFilter: "blur( 0px )",
                borderRadius:" 10px",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",}} square="true">

                     <Box
                       component="form"
                        sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                       }}
                       noValidate
                      autoComplete="off"
                         >
        <LockResetIcon sx={{
            width:'50px',
            height:'50px',
            
            }}></LockResetIcon>        
        <Typography variant="h5" sx={{marginLeft:'100px'}}>Probleme la conectare?</Typography>   
        <Box style={{display:'flex',flexDirection:'column'}}>    
      <TextField id="outlined-basic" label="Parola noua" variant="outlined" sx={{marginTop:'10px'}}></TextField>
      <TextField id="outlined-basic" label="Confirma noua parola " variant="outlined" sx={{marginTop:'20px'}}></TextField>
      </Box>     
     
        
        
      <Button variant="contained" color="secondary" onClick={()=>nav('/')}
      style={{
        marginTop:'100px',
        width:'100%',
        }}>Inapoi la conectare</Button>
    </Box>


                </Paper>
     
     </>


    )


}