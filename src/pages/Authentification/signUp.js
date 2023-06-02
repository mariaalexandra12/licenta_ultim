import React from "react";
import { Chip } from "@mui/material";
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';

function SignUp(){
    return (
        <div>
             <Chip label="Sign Up" variant="outlined" icon={<SensorOccupiedIcon/>} color="secondary"/>
          
        </div>
    )
}


export default SignUp;