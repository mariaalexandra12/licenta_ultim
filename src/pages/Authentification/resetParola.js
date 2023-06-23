import React,{ useState } from 'react';
import Paper from '@mui/material/Paper';
import LockResetIcon from '@mui/icons-material/LockReset';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton , InputAdornment } from '@mui/material';

export default function ResetPass(){

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
     <>
     
     <Paper elevation={24} style={{
               marginLeft:"350px",
               marginTop:"55px",
               width:"450px",
               height:'450px',
               color:"primary",
               padding:"10px",
               background: "rgba( 189, 16, 224,0.10)",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 0px )",
                WebkitBackdropFilter: "blur( 0px )",
                borderRadius:" 10px",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",}} square="true">

                     <Box
                       component="form"
                        sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                       }}
                       noValidate
                      autoComplete="off"
                         >
        <LockResetIcon sx={{
            width:'50px',
            height:'50px',
            
            }}></LockResetIcon>        
        <Typography variant="h5" sx={{marginLeft:'100px'}}>Probleme la conectare?</Typography>   
        <Box style={{display:'flex',flexDirection:'column'}}>    

      <TextField id="outlined-basic" 
      label="Parola noua"
       variant="outlined" 
       sx={{marginTop:'10px'}}
       type={visible ? "text":"password"}
       InputProps={{
        endAdornment: <EndAdornment/>,
      }}
       ></TextField>

      <TextField id="outlined-basic"
       label="Confirma noua parola " 
       variant="outlined" 
       sx={{marginTop:'20px'}}
       type={visible ? "text":"password"}
       InputProps={{
        endAdornment: <EndAdornment/>,
      }}
       ></TextField>
      </Box>     
     
        
        
      <Button variant="contained" color="secondary" onClick={()=>nav('/')}
      style={{
        marginTop:'100px',
        width:'75%',
        }}>Inapoi la conectare</Button>
    </Box>


                </Paper>
     
     </>


    )


}