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
               marginTop:"55px",
               width:"500px",
               height:'400px',
               color:"primary",
               padding:"10px",
               borderRadius:'100px',
               background: "rgba( 189, 16, 224,0.10)",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 8px )",
                WebkitBackdropFilter: "blur( 8px )",
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

               <form onSubmit={handleSubmit}>
                <TextField type='text' style={{
                    marginTop:'50px',
                }} fullWidth
                required
                placeholder='Adresa de email'
                value={email}
                onChange={e=>setEmail(e.target.value)}></TextField>

                <Button color="secondary" variant="contained" fullWidth
                 type='submit'
                 style={{marginTop:'10px'}}>Trimite mail</Button>
                 </form>

               <Link href="/" underline='hover' color="secondary"
               style={{marginLeft:'180px',}}
               >Inapoi la conectare</Link>
               
    </Paper>
     
     </div>


    )


}