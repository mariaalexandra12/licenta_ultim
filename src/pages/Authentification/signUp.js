import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';



export default function SignUp() {
  

  const nav=useNavigate();


  return (
    <>
    <Paper elevation={24} style={{
      marginLeft:"350px",
      marginTop:"55px",
      width:"50%",
      height:'full',
      color:"primary",
      padding:"10px",
      background: "rgba( 189, 16, 224,0.10)",
       boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
       backdropFilter: "blur( 0px )",
       WebkitBackdropFilter: "blur( 0px )",
       borderRadius:" 10px",
       border: "1px solid rgba( 255, 255, 255, 0.18 )",}} square="true">
      <Button variant="contained" color="secondary" onclick={()=>nav('/sPers')}>Creeaza un cont personal si configureaza datele firmei pe parcurs!</Button>
      <Button variant="contained" color="secondary" onClick={()=>nav('/signUpFirma')} style={{marginTop:'25px'}}>Creeaza un cont al firmei!</Button>
    </Paper>
    </>
  );
}