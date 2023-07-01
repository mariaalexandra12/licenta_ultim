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


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



const ContPers=()=>{
   
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 const { currentUser }= useUserAuth()
 const [ pass , setPass]=useState('');
 const [name, setName]=useState('');
 const [prename, setPrename]=useState('');

 useEffect(() => {

    const q2 = query(collection(db, "utilizator"),where('emailUtilizator','==',currentUser));
    onSnapshot(q2,(snapshot)=>{
     let idU;
   let userData=[];
   snapshot.docs.forEach((doc)=>{
     if(doc.data()){
       userData.push({...doc.data(), id:doc.id});
       idU=doc.id;
       localStorage.setItem(doc.id, JSON.stringify(doc.data()));
       // localStorage.setItem()
     }
       })
  
   
    const dateUser=localStorage.getItem(idU);     
    const prenameRegex=/(prenume:)\s*(")[a-zA-Z]*/gmi;
    const prenameMatch=dateUser.match(prenameRegex);
    const prename=prenameMatch && prenameMatch[0] ? prenameMatch[0] : '';
    console.log(prename);
    
    const nameRegex=/(prenume:)\s*(")[a-zA-Z]*/gmi;
    const nameMatch=dateUser.match(nameRegex);
    const name=nameMatch && nameMatch[0] ? nameMatch[0] : '';
    console.log(name);

    const parolaRegex=/(prenume:)\s*(")[a-zA-Z]*/gmi;
    const parolaMatch=dateUser.match(parolaRegex);
    const parola=parolaMatch && parolaMatch[0] ? parolaMatch[0] : '';
    console.log(parola);

         })

    },[currentUser]) 


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

              <Grid item >
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
        
        
       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} textColor="secondary" >
          <Tab label="Cont Personal" />
          <Tab label="Cont Firma"  />
        </Tabs>
      </Box>

      { value===0 &&(
        <>
          {/* CONT PERSONAL  */}
          {/**/}
           <Box  sx={{ display: 'flex', alignItems: 'flex-end',}}  >
              <Typography >Adresa de Email</Typography>
              <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.2,marginLeft:'30px' }} />
              <TextField id="adresaEmail" 
              type='text'
              variant="standard" 
              defaultValue={currentUser}
              style={{
                width:'300px',
                marginTop: '30px'
              }}
              />
           </Box>

             
           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography >Parola Cont</Typography>
              <HttpsIcon sx={{ color: 'action.active', mr: 1, my: 0.2,marginLeft:'60px' }} />
              <TextField id="input-with-sx" 
              type="text"
              variant="standard" 
              style={{
                width:'300px',
              }}
              defaultValue={pass}
              />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography >Nume Utilizator</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1,  my: 0.2,marginLeft:'33px' }} />
              <TextField id="input-with-sx" variant="standard" 
               type="text"
               defaultValue={name}
               style={{
                width:'300px',
              }}/>
           </Box>

           
           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography >Prenume Utilizator</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.2,marginLeft:'10px' }} />
              <TextField id="input-with-sx"  variant="standard"
              type="text"
              defaultValue={prename}
               style={{
                width:'300px',
              }} />
           </Box>
        </>
      )}

       {value===1 &&(
        <>
          {/* CONT FIRMA */}
           <Box sx={{ display: 'flex', alignItems: 'flex-end',}}>
           <Typography >Adresa de email Firma</Typography>
              <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="adresaEmail" 
              type='text'
              variant="standard" 
              style={{
                width:'300px',
                marginTop: '30px',
                
              }}
              />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography >Parola Cont Firma</Typography>
              <HttpsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" 
              type="text"
              variant="standard" 
              style={{
                width:'300px',
              }}
              />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography >Denumire Firma</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" variant="standard" 
               type="text"
               style={{
                width:'300px',
              }}/>
           </Box>

           
           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography >Cod Inregistrare Fiscala</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx"  variant="standard"
              type="text"
               style={{
                width:'300px',
              }} />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography>Judet</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx"  variant="standard"
              type="text"
               style={{
                width:'300px',
              }} />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography >Localitate</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx"  variant="standard"
              type="text"
               style={{
                width:'300px',
              }} />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography >Platitor TVA</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx"  variant="standard"
              type="text"
               style={{
                width:'300px',
              }} />
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
export default ContPers