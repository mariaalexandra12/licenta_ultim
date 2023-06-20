import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import SignUp from './signUp';
import LogIn from './logIn';
import './auth.css';

function Auth(){

    const [checked, setChecked] = useState(true);

     const handleChange = (event) => {
    setChecked(event.target.checked);
    };


    
    return (
        <div className="auth">   
          <Paper elevation={24} style={{
            marginLeft:"400px",
            marginTop:"50px",
            width:"50%",
            height:"50%",
            color:"primary",
            padding:"10px",
            background: "rgba( 189, 16, 224,0.10)",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 0px )",
            WebkitBackdropFilter: "blur( 0px )",
             borderRadius:" 10px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",}} square="true">
           <Switch defaultChecked color="secondary" onChange={handleChange}
            checked={checked} inputProps={{'aria-label':"controlled"}}/>
            <br/>
            {checked ?(<LogIn/>):(<SignUp/>)}
            </Paper>
         </div>
    
    );
}

export default Auth