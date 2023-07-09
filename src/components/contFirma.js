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
import BusinessIcon from '@mui/icons-material/Business';
import SourceIcon from '@mui/icons-material/Source';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const ContFirma=()=>{


    const [cif,setCIF]=useState('');
  const [denumire,setDenumire]=useState('');
  const[judet,setJudet]=useState('');
  const[local,setLocal]=useState('');
  const [parolaFirma,setParolaFirma]=useState('');
  const [platitor,setPlatitor]=useState('');
  const [adresaFirma,setAdresaFirma]=useState('');



  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 const { currentUser }= useUserAuth()

 const [dateFirma,setDateFirma]=useState([]);

 const [load,setLoad]=useState(true);
 

 useEffect(()=>{
    const q2 = query(collection(db, "firma"),where("emailFirma","==",currentUser));
    const unsub=onSnapshot(q2,(snapshot) => {
        const items=[];
        snapshot.forEach((doc)=>{
            items.push(doc.data());
        });
        setDateFirma(items);
        setLoad(false);
    })
    return ()=>{
        unsub();
    }
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
                background: 'rgba( 189, 16, 224, 0.25 )',
                boxShadow:'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
                backdropFilter: 'blur( 4px )',
                WebkitBackdropFilter:' blur( 4px )',
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
      <Tab label="Cont Firma"  />
      <Tab label="Setari Cont"></Tab>
    </Tabs>
  </Box>

  


   {value===0 && dateFirma.map((firma)=>(
   
        <>
       <Box sx={{ display: 'flex', alignItems: 'flex-end',}}>
       <Typography >Adresa de email Firma</Typography>
          <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5, 
           marginLeft:'14px'}} />
          <TextField id="adresaEmail" 
          type='text'
          variant="standard" 
          value={currentUser}
          style={{
            width:'300px',
            marginTop: '30px', 
          }}
          />
       </Box>

       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Typography >Parola Cont Firma</Typography>
          <HttpsIcon sx={{ color: 'action.active', mr: 1, my: 0.5,
          marginLeft:'45px' }} />
          <TextField id="parolaFirma" 
          type="text"
          variant="standard" 
          style={{
            width:'300px',
          }}
          value={firma['parolaFirma']}
          />
       </Box>

       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Typography >Denumire Firma</Typography>
          <BusinessIcon sx={{ color: 'action.active', mr: 1, my: 0.5 ,
           marginLeft:'58px'}} />
          <TextField id="denumire" variant="standard" 
           type="text"
           value={firma['nume']}
           style={{
            width:'300px',
          }}/>
       </Box>

       
       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Typography >Cod Inregistrare Fiscala</Typography>
          <SourceIcon sx={{ color: 'action.active', mr: 1, my: 0.5 ,
        marginLeft:'3px'}} />
          <TextField id="cif"  variant="standard"
          type="text"
          value={firma['CIF']}
           style={{
            width:'300px',
          }} />
       </Box>

       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Typography>Judet</Typography>
          <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5,
          marginLeft:'130px' }} />
          <TextField id="judet"  variant="standard"
          type="text"
          value={firma['judet']}
           style={{
            width:'300px',
          }} />
       </Box>

       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Typography >Localitate</Typography>
          <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5,
          marginLeft:'98px' }} />
          <TextField id="localitate"  variant="standard"
          type="text"
          value={firma['localitate']}
           style={{
            width:'300px',
          }} />
       </Box>

       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Typography >Platitor TVA</Typography>
          <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5,
          marginLeft:'85px'}} />
          <TextField id="platitorTVA"  variant="standard"
          type="text"
          value={firma['platitorTVA']}
           style={{
            width:'300px',
          }} />
       </Box>
      
      
      </>
        
        ))
    } 


    {value === 1 && (
      <>
      <Box sx={{ display: 'flex', alignItems: 'flex-end',}}>
      <Typography >Adresa de email Firma</Typography>
         <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5, 
          marginLeft:'14px'}} />
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
         <HttpsIcon sx={{ color: 'action.active', mr: 1, my: 0.5,
         marginLeft:'45px' }} />
         <TextField id="parolaFirma" 
         type="text"
         variant="standard" 
         style={{
           width:'300px',
         }}
         />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
         <Typography >Denumire Firma</Typography>
         <BusinessIcon sx={{ color: 'action.active', mr: 1, my: 0.5 ,
          marginLeft:'58px'}} />
         <TextField id="denumire" variant="standard" 
          type="text"
          style={{
           width:'300px',
         }}/>
      </Box>

      
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
         <Typography >Cod Inregistrare Fiscala</Typography>
         <SourceIcon sx={{ color: 'action.active', mr: 1, my: 0.5 ,
       marginLeft:'3px'}} />
         <TextField id="cif"  variant="standard"
         type="text"
          style={{
           width:'300px',
         }} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
         <Typography>Judet</Typography>
         <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5,
         marginLeft:'130px' }} />
         <TextField id="judet"  variant="standard"
         type="text"
          style={{
           width:'300px',
         }} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
         <Typography >Localitate</Typography>
         <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5,
         marginLeft:'98px' }} />
         <TextField id="localitate"  variant="standard"
         type="text"
          style={{
           width:'300px',
         }} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
         <Typography >Platitor TVA</Typography>
         <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5,
         marginLeft:'85px'}} />
         <TextField id="platitorTVA"  variant="standard"
         type="text"
          style={{
           width:'300px',
         }} />
      </Box>
     
     <Button variant="contained" color="secondary"
     style={{marginTop:'20px'}}
     >Actualizeaza datele firmei</Button>
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


export default ContFirma 