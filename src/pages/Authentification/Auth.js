import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import SignUp from './signUp';
import LogIn from './logIn';

function Auth(){

    const [checked, setChecked] = useState(true);

     const handleChange = (event) => {
    setChecked(event.target.checked);
    };
    
    return (
        <div id='elements'>
          <Paper elevation={24} style={{
            marginLeft:"400px",
            marginTop:"50px",
            width:"400px",
            height:"400px",
            color:"primary",
            padding:"10px"}} square="true">

            
            <br/>
           {checked ?(<LogIn/>):(<SignUp/>)}
           <Switch defaultChecked color="secondary" onChange={handleChange}
            checked={checked} inputProps={"controlled"}/>
            </Paper>
        </div>
    );
}

export default Auth