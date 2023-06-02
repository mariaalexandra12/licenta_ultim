import React, { useState } from "react";
import { Chip} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Stack from '@mui/material/Stack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



function LogIn(){

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
   
    const [emailError,setEmailError]=useState();
    const [passwordError,setPasswordError]=useState();

    const handleEmail=()=>{
        if(!email)
        {
            setEmailError(true);
           
            return;
        }

    if(!email.endsWith("@gmail.com")){
        setEmailError(true);
        return;
    }

    setEmailError(false);
}

    const handlePass=()=>{
    if(!password || password.length < 8 || password.length > 12){
        setPasswordError(true);
        return;
    }
    setPasswordError(false);
    }

    
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(emailError || password){
           
        }
  }

    return (
        <div>
          <Chip label="Log In" variant="outlined"
           icon={<LockOpenIcon/>} color="secondary"
           style={{marginLeft: "150px", marginTop: "20px"}}
           />
          <br/>
          <p>
          <TextField
          id="filled-error-helper-text"
          label="Email Adress"
          helperText="Please enter your Email Adress."
          variant="filled"
          color="secondary"
          style={{marginTop:30,width:"80%"}}
          value={email}
          onChange={(event) =>setEmail(event.target.value)}
          error={emailError}
          onBlur={handleEmail}
        />
        </p>
          <FormControl sx={{marginBottom:5,width:"80%"}} variant="filled" 
          >
          <InputLabel htmlFor="filled-adornment-password"
          color="secondary" form>Password</InputLabel>
          <FilledInput
            id="filled-adornment-password" 
            type={showPassword ? 'text' : 'password'}
            value={password}
            error={passwordError}
            onBlur={handlePass}
          onChange={(event) =>setPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
              />
              </FormControl>

          <br/>


        <Stack>

        <Button color="secondary" variant="outlined"
        startIcon={<LoginOutlinedIcon/>} style={{width:"80%"}}
        onClick={handleSubmit}>Log In</Button> 

        </Stack>  
      
    </div>
    )
}


export default LogIn;