import React,{ useState } from 'react';
import Paper from '@mui/material/Paper';
import { TextField, Typography,Button } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import {  useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { sendPasswordResetEmail,getAuth } from 'firebase/auth';
import { useUserAuth } from '../../context/userAuthContext';


export default function Pass(){

    const [email,setEmail]=useState('');

    const { currentUser }=useUserAuth();

    const handleSubmit =  (e) =>{
        e.preventDefault();
        sendPasswordResetEmail(email)
        .then(response=>{
            console.log(response);
        }).catch(e=>console.log(e.message));
    }

    return (
     <div>
     
     <Paper elevation={24} style={{
               marginLeft:"450px",
               marginTop:'30px',
               width:"450px",
               height:'400px',
               padding:"10px",
               borderRadius:'30px',
               backgroundColor:'#E3F2FD',
               boxShadow:'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', 
               backdropFilter:' blur( 11px )',
               WebkitBackdropFilter:' blur( 11px )',
               border: '1px solid rgba( 255, 255, 255, 0.18 )',
                display:"flex",
                flexDirection:"column",}} square="true">
                <ReceiptIcon sx={{fontSize:70,
                 marginLeft:'175px',
                 marginTop:'40px',
                }} color='#283593' />
                <Typography variant='h6' style={{marginTop:'40px',
                 textAlign:'center'}}>Introdu aici adresa de email
                    si iti vom trimite un mail 
                    pentru resetarea parolei.
                </Typography>

               <form onSubmit={handleSubmit}>
                <TextField type='text' style={{
                    marginTop:'20px',
                }} fullWidth
                required
                placeholder='Adresa de email'
                value={email}
                onChange={e=>setEmail(e.target.value)}></TextField>

                <Button variant="contained" fullWidth
                 type='submit'
                 style={{marginTop:'10px',bgcolor:'#283593'}}>Trimite mail</Button>
                 </form>

               <Link href="/" underline='hover' 
               style={{marginLeft:'180px',color:'#283593',}}
               >Inapoi la conectare</Link>
               
    </Paper>
     
     </div>


    )


}