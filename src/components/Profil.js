import React,{ useState,useEffect,useRef } from "react";
import { Box, Button, Divider, Icon, IconButton, Typography } from '@mui/material';
import Navig from "./Navig";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import EmailIcon from '@mui/icons-material/Email';
import TextField from '@mui/material/TextField';
import { useUserAuth} from "../context/userAuthContext";
import HttpsIcon from '@mui/icons-material/Https';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { db } from "../firebaseUtils/firebase_ut";
import { collection, query, where, getDocs,onSnapshot, QuerySnapshot} from "firebase/firestore";
import ContPers from "./contPers";
import ContFirma from "./contFirma";



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));





const Profil=()=>{

  const [existaPers,setExistaPers]=useState(false)
  const { currentUser }=useUserAuth();

  useEffect(()=>{

    const q=query(collection(db,'utilizator'),where('emailUtilizator','==',currentUser));
    onSnapshot(q,(snapshot)=>{
      snapshot.forEach((doc)=>{
        if(doc.exists()){
          setExistaPers(true);
        }
      })
    })

  },[existaPers])
    

    return (
        <>
        <Box sx={{display: 'flex'}}>
        <Navig/>
        <Box sx={{  marginTop:'80px',
      marginLeft:'20px',}}>
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
                    background: 'rgba( 186, 152, 224, 0.7 )',
                    boxShadow:'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', 
                    backdropFilter:' blur( 11px )',
                    WebkitBackdropFilter:' blur( 11px )',
                    borderRadius:' 10px',
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                }}>
                    <Typography style={{fontSize:'35px'}}>Profil</Typography>
                    <IconButton style={{marginLeft:'450px',}}><PersonPinIcon/></IconButton>
                </Item>
                </Grid>
              
              </Grid>

              {/* <Grid item >
              <Item style={{
                marginTop:'50px',
                width:'1000px',
                height:'400px',
                background: 'rgba( 186, 152, 224, 0.7 )',
                boxShadow:'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', 
                backdropFilter:' blur( 11px )',
                WebkitBackdropFilter:' blur( 11px )',
                borderRadius:' 10px',
                border: '1px solid rgba( 255, 255, 255, 0.18 )',
              }}>
              </Item>
              </Grid> */}

           {
            existaPers.valueOf() === true ? 
             <ContPers/>
             :
             <ContFirma/>
           }
             
           </Grid>
           
        </Box>
    
        </Box>
        </>
    )
}

export default Profil