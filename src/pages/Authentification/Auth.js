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
import { useUserAuth } from './context/UserAuthContext';

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
    const  { signUp } =useUserAuth();
    const [alerta,setAlerta]=useState('');
    const handleSubmit= async (event)=>{
      const errors=validate();
      setErrors(errors);
      try{
        await signUp(email,password);
         if(!errors.email && !errors.password){
        nav('/navig');
      }}catch(err){
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
            <Paper elevation={24} style={{
               marginLeft:"400px",
               marginTop:'30px',
               width:"550px",
               height:'580px',
               color:"primary",
               padding:"10px",
               background: "rgba( 21, 19, 19, 0.25 )",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 8px )",
                WebkitBackdropFilter: "blur( 8px )",
                borderRadius:" 10px",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
                display:"flex",
                flexDirection:"center",
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
           <Avatar sx={{ m: 1,bgcolor:'secondary.main' }}>
             <LockOutlinedIcon />
            </Avatar>
           <Typography component="h1" variant="h5" color="white">
            Sign in
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
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
              onClick={handleSubmit}
          >
              Intra in cont
            </Button>

            <Grid container style={{display:"flex",
            flexDirection:"column",
            marginLeft:'90px'
          }}>
              <Grid item xs>
                <Link href="/forget" color="white" underline="hover">
                  Ai uitat parola?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" color="white" underline="hover">
                  {"Nu ai un cont?Creeaza-ti unul!"}
                </Link>
              </Grid>

              <Grid item xs>
                <Link href="/reset"  color="white" underline="hover">
                  Reseteaza parola
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
    
    );
}

export default Auth