import * as React from 'react';
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
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton , InputAdornment } from '@mui/material';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import './signUpPers.css';

export default function SignUpPers() {

  const [visible,setVisible] = useState();
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


  const [email , setEmail]=useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass]=useState('')
  const [ errors , setErrors] = useState([])
  const handleSubmit=(event)=>{
    const errors=validate();
    setErrors(errors);
    if(!errors.email && !errors.password){
      nav('/navig');
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
  };

  const indicator=document.querySelector('.indicator');
  const parolaFoarteSlaba=document.querySelector('.parolaFoarteSlaba');
  const parolaSlaba=document.querySelector('.parolaSlaba');
  const parolaPuternica=document.querySelector('.parolaPuternica');

  const handlePass=(e) => {
    setPassword(e.target.value);
   
 }


  return (
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" style={{fontSize:'20px'}}>
           Haide sa ne cunoastem! </Typography>
           <Typography style={{fontSize:'20px',justifyContent:'center'}}>Am nevoie de cateva informatii ca sa iti creez contul:
         </Typography> 
        
          <Box component="form" noValidate  sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            
              <Grid item xs={12} sm={6}>
              
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="Nume"
                  autoFocus
                  onChange={(e)=>setEmail(e.target.value)}></TextField>
            
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  fullWidth
                  id="lastName"
                  label="Prenume"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e)=>setEmail(e.target.value)}></TextField>
                
              </Grid>
              <Grid item xs={12}>

                <TextField
                required
                  fullWidth
                  id="email"
                  label="Adresa de email"
                  name="email"
                  autoComplete="email"
                  InputProps={{
                    endAdornment:<Icon/>,
                  }}
                  onChange={(e)=>setEmail(e.target.value)}></TextField>
                
              </Grid>


              <Grid item xs={12}>
               <div className="parola" style={{height: '100px'}}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Parola"
                  type={visible ? "text":"password"}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: <EndAdornment/>,
                  }}
                  onChange={handlePass}/>
                  <div class="indicator" >
                  <span class="parolaFoarteSlaba" ></span>
                  <span class="parolaSlaba" ></span>
                  <span class="parolaPuternica" ></span>
                  </div>
                  <div class="text" >Parola ta este foarte slaba.</div>
                  </div>
              </Grid>




              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirma Parola"
                  type={visible ? "text":"password"}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: <EndAdornment/>,
                  }}
                  onChange={(e)=>setConfirmPass(e.target.value)}/>
              </Grid>


            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
              onClick={()=>nav('/')}
            >
              Intra in cont
            </Button>

            </form>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/" color="secondary" underline='hover'>
                  Ai deja un cont? Intra in cont!
                </Link>
                <p style={{fontSize:'15px',opacity:'0.6'}}
                >Doar campurile marcate cu * sunt obligatorii</p>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

    </Paper>
  );
}