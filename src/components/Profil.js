import React from "react";
import { Box, Button, Divider, Typography } from '@mui/material';
import Navig from "./Navig";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:'rgba( 222, 102, 239, 0.25 )',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));
  
  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }  

const Profil=()=>{
    
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return (
        <>
        <Box sx={{display: 'flex'}}>
        <Navig/>
        <Box sx={{marginTop: '80px' , marginLeft: '80px'}}>
            <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
            <LinkTab label="Cont Personal" href="/contPers" />
            <LinkTab label="Cont Firma" href="/contFirma" />
            <LinkTab label="Page Three" href="/spam" />
             </Tabs>
            </Box>
           
        </Box>
    
        </Box>
        </>
    )
}

export default Profil