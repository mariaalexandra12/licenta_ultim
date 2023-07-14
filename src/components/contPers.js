import React,{ useState,useEffect,useRef } from "react";
import { Box, Button, Divider, Icon, IconButton, Typography } from '@mui/material';
import Navig from "./Navig";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled , alpha} from '@mui/material/styles';
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
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import './contPers.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Face6Icon from '@mui/icons-material/Face6';



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
 const [inregistrareFirma, setInregistrareFirma]=useState('');
 const [updateProfil , setUpdateProfil]=useState('');
 const [datePersonale,setDatePersonale]=useState([]);
 const [open, setOpen] = React.useState(true);

 useEffect(() => {
    const q2 = query(collection(db, "utilizator"),where('emailUtilizator','==',currentUser));
    const unsub=onSnapshot(q2,(snapshot)=>{
   let userData=[];
   snapshot.docs.forEach((doc)=>{
       userData.push(doc.data());
    });
    setDatePersonale(userData);
  })
  return ()=>{
    unsub();
  }
},[currentUser]) 

const handleInregistrareFirma=()=>{
  setInregistrareFirma('Datele Firmei au fost inregistrate cu succes');
}

const handleUpdateProfil=()=>{
  setUpdateProfil('Contul personal a fost actualizat cu succes');
}
    return (
        <>
       <Box sx={{display: 'flex'}}>
        <Navig/>
        <Box sx={{  marginTop:'30px',
      marginLeft:'20px',}}>
         {inregistrareFirma && (
            <>
           <Collapse in={open}>
            <Alert severity='success' style={{
              width:'300px',
              marginLeft:'300px',
              display:'hover',
            }}  
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}> 
                <CloseIcon fontSize="inherit"/>  
              </IconButton>}>{inregistrareFirma}</Alert>
              </Collapse>
              </>
          )}

         {updateProfil && (
            <>
           <Collapse in={open}>
            <Alert severity='success' style={{
              marginTop:'50px',
              width:'300px',
              marginLeft:'300px',
              display:'hover',
            }}  
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}> 
                <CloseIcon fontSize="inherit"/>  
              </IconButton>}>{updateProfil}</Alert>
              </Collapse>
              </>
          )}
        <Grid
         container
           direction="column"
            justifyContent="center"
           alignItems="center">
              

              <Grid item >
              <Item style={{
                marginTop:'100px',
                width:'1100px',
                height:'400px',
                backgroundColor:'#E3F2FD',
               boxShadow:'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', 
               backdropFilter:' blur( 11px )',
               WebkitBackdropFilter:' blur( 11px )',
               border: '1px solid rgba( 255, 255, 255, 0.18 )',
              }}>
        
        
       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} textColor="secondary" >
          <Tab label="Cont Personal" />
          <Tab label="Cont Firma"  />
          <Tab label="Setari cont personal"/>
        </Tabs>
      </Box>

      { value===0 && datePersonale.map((pers) => (
        <>
          {/* CONT PERSONAL  */}
          {/**/}
           <Box  sx={{ display: 'flex', alignItems: 'flex-end',}}  >
              <Typography variant='h6'>Adresa de Email</Typography>
              <TextField id="adresaEmail" 
              type='text'
              variant="outlined" 
              defaultValue={currentUser}
              style={{
                width:'300px',
                marginTop: '30px',
                marginLeft:'10px',
              }}
              />
           </Box>

             
           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography variant='h6'>Parola Cont</Typography>
              <TextField id="input-with-sx" 
              type="text"
              variant="outlined" 
              style={{
                marginTop:'10px',
                width:'300px',
                marginLeft:'50px',
              }}
              defaultValue={pers['parolaUtilizator']}
              />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography variant='h6'>Nume Utilizator</Typography>
              <TextField id="input-with-sx" variant="outlined" 
               type="text"
               defaultValue={pers['nume']}
               style={{
                width:'300px',
                marginTop:'10px',
                marginLeft:'15px',
              }}/>
           </Box>

           
           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography variant='h6'>Prenume Utilizator</Typography>
              <TextField id="input-with-sx"  variant="outlined"
              type="text"
              defaultValue={pers['prenume']}
               style={{
                marginTop:'10px',
                width:'300px',
                marginLeft:'10px',
              }} />
           </Box>

           
        </>
      ))

      }

       {value===1 &&(
        <>
          {/* CONT FIRMA */}
           <Typography sx={{marginLeft:'25px'}}>Poti configura datele firmei pentru care vrei sa inregistrezi facturi
            sau poti continua cu datele personale 
           </Typography>
           <Box sx={{ display: 'flex', alignItems: 'flex-end',}}>
           <Typography variant='h6'>Adresa de email Firma</Typography>
              <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 ,
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
              <Typography variant='h6'>Parola Cont Firma</Typography>
              <HttpsIcon sx={{ color: 'action.active', mr: 1, my: 0.5,marginLeft:'45px' }} />
              <TextField id="input-with-sx" 
              type="text"
              variant="standard" 
              style={{
                width:'300px',
              }}
              />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography variant='h6'>Denumire Firma</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5,marginLeft:'58px' }} />
              <TextField id="input-with-sx" variant="standard" 
               type="text"
               style={{
                width:'300px',
              }}/>
           </Box>

           
           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography variant='h6'>Cod Inregistrare Fiscala</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5,marginLeft:'3px' }} />
              <TextField id="input-with-sx"  variant="standard"
              type="text"
               style={{
                width:'300px',
              }} />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography variant='h6'>Judet</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5,marginLeft:'135px' }} />
              <TextField id="input-with-sx"  variant="standard"
              type="text"
               style={{
                width:'300px',
              }} />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography variant='h6'>Localitate</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5,marginLeft:'105px' }} />
              <TextField id="input-with-sx"  variant="standard"
              type="text"
               style={{
                width:'300px',
              }} />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography variant='h6'>Platitor TVA</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5,marginLeft:'90px' }} />
              <TextField id="input-with-sx"  variant="standard"
              type="text"
               style={{
                width:'300px',
              }} />
           </Box>

           <Button variant="contained" color="secondary" onClick={handleInregistrareFirma}
          style={{marginTop:'20px'}}
          >Inregistreaza firma</Button>

        </>
      )}        


       { value===2 && (
        <>
          {/* CONT PERSONAL  */}
          {/**/}
           <Box  sx={{ display: 'flex', alignItems: 'flex-end',}}  >
              <Typography variant='h6'>Adresa de Email</Typography>
              <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.2,marginLeft:'30px' }} />
              <TextField id="adresaEmail" 
              type='text'
              variant="standard" 
              style={{
                width:'300px',
                marginTop: '30px'
              }}
              />
           </Box>

             
           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography variant='h6'>Parola Cont</Typography>
              <HttpsIcon sx={{ color: 'action.active', mr: 1, my: 0.2,marginLeft:'60px' }} />
              <TextField id="input-with-sx" 
              type="text"
              variant="standard" 
              style={{
                width:'300px',
              }}
              />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography variant='h6'>Nume Utilizator</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1,  my: 0.2,marginLeft:'33px' }} />
              <TextField id="input-with-sx" variant="standard" 
               type="text"
               style={{
                width:'300px',
              }}/>
           </Box>

           
           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography variant='h6'>Prenume Utilizator</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.2,marginLeft:'10px' }} />
              <TextField id="input-with-sx"  variant="standard"
              type="text"
               style={{
                width:'300px',
              }} />
           </Box>

           <Button variant="contained"  onClick={handleUpdateProfil}
          style={{marginTop:'20px'}}
          >Actualizeaza datele contului personal</Button>
        </>
      )
      }

         </Item>
             </Grid>
          
              </Grid>
             
           </Box>
           
        </Box>
        
    
        </>
    
    )

}
export default ContPers