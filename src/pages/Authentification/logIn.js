import React, { useState } from "react";
import { Chip} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Stack from '@mui/material/Stack';
import Navig from "../../components/Navig";

function LogIn(){

    const [clicked , setClick]=useState();

  

    const ValidationTextField = styled(TextField)({
        '& input:valid + fieldset': {
          borderColor: '#E0E3E7',
          borderWidth: 1,
        },
        '& input:invalid + fieldset': {
          borderColor: 'red',
          borderWidth: 1,
        },
        '& input:valid:focus + fieldset': {
          borderLeftWidth: 4,
          padding: '4px !important',
        },
      });

    return (
        <div>
          <Chip label="Log In" variant="outlined"
           icon={<LockOpenIcon/>} color="secondary"
           style={{marginLeft: "150px", marginTop: "20px"}}
           />
          <br/>
          <ValidationTextField
            label="Email Adress"
            required
            variant="outlined"
            id="validation-outlined-input"
            style={{marginTop:"50px" , width:"75%"}}
            helperText="Please enter your email address"
          />
          <br/>
          <ValidationTextField
             label="Password"
             required
            variant="outlined"
            id="validation-outlined-input"
            style={{marginTop:"10px",width:"75%"}}
            helperText="Please enter your password"
           />

          <br/>

        <Stack>
        <Button color="secondary" variant="outlined"
        startIcon={<LoginOutlinedIcon/>}>Log In</Button>
         
        </Stack>  
      
    </div>
    )
}


export default LogIn;