import React from "react";
import { Box, Button, Divider, Icon, IconButton, Typography } from '@mui/material';
import Navig from "./Navig";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { alignProperty } from "@mui/material/styles/cssUtils";
import EmailIcon from '@mui/icons-material/Email';
import TextField from '@mui/material/TextField';
import { useUserAuth } from "../context/userAuthContext";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Profil=()=>{

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

   const { currentUser }= useUserAuth()


    return (
        <>
        <Box sx={{display: 'flex'}}>
        <Navig/>
        <Box sx={{marginTop: '80px' , marginLeft: '80px'}}>
        <Grid
         container
           direction="column"
            justifyContent="center"
           alignItems="center">
              <Grid container  direction="rows" xs>
                <Grid item>
                <Item style={{
                    width:'1000px',
                    display:'flex',
                    flexDirection:'row',
                }}>
                    <Typography style={{fontSize:'35px'}}>Profil</Typography>
                    <IconButton style={{marginLeft:'450px',}}><PersonPinIcon/></IconButton>
                </Item>
                </Grid>
              
              </Grid>

              <Grid item >
              <Item style={{
                marginTop:'50px',
                width:'1000px',
                height:'550px',
              }}>
       
       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} >
          <Tab label="Cont Personal"/>
          <Tab label="Cont Firma"  />
          <Tab label="Setari Cont"  />
        </Tabs>
      </Box>
      {value===0 &&(
        <>
          {/* <Box sx={{marginTop: '80px'}}>
             <h1>Cont personal</h1>
          </Box> */}
           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" 
              label="Adresa de email" 
              variant="standard" 
              />
           </Box>

            <Typography>The current User is : {currentUser}</Typography>
           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" label="Parola" 
              variant="standard" 
            
              />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" label="With sx" variant="standard" />
           </Box>
        </>
      )}

       {value===1 &&(
        <>
          <Box sx={{marginTop: '80px'}}>
             <h1>Cont firma</h1>
          </Box>
        </>
      )}  

       {value===2 &&(
        <>
          <Box sx={{marginTop: '80px'}}>
             <h1>settings</h1>
          </Box>
        </>
      )}     
      
              </Item>
              </Grid>
             
           </Grid>
           



        </Box>
    
        </Box>
        </>
    )
}

export default Profil