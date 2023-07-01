// import React,{ useState,useEffect,useRef } from "react";
// import { Box, Button, Divider, Icon, IconButton, Typography } from '@mui/material';
// import Navig from "./Navig";
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import { styled } from '@mui/material/styles';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import PersonPinIcon from '@mui/icons-material/PersonPin';
// import EmailIcon from '@mui/icons-material/Email';
// import TextField from '@mui/material/TextField';
// import { useUserAuth} from "../context/userAuthContext";
// import HttpsIcon from '@mui/icons-material/Https';
// import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
// import { db } from "../firebaseUtils/firebase_ut";
// import { collection, query, where, getDocs,onSnapshot, QuerySnapshot} from "firebase/firestore";



// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

// const ContFirma=()=>{


//     const [cif,setCIF]=useState('');
//   const [denumire,setDenumire]=useState('');
//   const[judet,setJudet]=useState('');
//   const[local,setLocal]=useState('');
//   const [parolaFirma,setParolaFirma]=useState('');
//   const [platitor,setPlatitor]=useState('');



//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//  const { currentUser }= useUserAuth()


//   useEffect(() => {

//     const q2 = query(collection(db, "firma"));
//     let idF;
//     where("emailFirma","==",currentUser);
//     onSnapshot(q2,(snapshot)=>{
//    let firmaData=[];
//    snapshot.docs.forEach((doc)=>{
//      if(doc.data()){
//        firmaData.push({...doc.data(), id:doc.id});
//        idF=doc.id;
//        localStorage.setItem(doc.id, JSON.stringify(doc.data()));
//        // localStorage.setItem()
//      }
//        })
  
   
//     const dateFirma=localStorage.getItem(idF);     
//           const denumireFirmaReg=/([a-zA-Z])+\s+.*SRL/gmi;
//            const denumireFirmaMatch=dateFirma.match(denumireFirmaReg);
//            const denFirma=denumireFirmaMatch && denumireFirmaMatch[0] ? denumireFirmaMatch[0]:'';
//            // setDenumire(denFirma);
//            console.log(denFirma)

            
//            const cifReg=/("CIF":")\s*[0-9]*/gmi;
//            const cifMatch=dateFirma.match(cifReg);
//            const cifFirma=cifMatch && cifMatch[0] ? cifMatch[0] : '';
//            setCIF(cifFirma.replace('"CIF":"',''));
//            console.log(cifFirma.replace('"CIF":"',''))


//            const judetReg=/("judet":")\s*[a-zA-Z]*/gmi;
//            const judetMatch=dateFirma.match(judetReg);
//            const judetFirma=judetMatch && judetMatch[0] ? judetMatch[0] : '';
//            setJudet(judetFirma.replace('"judet":"',''));
//            console.log(judetFirma.replace('"judet":"',''))
    

//            const localitateRegex=/("localitate":")\s*[a-zA-Z]*/gmi;
//            const localitateMatch=dateFirma.match(localitateRegex);
//            const localFirma=localitateMatch && localitateMatch[0] ? localitateMatch[0] : '';
//            setLocal(localFirma.replace('"localitate":"',''));
//            console.log(localFirma.replace('"localitate":"',''))


//            const parolaFirmaRegex=/("parolaFirma":")\s*[a-zA-Z]*/gmi;
//            const parolaFirmaMatch=dateFirma.match(parolaFirmaRegex);
//            const parolFir=parolaFirmaMatch && parolaFirmaMatch[0] ? parolaFirmaMatch[0] : '';
//           setParolaFirma(parolFir.replace('"parolaFirma":"',''));
//            console.log(parolFir.replace('"parolaFirma":"',''))


//            const platTVARegex=/("platitorTva":")\s*[a-zA-Z]*/gmi;
//            const platTVAMatch=dateFirma.match(platTVARegex);
//            const platTVA=platTVAMatch && platTVAMatch[0] ? platTVAMatch[0] : '';
//            if(platTVA.replace('"platitorTVA":"','') === "on"){
             
//              setPlatitor("DA");
//            }
//            else{
//              setPlatitor("NU");
//            }
//          })

//        },[currentUser]) 


//     return (
//         <>

