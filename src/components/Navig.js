import * as React from 'react';
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

const drawerWidth = 240;

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
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
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
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick=()=>{
    console.log("buna")
  }

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
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} color='secondary'>
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
            <Chip onClick={handleClick} 
             icon={<Face6Icon/>}
             label="Profil"
             variant="contained"
            />
           </Stack>
          </Toolbar>

         
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],

            }}
          >

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
              style={{color:"rgba(138, 5, 186)"}}
            >
              Invoice Reader
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
             </IconButton>
   
    
          </Toolbar>
        
        
          <List>
            
                     <ListItemButton onClick={()=>navigate("dashboard")}>

                      <ListItemIcon style={{color:"rgba(138, 5, 186)"}}><DashboardIcon/> </ListItemIcon>
                      <ListItemText style={{color:"rgba(138, 5, 186)"}}>Dashboard</ListItemText>
                     </ListItemButton>
                    <Divider></Divider>
                 
                  <ListItemButton  onClick={()=>navigate("facturi")} >

                    <ListItemIcon style={{color:"rgba(138, 5, 186)"}}><ReceiptIcon/></ListItemIcon>
                    <ListItemText style={{color:"rgba(138, 5, 186)"}}>Facturi</ListItemText>
                  </ListItemButton>
                  <Divider></Divider>

                  <ListItemButton onClick={()=>navigate("adaugaFacturi")} > 
                   
                  <ListItemIcon style={{color:"rgba(138, 5, 186)"}}><AddCircleOutlineRoundedIcon/></ListItemIcon>
                  <ListItemText style={{color:"rgba(138, 5, 186)"}}>Adauga Facturi</ListItemText>
                  </ListItemButton>
                  <Divider></Divider>

                  <ListItemButton  onClick={()=>navigate("analiza")}>
              
                    <ListItemIcon style={{color:"rgba(138, 5, 186)"}}><AssessmentRoundedIcon/></ListItemIcon>
                    <ListItemText style={{
                      color: "rgba(138, 5, 186)",
                     }}>Analiza</ListItemText>
                  </ListItemButton>
                  <Divider></Divider>


                  <ListItemButton onClick={handleClickOpen} style={{marginTop:'280px'}}>

                    <Dialog
                         TransitionComponent={Transition}
                         open={openDialog}
                         onClose={handleCloseDialog}
                        aria-describedby="alert-dialog-slide-description">
      
                        <DialogTitle>{"Log Out?"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                             Vrei sa iesi din aplicatie ?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseDialog}>Nu</Button>
                         <Button onClick={()=>{navigate("/")}}>Da</Button>
                        </DialogActions>
                        </Dialog> 
                   

                    <ListItemIcon style={{color:"rgba(138, 5, 186)"}}><LogoutIcon/></ListItemIcon>
                    <ListItemText style={{color:"rgba(138, 5, 186)"}}>Log Out</ListItemText>

                       
                  </ListItemButton>
                  <Divider></Divider>

                 </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              
                </Paper>
              </Grid>
            </Grid>
      
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}