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
            width:"400px",
            height:"400px",
            color:"primary",
            padding:"10px",
            background: "rgba( 238, 93, 236, 0.3 )",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 20px )",
            webkitBackDropFilter: "blur( 20px )",
            borderRadius:"10px",
           border: "1px solid rgba( 255, 255, 255, 0.18 )"}} square="true">
           <Switch defaultChecked color="secondary" onChange={handleChange}
            checked={checked} inputProps={{'aria-label':"controlled"}}/>
            <br/>
            {checked ?(<LogIn/>):(<SignUp/>)}
            </Paper>
         </div>
    
    );
}

export default Auth