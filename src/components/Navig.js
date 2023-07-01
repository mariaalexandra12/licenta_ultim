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

const drawerWidth = 210;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px +30px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      marginTop:'150px',
      borderRadius:'30px',
      marginBottom:'0px',
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

  const [showCard,setShowCard]=React.useState(false);
  const handleChipProfile=()=>{
       setShowCard(!showCard);
  }

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} style={{
          background: 'rgba( 24, 4, 4, 0.3 )',
         boxShadow:'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
         backdropFilter: 'blur( 10px )',
         WebkitBackdropFilter:' blur( 10px )',
        }}>
          <Toolbar
            sx={{
              pr: '14px', 
            }}
            
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            
            <IconButton color="inherit">
              
            </IconButton>
            <Stack direction="row" spacing={1}>
            <Chip color='secondary'
             icon={<Face6Icon/>}
             label="Profil"
             variant="contained"
             onClick={handleChipProfile}
             style={{
              marginLeft:'1000px'
             }}
            />

           </Stack>
          </Toolbar>
        </AppBar>


        <Drawer variant="permanent" open={open} style={{
          marginTop:'0px',     
          height:'338px',
          marginLeft:'30px'
        }} >
          <Toolbar
            sx={{
              marginTop:'0px',
              background: 'rgba( 24, 4, 4, 0.3 )',
              boxShadow:'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
              backdropFilter: 'blur( 10px )',
              WebkitBackdropFilter:' blur( 10px )',
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
        

          <List style={{ 
               marginTop:'0px',
               background: 'rgba( 24, 4, 4, 0.3 )',
              boxShadow:'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
              backdropFilter: 'blur( 10px )',
              WebkitBackdropFilter:' blur( 10px )',
          }}>
             <ListItem onClick={()=>navigate("/navig")}>
                     <ListItemButton >

                      <ListItemIcon style={{color:"rgba(138, 5, 186)"}}><DashboardIcon/> </ListItemIcon>
                      <ListItemText style={{color:"black",
                    fontFamily: 'Goudy Bookletter 1911", sans-serif',}}>Dashboard</ListItemText>
                     </ListItemButton>

                     </ListItem>
                    <Divider></Divider>
                 
                 <ListItem  onClick={()=>navigate("/facturi")} >
                  <ListItemButton >

                    <ListItemIcon style={{color:"rgba(138, 5, 186)"}}><ReceiptIcon/></ListItemIcon>
                    <ListItemText style={{color:"black",
                  fontFamily: 'Goudy Bookletter 1911", sans-serif',}}>Facturi</ListItemText>
                  </ListItemButton>
                  </ListItem>
                  <Divider></Divider>

                 <ListItem onClick={()=>navigate("/adaugaFacturi")} >
                  <ListItemButton > 
                   
                  <ListItemIcon style={{color:"rgba(138, 5, 186)"}}><AddCircleOutlineRoundedIcon/></ListItemIcon>
                  <ListItemText style={{color:"black" ,
                   fontFamily: 'Goudy Bookletter 1911", sans-serif',}}>Adauga Facturi</ListItemText>
                  </ListItemButton>
                 

                  </ListItem>
                  <Divider></Divider>


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

                
                 </List>
        </Drawer>

         
        {showCard && (
           <div>
             <Card style={{
                  marginLeft:'950px',
                  marginTop:'60px',
                  background: 'rgba( 186, 152, 224, 0.7 )',
                  boxShadow:'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', 
                  backdropFilter:' blur( 11px )',
                  WebkitBackdropFilter:' blur( 11px )',
                  borderRadius:' 50px',
                  border: '1px solid rgba( 255, 255, 255, 0.18 )',
                  position:'fixed',}}>
          
          <List>

            { existaPers ? 
              // <p>Cont pers</p>
              <ContPers/>
            : 
            // <p>Cont frima</p>
             <ContFirma/>
            }

          {/* <ListItem disablePadding onClick={()=>navigate("/profil")}>
            <ListItemButton >
              <ListItemIcon style={{color:"rgba(138, 5, 186)"}}>
                <SettingsApplicationsIcon/>
              </ListItemIcon>
              <ListItemText primary="Setari Cont" />
            </ListItemButton>
          </ListItem> */}


      <ListItem  onClick={handleClickOpen}>
                  <ListItemButton>
                    <Dialog
                         TransitionComponent={Transition}
                         open={openDialog}
                        aria-describedby="alert-dialog-slide-description">
      
                        <DialogTitle>{"Log Out?"}</DialogTitle>
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
                      }}>Log Out</ListItemText> 
                  </ListItemButton>
                  </ListItem>
                  </List>
                  </Card>
               </div>
              )
            }
         
         {/* <>
           <Collapse in={openAlert}>
            <Alert severity='success' style={{
              width:'300px',
              marginTop:'90px',
              marginLeft:'500px',
              display:'hover',
              borderRadius:'20px'

            }}  
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false);
                }}> 
                <CloseIcon fontSize="inherit"/>  
              </IconButton>}>
                Bine ai venit ,{nume} {prenume}!
                </Alert>
              </Collapse>
      </> */}
         
      </Box>
      
    </ThemeProvider>
    

    </>
  );
}