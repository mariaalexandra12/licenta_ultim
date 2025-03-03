import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate} from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton , InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Alert from '@mui/material/Alert';
import './auth.css';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


function Auth(){

    const [visible,setVisible] = useState(false);
  
    const nav=useNavigate();

    const EndAdornment = () =>{
      return <InputAdornment position='end'>
       <IconButton onClick={()=>{setVisible(!visible)}}>
         {visible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
       </IconButton> 
      </InputAdornment>
    }

    const Icon=()=>{
      return(
        <InputAdornment position='end'>
          <IconButton>
            <PersonIcon/>
          </IconButton>
        </InputAdornment>
      )
    }

    const [email , setEmail]=useState('');
    const [password, setPassword] = useState('');
    const [ errors , setErrors] = useState([]);
    const [alerta,setAlerta]=useState('');
    const [firebaseAuthError,setFirebaseAuthError] = useState('');
    const [open, setOpen] = React.useState(true);
    const auth=getAuth();

    const handleSubmit= async (event)=>{
      event.preventDefault();
      const errors=validate();
      setErrors(errors);
      try{
        
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
          const user=userCredential.user;
          if(!errors.email && !errors.password){
            nav('/dash');
        }}).catch((err)=>{
           setFirebaseAuthError(err.message);
        })
      }catch(err){
        setAlerta(err.message);
      }
      
    }

    const validate=()=>{
      const eroare = {};
      if(!email){
        eroare.email="Adresa de mail nu a fost introdusa.";
      }
      else if(!/(@gmail.com)/.test(email)){
           eroare.email="Adresa de mail nu are un format valid."
      }
      else{
        eroare.email='';
      }


      if(!password){
        eroare.password="Parola nu a fost introdusa.";
      }
      else if(password.length>15 || password.length<10){
           eroare.password="Parola trebuie sa contina intre 10-15 caractere."
      }
      else{
        eroare.password='';
      }
      return eroare;
    }

    return (
      <div className="auth" >   
         <div className="container">
          {firebaseAuthError && (
            <>
           <Collapse in={open}>
            <Alert severity='error' style={{
              width:'300px',
              marginTop:'10px',
              marginLeft:'800px',
              display:'hover',
            }}  
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}> 
                <CloseIcon fontSize="inherit"/>  
              </IconButton>}>{firebaseAuthError}</Alert>
              </Collapse>
              </>
          )}

          {alerta && (
            <>
            <Alert severity='error' style={{
              marginTop:'20px',
              marginLeft:'550px',
              width:'250px',
              
            }}>
              {alerta}
            </Alert>
            </>
          )}

        <div style={{display:'flex',}}>
          <Grid className="backInvoice" elevation={24} 
               sx={{
               width:"750px",
               height:'645px',
               padding:"10px",
               border: '1px solid rgba( 255, 255, 255, 0.18 )',
               flexDirection:"column",
              }} square="true">
              </Grid>
                
                

            <Paper elevation={24} style={{
               marginLeft:"50px",
               marginTop:'30px',
               width:"450px",
               height:'580px',
               padding:"10px",
               borderRadius:'30px',
               backgroundColor:'#E3F2FD',
               boxShadow:'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', 
               backdropFilter:' blur( 11px )',
               WebkitBackdropFilter:' blur( 11px )',
               border: '1px solid rgba( 255, 255, 255, 0.18 )',
                display:"flex",
                flexDirection:"column",

              }} square="true"
                
                >
            
             <Container >
        <CssBaseline />
        <form onSubmit={handleSubmit}>
           <Box
             sx={{
             marginTop: 8,
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
            }}>
           <Avatar sx={{ m: 1,bgcolor:'#283593' }}>
             <LockOutlinedIcon />
            </Avatar>
           <Typography component="h1" variant="h5" color='#283593' >
            Conectează-te
          </Typography>


          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresa de email"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                endAdornment:<Icon/>,
              }}
              color='primary'
                 onChange={(e)=>setEmail(e.target.value)}>
            </TextField>
            {errors.email && (
              <div>
              <Alert severity="error">
                {errors.email}
              </Alert>
              </div>
             )}

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Parola"
              type={visible ? "text":"password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: <EndAdornment/>,
              }}
              color='primary'
              onChange={(e)=>setPassword(e.target.value)}
              >
              </TextField>
              {errors.password && (
              <div>
              <Alert severity="error">
                {errors.password}
              </Alert>
              </div>
             )}


            <Button
            
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,bgcolor:'#283593' }}
              onClick={handleSubmit}
          >
              Intra in cont
            </Button>

            <Grid container style={{display:"flex",
            flexDirection:"column",
            marginLeft:'90px'
          }}>
              {/* <Grid item xs>
                <Link href="/forget" color='#283593' underline="hover">
                  Ai uitat parola?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signUp" color='#283593' underline="hover" >
                  {"Nu ai un cont?Creeaza-ti unul!"}
                </Link>
              </Grid>

             
             </Grid>
            </Box>
          </Box>
          </form>
      </Container>
        </Paper>
        </div>
        </div>
     </div>
    
    );
}

export default Auth