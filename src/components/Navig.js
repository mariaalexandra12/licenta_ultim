import React,{ useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import { ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import './Navig.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Face6Icon from '@mui/icons-material/Face6';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DescriptionIcon from '@mui/icons-material/Description';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { makeStyles} from '@mui/styles';
import { useUserAuth } from '../context/userAuthContext';
import CloseIcon from '@mui/icons-material/Close';
import { collection, query, where,onSnapshot, getDocs} from "firebase/firestore";
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import { auth, db } from "../firebaseUtils/firebase_ut";
import { signOut } from 'firebase/auth';
import ContPers from './contPers';
import ContFirma from './contFirma';
import HomeIcon from '@mui/icons-material/Home';
import Dashboard from '../pages/Dashboard/Dashboard';



const drawerWidth = 220;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      background: 'rgb(189,168,224)',
      background: 'rgb(178,148,229)',
      background: 'linear-gradient(360deg, rgba(178,148,229,1) 13%, rgba(243,233,242,1) 78%)',
      backdropFilter: 'blur( 11.5px )',
      WebkitBackdropFilter: 'blur( 11.5px )',
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
          
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
          
        },
      }),
    },
   
  }),
);


const defaultTheme = createTheme();


export default function Navig() {

  const [openAlert, setOpenAlert] = React.useState(true);

  const { currentUser }= useUserAuth();

  const [nume,setNume]=useState('')
   const[prenume,setPrenume]=useState(false);

  const [existaPers,setExistaPers]=useState('')

  const [dateLogare,setDateLogare]=useState('')

   useEffect(()=>{
    const verificaAdresa=()=>{
        const q=query(collection(db,'utilizator'),where('emailUtilizator','==',currentUser));
      const docsUser=getDocs(q).then((documentUser)=>{
        if(documentUser.empty){
          setExistaPers(false);
        }
        else{
          setExistaPers(true);
         
        }
      }
      )
    }
    verificaAdresa();
   },[])



  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
    
  };

  const navigate=useNavigate();

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [openDialog, setOpenDilalog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDilalog(true);
  };

  const handleCloseDialog=()=>{
    setOpenDilalog(false);
  }

  

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
      
      
        <Drawer className="drawerNavig" variant="permanent" open={open} style={{
          marginTop:'0px',     
          height:'800px',
          borderRadius:'50px',
        }} >
          <Toolbar
            sx={{
              marginTop:'0px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              
            }}
          >

         
             <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
             </IconButton>
             
    
          </Toolbar>
        

          <List >
             <ListItem onClick={()=>navigate("/dash")} sx={{borderRadius:'50px'}}>
                <ListItemButton className='navigButton'>
                      <ListItemIcon style={{
                        color:"rgba(138, 5, 186)",

                       }}><HomeIcon/> </ListItemIcon>
                      <ListItemText style={{color:"black",}}>Acasa</ListItemText>
                </ListItemButton>
              </ListItem>
                    <Divider></Divider>
                 

                 <div className="facturiButton">
                 <ListItem  onClick={()=>navigate("/facturi")} >
                  <ListItemButton >

                    <ListItemIcon style={{color:"rgba(138, 5, 186)"}}><ReceiptIcon/></ListItemIcon>
                    <ListItemText style={{color:"black",
                  fontFamily: 'Goudy Bookletter 1911", sans-serif',}}>Facturi</ListItemText>
                  </ListItemButton>
                  </ListItem>
                  </div>
                  <Divider></Divider>



                 <div className='adaugaButton'>
                 <ListItem onClick={()=>navigate("/adaugaFacturi")} >
                  <ListItemButton > 
                   
                  <ListItemIcon style={{color:"rgba(138, 5, 186)"}}><AddCircleOutlineRoundedIcon/></ListItemIcon>
                  <ListItemText style={{color:"black" ,
                   fontFamily: 'Goudy Bookletter 1911", sans-serif',}}>Adauga Facturi</ListItemText>
                  </ListItemButton>
                  </ListItem>
                  </div>
                  <Divider></Divider>


                <div className='analizaButton'>
                <ListItem   onClick={()=>navigate("/analiza")}>
                  <ListItemButton>
              
                    <ListItemIcon style={{color:"rgba(138, 5, 186)"}}><AssessmentRoundedIcon/></ListItemIcon>
                    <ListItemText style={{
                      color: "black",
                      fontFamily: 'Goudy Bookletter 1911", sans-serif',
                     }}>Analiza</ListItemText>
                  </ListItemButton>
                  <Divider></Divider>
                  </ListItem>
                  </div>
                   <Divider/>



                    { existaPers ? 
                    <div className="contPersButton">
           <ListItem  onClick={()=>navigate("/contPers")}>
             <ListItemButton >
            <ListItemIcon style={{color:"rgba(138, 5, 186)"}}>
               <Face6Icon/>
              </ListItemIcon>
               <ListItemText style={{
                      color: "black",
                      fontFamily: 'Goudy Bookletter 1911", sans-serif',
                     }} primary="Profil" />
          </ListItemButton>
          </ListItem> 
          </div>
             
             :
         
             <div className="contFirmaButton">
             <ListItem  onClick={()=>navigate("/contFirma")}>
             <ListItemButton >
            <ListItemIcon style={{color:"rgba(138, 5, 186)"}}>
               <Face6Icon/>
              </ListItemIcon>
               <ListItemText style={{
                      color: "black",
                      fontFamily: 'Goudy Bookletter 1911", sans-serif',
                     }} primary="Profil" />
          </ListItemButton>
          </ListItem> 
          </div>
          }
         

                        <Divider/>
                        <div className='logoutButton'>
                        <ListItem  onClick={handleClickOpen} style={{marginTop: '170px'}}>
                  <ListItemButton>
                    <Dialog
                         TransitionComponent={Transition}
                         open={openDialog}
                        aria-describedby="alert-dialog-slide-description">
      
                        <DialogTitle>{"Te deconectezi?"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                             Vrei sa iesi din aplicatie ?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        
                         <Button onClick={()=>{signOut(auth)
                           .then(navigate("/"))}}>Da</Button>
                        </DialogActions>
                        </Dialog> 
                   
                   
                    <ListItemIcon style={{color:"rgba(138, 5, 186)"}}><LogoutIcon/></ListItemIcon>
                    <ListItemText style={{
                      color:"black",
                      fontFamily: 'Goudy Bookletter 1911", sans-serif',
                      
                      }}>Deconecteaza-te</ListItemText> 
                  </ListItemButton>
                  </ListItem>
                  </div>
                 </List>
        </Drawer>
      </Box>

     
    </ThemeProvider>
    

    </>
  );
}