// <Box sx={{display: 'flex'}}>
//         <Navig/>
//         <Box sx={{  marginTop:'80px',
//       marginLeft:'20px',}}>
//         <Grid
//          container
//            direction="column"
//             justifyContent="center"
//            alignItems="center">
//               <Grid container  direction="rows" xs>
//                 <Grid item>
//                 <Item style={{
//                     width:'1000px',
//                     display:'flex',
//                     flexDirection:'row',
//                     background: 'rgba( 186, 152, 224, 0.7 )',
//                     boxShadow:'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', 
//                     backdropFilter:' blur( 11px )',
//                     WebkitBackdropFilter:' blur( 11px )',
//                     borderRadius:' 10px',
//                     border: '1px solid rgba( 255, 255, 255, 0.18 )',
//                 }}>
//                     <Typography style={{fontSize:'35px'}}>Profil</Typography>
//                     <IconButton style={{marginLeft:'450px',}}><PersonPinIcon/></IconButton>
//                 </Item>
//                 </Grid>
              
//               </Grid>
//               <Grid item >
//               <Item style={{
//                 marginTop:'50px',
//                 width:'1000px',
//                 height:'400px',
//                 background: 'rgba( 186, 152, 224, 0.7 )',
//                 boxShadow:'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', 
//                 backdropFilter:' blur( 11px )',
//                 WebkitBackdropFilter:' blur( 11px )',
//                 borderRadius:' 10px',
//                 border: '1px solid rgba( 255, 255, 255, 0.18 )',
//               }}>
//        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={value} onChange={handleChange} textColor="secondary" >
//           <Tab label="Cont Firma"  />
//           <Tabs label="Settings"/>
//         </Tabs>
//       </Box>

//        {value===0 &&(
//         <>
//           {/* CONT FIRMA */}
//            <Box sx={{ display: 'flex', alignItems: 'flex-end',}}>
//            <Typography >Adresa de email Firma</Typography>
//               <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//               <TextField id="adresaEmail" 
//               type='text'
//               variant="standard" 
//               defaultValue={currentUser}
//               style={{
//                 width:'300px',
//                 marginTop: '30px',
                
//               }}
//               />
//            </Box>

//            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//               <Typography >Parola Cont Firma</Typography>
//               <HttpsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//               <TextField id="input-with-sx" 
//               type="text"
//               variant="standard" 
//               style={{
//                 width:'300px',
//               }}
//               defaultValue={parolaFirma}
//               />
//            </Box>

//            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//               <Typography >Denumire Firma</Typography>
//               <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//               <TextField id="input-with-sx" variant="standard" 
//                type="text"
//                defaultValue={denumire}
//                style={{
//                 width:'300px',
//               }}/>
//            </Box>

           
//            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//               <Typography >Cod Inregistrare Fiscala</Typography>
//               <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//               <TextField id="input-with-sx"  variant="standard"
//               type="text"
//               defaultValue={cif}
//                style={{
//                 width:'300px',
//               }} />
//            </Box>

//            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//               <Typography>Judet</Typography>
//               <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//               <TextField id="input-with-sx"  variant="standard"
//               type="text"
//               defaultValue={judet}
//                style={{
//                 width:'300px',
//               }} />
//            </Box>

//            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//               <Typography >Localitate</Typography>
//               <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//               <TextField id="input-with-sx"  variant="standard"
//               type="text"
//               defaultValue={local}
//                style={{
//                 width:'300px',
//               }} />
//            </Box>

//            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//               <Typography >Platitor TVA</Typography>
//               <AccessibilityNewIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//               <TextField id="input-with-sx"  variant="standard"
//               type="text"
//               defaultValue={platitor}
//                style={{
//                 width:'300px',
//               }} />
//            </Box>
          
//         </>
//       )}     

//         {value===1 &&(
//          <>
//           {/* CONT FIRMA */}
//            <Box sx={{ display: 'flex', alignItems: 'flex-end',}}>
//            <Typography >Setari cont Firma</Typography>
               
//            </Box>
//          </> 
//         )}
        
//         </Item>
//       </Grid>
     
//      </Grid>
//      </Box>
//      </Box>
//         </>
//     )
// }


// export default ContFirma 