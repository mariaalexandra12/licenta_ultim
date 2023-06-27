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
import ContPers from "./contPers";
import ContFirma from "./contFirma";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

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
                    width:'1050px',
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
                width:'1050px',
              }}>
       
       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Cont Personal" {...a11yProps(0)} />
          <Tab label="Cont Firma" {...a11yProps(1)} />
          <Tab label="Setari Cont" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ContPers/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ContFirma/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>


              </Item>
              </Grid>
             
           </Grid>
           



        </Box>
    
        </Box>
        </>
    )
}

export default Profil