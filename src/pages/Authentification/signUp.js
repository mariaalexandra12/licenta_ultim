import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function SignUp() {
  const nav=useNavigate();

  return (
    <div className="signUp">
    <Paper elevation={24} style={{
      marginLeft:"500px",
      marginTop:'30px',
      width:"350px",
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
      <Box style={{display:"flex",flexDirection:"column"}}>
        <h3>Alege ce fel de cont vrei sa creezi</h3>
        <Button variant="contained"  onClick={()=>nav('/signUpFirma')} 
        style={{
          marginTop:'20px',
          width:'175px',
          height:'75px'}}>Creeaza un cont al firmei</Button>
        <Button  variant="contained"  onClick={()=>nav('/sPers')}
          style={{
            marginTop:'25px',
            width:'250px',
            height:'75px'}}
        >Creeaza un cont personal si configureaza datele firmei pe parcurs</Button>
        <Link href="/" underline="hover" style={{color:'#283593'}}>{'Inapoi la conectare'}</Link>
      </Box>
    </Paper>
    </div>
  );
}