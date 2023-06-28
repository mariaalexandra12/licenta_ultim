import React from 'react';
import Paper from '@mui/material/Paper';
import { TextField, Typography } from '@mui/material';
import { Button } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import {  useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

export default function Pass(){
    return (
     <div>
     
     <Paper elevation={24} style={{
               marginLeft:"350px",
               marginTop:"55px",
               width:"500px",
               height:'569px',
               color:"primary",
               padding:"10px",
               background: "rgba( 189, 16, 224,0.10)",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 0px )",
                WebkitBackdropFilter: "blur( 0px )",
                borderRadius:" 10px",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",}} square="true">
                <ReceiptIcon sx={{fontSize:70,
                 marginLeft:'200px',
                 marginTop:'40px'
                }} color='secondary'/>
                <Typography style={{marginTop:'40px',
                 textAlign:'center'}}>Introdu aici adresa de email
                    si iti vom trimite un mail 
                    pentru resetarea parolei.
                </Typography>

                <TextField type='text' style={{
                    marginTop:'50px',
                }} fullWidth
                placeholder='Adresa de email'
                ></TextField>

                <Button color="secondary" variant="contained" fullWidth
                 style={{marginTop:'10px'}}
                >Trimite mail</Button>

               <Link href="/" underline='hover' color="secondary"
               style={{marginLeft:'180px',}}
               >Inapoi la conectare</Link>
               
    </Paper>
     
     </div>


    )


}