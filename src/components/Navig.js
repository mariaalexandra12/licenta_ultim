import React, { useEffect, useState , useContext} from 'react';
import { makeStyles } from '@mui/styles';
import { styled, useTheme } from '@mui/material/styles';
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
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
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
import CloseIcon from '@mui/icons-material/Close';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import { auth, db } from '../firebaseUtils/firebase_ut';
import { signOut } from 'firebase/auth';
import ContPers from './contPers';
import ContFirma from './contFirma';
import HomeIcon from '@mui/icons-material/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import { ListItemButton } from '@mui/material';
import { useUserAuth } from '../context/userAuthContext';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Tooltip from '@mui/material/Tooltip';
import { withStyles } from '@mui/styles';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: open ? 'white' : 'white',
  border:'none',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    whiteSpace: 'nowrap',
    background:'#90CAF9' ,
    boxShadow:'none',
    border:'none',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const useStyles = makeStyles((theme) => ({
  listItem: {
    '&:hover': {
      backgroundColor: '#BBDEFB',
      borderRadius: '10px',
    },
  },
}));

export default function Navig() {
  
 
const [navOpen, setNavOpen] = useState(true); 
  const [openAlert, setOpenAlert] = React.useState(true);
  const { currentUser } = useUserAuth();
  const [nume, setNume] = useState('');
  const [prenume, setPrenume] = useState(false);
  const [existaPers, setExistaPers] = useState('');
  const [dateLogare, setDateLogare] = useState('');
  const navigate = useNavigate();
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [openDialog, setOpenDilalog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDilalog(true);
  };

  const handleCloseDialog = () => {
    setOpenDilalog(false);
  };


  useEffect(() => {
    const verificaAdresa = () => {
      const q = query(collection(db, 'utilizator'), where('emailUtilizator', '==', currentUser));
      const docsUser = getDocs(q).then((documentUser) => {
        if (documentUser.empty) {
          setExistaPers(false);
        } else {
          setExistaPers(true);
        }
      });
    };
    verificaAdresa();
  }, []);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <>

        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
       
          <AppBar position="fixed" open={open} sx={{bgcolor:'#90CAF9'}}>
        <Toolbar>
          <IconButton
            color="#283593"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" color='#283593'>
            Invoice Reader Application
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer className="drawerNavig" variant="permanent" open={open} >
        <DrawerHeader sx={{backgroundColor:'#90CAF9'}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

            <List sx={{backgroundColor:'#90CAF9'}}>
              <ListItem onClick={() => navigate('/dash')} sx={{
                '&:hover': {
      backgroundColor: 'white',
      borderRadius: '300px',
           },}} >
                <Tooltip title='Acasa'>
                <ListItemButton  >
                  <ListItemIcon style={{ color: '#283593' }}>
                    <HomeIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>Acasa</Typography>
                </ListItemButton>
                </Tooltip>
              </ListItem>

              <div className="facturiButton">
                <ListItem onClick={() => navigate('/facturi')}
                sx={{
                  '&:hover': {
        backgroundColor: 'white',
        borderRadius: '300px',
             },}}  >
                  <Tooltip title='Facturi'>
                  <ListItemButton >
                    <ListItemIcon style={{ color: '#283593' }}>
                      <ReceiptIcon />
                    </ListItemIcon>
                    <Typography variant='h6' >Facturi</Typography>
                  </ListItemButton>
                  </Tooltip>
                </ListItem>
              </div>
     

              <div className="adaugaButton">
                <ListItem onClick={() => navigate('/adaugaFacturi')} 
                sx={{
                  '&:hover': {
        backgroundColor: 'white',
        borderRadius: '300px',
             },}} >
                  <Tooltip title='Adauga facturi'>
                  <ListItemButton>
                    <ListItemIcon style={{ color: '#283593' }}>
                      <AddCircleOutlineRoundedIcon />
                    </ListItemIcon>
                    <Typography variant='h6' >Adauga Facturi</Typography>
                  </ListItemButton>
                  </Tooltip>
                </ListItem>
              </div>
         

              <div className="analizaButton">
                <ListItem onClick={() => navigate('/analiza')}
                sx={{
                  '&:hover': {
        backgroundColor: 'white',
        borderRadius: '300px',
             },}} >
                  <Tooltip title='Analiza'>
                  <ListItemButton>
                    <ListItemIcon style={{ color: '#283593' }}>
                      <AssessmentRoundedIcon />
                    </ListItemIcon>
                    <Typography variant='h6'>Analiza</Typography>
                  </ListItemButton>
                  </Tooltip>
                </ListItem>
              </div>
              


              {existaPers ? (
                <div className="contPersButton">
                  <ListItem onClick={() => navigate('/contPers')}
                  sx={{
                    '&:hover': {
          backgroundColor: 'white',
          borderRadius: '300px',
               },}} >
                    <Tooltip title='Cont personal'>
                    <ListItemButton>
                      <ListItemIcon style={{ color: '#283593' }}>
                        <Face6Icon />
                      </ListItemIcon>
                      <Typography variant='h6'>Profil</Typography>
                    </ListItemButton>
                    </Tooltip>
                  </ListItem>
                </div>
              ) : (
                <div className="contFirmaButton">
                  <ListItem onClick={() => navigate('/contFirma')}
                  sx={{
                    '&:hover': {
          backgroundColor: 'white',
          borderRadius: '300px',
               },}} >
                    <Tooltip title='Cont firma'>
                    <ListItemButton>
                      <ListItemIcon style={{ color: '#283593' }}>
                        <Face6Icon />
                      </ListItemIcon>
                      <Typography variant='h6' >Profil</Typography>
                    </ListItemButton>
                    </Tooltip>
                  </ListItem>
                </div>
              )}

            
              <div className="logoutButton">
                <Tooltip title='Deconectare'>
                <ListItem onClick={handleClickOpen} style={{ marginTop: '150px'}}
                sx={{
                  '&:hover': {
        backgroundColor: 'white',
        borderRadius: '300px',
             },}} >
                  <ListItemButton>
                    <Dialog TransitionComponent={Transition} open={openDialog} aria-describedby="alert-dialog-slide-description">
                      <DialogTitle>{"Te deconectezi?"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          Vrei sa iesi din aplicatie ?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => {
                            signOut(auth).then(navigate('/'));
                          }}
                        >
                          Da
                        </Button>
                      </DialogActions>
                    </Dialog>

                    <ListItemIcon style={{ color: '#283593' }}>
                      <LogoutIcon />
                    </ListItemIcon>
                    <Typography variant='h6' color='black'>Deconecteaza-te</Typography>
                  </ListItemButton>
                </ListItem>
                </Tooltip>
              </div>
            </List>
          </Drawer>
        </Box>
    </>
  );
}
