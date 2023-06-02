import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Switch from '@mui/material/Switch';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

function Auth(){

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
          padding: '4px !important', // override inline-style
        },
      });

    const [checked, setChecked] = useState(true);

     const handleChange = (event) => {
    setChecked(event.target.checked);
    };
    
    return (
        <div id='elements'>
          <Paper elevation={24} style={{
            marginLeft:"400px",
            marginTop:"50px",
            width:"150px",
            color:"primary",
            padding:"10px"}} square="true">
           {checked ?(
            <Chip label="Log In" variant="outlined" icon={<LockOpenIcon/>} color="secondary"/>

            )
             
            :(<Chip label="Sign Up" variant="outlined" icon={<SensorOccupiedIcon/>} color="secondary"/> )}
            <br/>
            <Switch defaultChecked color="secondary" onChange={handleChange}/>
          
            </Paper>
        </div>
    );
}

export default Auth