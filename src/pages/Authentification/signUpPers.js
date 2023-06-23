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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton , InputAdornment } from '@mui/material';
import { useState } from 'react';



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
    <ThemeProvider>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Creeaza un cont
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nume"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Prenume"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresa de email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
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
                />
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
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
              onClick={()=>nav('/navig')}
            >
              Intra in cont
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/" color="secondary" underline='hover'>
                  Ai deja un cont? Intra in cont!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </Paper>
  );
}