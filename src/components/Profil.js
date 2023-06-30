import React,{ useState,useEffect } from "react";
import { Box, Button, Divider, Icon, IconButton, Typography } from '@mui/material';
import Navig from "./Navig";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import EmailIcon from '@mui/icons-material/Email';
import TextField from '@mui/material/TextField';
import { useUserAuth } from "../context/userAuthContext";
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

const Profil=()=>{

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

   const { currentUser }= useUserAuth()

   const [pass,setPass]=useState('')
   const [nume,setNume]=useState('')
   const[prenume,setPrenume]=useState('')
  
  //  DATE FIRMA

  const [cif,setCIF]=useState('');
  const [denumire,setDenumire]=useState('');
  const[judet,setJudet]=useState('');
  const[local,setLocal]=useState('');
  const [parolaFirma,setParolaFirma]=useState('');
  const [platitor,setPlatitor]=useState('');

  // const [idPers,setIdPers]=useState('');
  // const [idFirma,setIdFirma]=useState('');

   useEffect(()=>{
    let id;
    let existaPers=false;
    const q = query(collection(db, "utilizator"), where("emailUtilizator", "==", currentUser));
    const qResult=getDocs(q);
    onSnapshot(q,(snapshot)=>{
      let userData=[];
      snapshot.docs.forEach((doc)=>{
        if(doc.data()){
          existaPers=true;
          userData.push({...doc.data(), id:doc.id})
          id=doc.id;
        }  
      })
   localStorage.setItem(id,JSON.stringify(userData));
     }) 


      if(existaPers.valueOf() === false){
         let idF;
        const q = query(collection(db, "firma"), where("emailFirma", "==", currentUser));
        const qResult=getDocs(q);
        onSnapshot(q,(snapshot)=>{
          let firmaData=[];
          snapshot.docs.forEach((doc)=>{
            firmaData.push({...doc.data(), id:doc.id})
            idF=doc.id;
          })   
          localStorage.setItem(idF,JSON.stringify(firmaData));
       });
     }
    },[currentUser])
  

    useEffect(()=>{
    
      let id;
      let existaPers=false;
      const q = query(collection(db, "utilizator"), where("emailUtilizator", "==", currentUser));
      const qResult=getDocs(q);
      onSnapshot(q,(snapshot)=>{
        snapshot.docs.forEach((doc)=>{
          if(doc.data()){
            existaPers=true;
            id=doc.id;
          }  
        })
        const dateUser=localStorage.getItem(id);
        const numeReg=/("nume":")([a-zA-Z]+)/gmi;
        const prenumeReg=/("prenume":")([a-zA-Z]+)/gmi;
        const parolaReg=/"parolaUtilizator":"([^"]+)"/gmi;

        const numeMatch=dateUser.match(numeReg);
        const prenumeMatch=dateUser.match(prenumeReg);
        const parolaMatch=dateUser.match(parolaReg);

        const nume=numeMatch && numeMatch[0] ? (numeMatch[0].replace('"nume":"','')) : ' ';
        const prenume=prenumeMatch && prenumeMatch[0] ? (prenumeMatch[0].replace('"prenume":"','')) : ' ';
        const parola=parolaMatch && parolaMatch[0] ? (parolaMatch[0].replace('"parolaUtilizator":"','')) : ' ';

        setNume(nume);
        setPrenume(prenume);
        setPass(parola);
       }) 
  
  
      //   if(existaPers.valueOf() === false){
      //      let idF;
      //     const q = query(collection(db, "firma"), where("emailFirma", "==", currentUser));
      //     const qResult=getDocs(q);
      //     onSnapshot(q,(snapshot)=>{
      //       let firmaData=[];
      //       snapshot.docs.forEach((doc)=>{
      //         firmaData.push({...doc.data(), id:doc.id})
      //         idF=doc.id;
      //       })   
      //       window.localStorage.setItem(idF,JSON.stringify(firmaData));
      //    });
      //  }

    },[])

  

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
          <Tab label="Setari Cont"  />
        </Tabs>
      </Box>
      {value===0 &&(
        <>
          {/* CONT PERSONAL  */}
          {/**/}
           <Box  sx={{ display: 'flex', alignItems: 'flex-end',}}  >
              <Typography >Adresa de Email</Typography>
              <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.2,marginLeft:'30px' }} />
              <TextField id="adresaEmail" 
              type='text'
              variant="standard" 
              value={currentUser}
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
              value={pass}
              />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography >Nume Utilizator</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1,  my: 0.2,marginLeft:'33px' }} />
              <TextField id="input-with-sx" variant="standard" 
               type="text"
               value={nume}
               style={{
                width:'300px',
              }}/>
           </Box>

           
           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography >Prenume Utilizator</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.2,marginLeft:'10px' }} />
              <TextField id="input-with-sx"  variant="standard"
              type="text"
              value={prenume}
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
              defaultValue={currentUser}
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
              defaultValue={parolaFirma}
              />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography >Denumire Firma</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" variant="standard" 
               type="text"
               defaultValue={denumire}
               style={{
                width:'300px',
              }}/>
           </Box>

           
           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography >Cod Inregistrare Fiscala</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx"  variant="standard"
              type="text"
              defaultValue={cif}
               style={{
                width:'300px',
              }} />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography>Judet</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx"  variant="standard"
              type="text"
              defaultValue={judet}
               style={{
                width:'300px',
              }} />
           </Box>

           <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography >Localitate</Typography>
              <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx"  variant="standard"
              type="text"
              defaultValue={local}
               style={{
                width:'300px',
              }} />
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