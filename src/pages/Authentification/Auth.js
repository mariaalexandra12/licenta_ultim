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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from "react-hook-form";

function Auth(){


    const [complete , setComplete]=useState(false);
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
    
  
    const { register,  handleSubmit , formState:{ errors }}=useForm()
    const onSubmit=(data)=>console.log(data)

    return (
      <div className="auth" >   
         <div className="container">
            <Paper elevation={24} style={{
               marginLeft:"350px",
               marginTop:"55px",
               width:"550px",
               height:'550px',
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
        <form onSubmit={handleSubmit(onSubmit)}>
           <Box
             sx={{
             marginTop: 8,
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
            }}>
           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
             <LockOutlinedIcon />
            </Avatar>
           <Typography component="h1" variant="h5">
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
              {...register("email",{required: "Required"})}>
            </TextField>
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Parola"
              type={visible ? "text":"password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: <EndAdornment/>,
              }}
              {...register("password",{required: "Required"})}>
              </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary">
              Intra in cont
            </Button>

            <Grid container style={{display:"flex",
            flexDirection:"column",
            marginLeft:'90px'
          }}>
              <Grid item xs>
                <Link href="/forget" color="secondary" underline="hover">
                  Ai uitat parola?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" color="secondary" underline="hover">
                  {"Nu ai un cont?Creeaza-ti unul!"}
                </Link>
              </Grid>

              <Grid item xs>
                <Link href="/reset" color="secondary" underline="hover">
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