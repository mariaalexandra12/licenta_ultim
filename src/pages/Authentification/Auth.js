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
        <div className="auth">   
          <Paper elevation={24} style={{
            marginLeft:"400px",
            marginTop:"50px",
            width:"450px",
            height:"450px",
            color:"primary",
            padding:"10px",
            background: "rgba(218, 185, 241, 0.57)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backDropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(121, 160, 241, 1)"}} square="true">
           <Switch defaultChecked color="secondary" onChange={handleChange}
            checked={checked} inputProps={{'aria-label':"controlled"}}/>
            <br/>
            {checked ?(<LogIn/>):(<SignUp/>)}
            </Paper>
         </div>
    
    );
}

export default Auth