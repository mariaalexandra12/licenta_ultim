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

function LogIn(){

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };


    return (
        <div>
          <Chip label="Log In" variant="outlined"
           icon={<LockOpenIcon/>} color="secondary"
           style={{marginLeft: "150px", marginTop: "20px"}}
           />
          <br/>
          <TextField
          id="filled-error-helper-text"
          label="Email Adress"
          helperText="Please enter your Email Adress."
          variant="filled"
          color="secondary"
          error
          style={{marginTop:30, width:"75%"}}
        />
          <br/>
          <FormControl sx={{marginTop:2,marginBottom:5, width: '75%' }} variant="filled" >
          <InputLabel htmlFor="filled-adornment-password"
          color="secondary" form>Password</InputLabel>
          <FilledInput
            id="filled-adornment-password" 
            type={showPassword ? 'text' : 'password'}
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
        startIcon={<LoginOutlinedIcon/>}>Log In</Button>     
        </Stack>  
      
    </div>
    )
}


export default LogIn;