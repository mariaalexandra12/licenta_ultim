import React from "react";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Button from '@mui/material/Button'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import invoice from "./images/invoice.png";
import { ListItem, ListItemAvatar, ListItemButton, ListItemIcon} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MuiAppBar from '@mui/material/AppBar';



const Navig=()=>{
    const navigate=useNavigate();
    const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      background: "rgba( 214, 102, 238, 0.55 )",
      '&:hover': {
        background:" rgba( 214, 102, 238, 0.55 )",
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
    }));

    const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerWidth = 240;

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

    return (
        <>

<Box sx={{ display: 'flex'}}>
          
               <AppBar position="fixed" open={open} style={{
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
               }}>
                <Toolbar>
               <IconButton
                 color="inherit"
                 aria-label="open drawer"
                 onClick={handleDrawerOpen}
                 edge="start"
                 sx={{ mr: 2, ...(open && { display: 'none' }) }}><MenuIcon/></IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}/>
          </Search>
           </Toolbar>
          </AppBar>
        </Box>
          <Drawer  sx={{
         
          width:drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <div>
                <List>
                  <ListItemButton>
                     <Button 
                     style={{
                      background:" rgba( 214, 102, 238, 0.55 )",
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backDropFilter: "blur( 9px )",
                    WebkitBackdropFilter: "blur( 9px )",
                    borderRadius:"10px",
                    border:" 1px solid rgba( 255, 255, 255, 0.18 )",
                    }} 
                      startIcon={<DashboardIcon/>}
                     onClick={()=>navigate("dashboard")} 
                     size="medium" 
                     fullWidth>Dashboard</Button>
                  </ListItemButton>

                    
                  <ListItemButton>
                     <Button 
                     style={{
                      background: "rgba( 214, 102, 238, 0.55 )",
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backDropFilter: "blur( 9px )",
                    WebkitBackdropFilter: "blur( 9px )",
                    borderRadius:"10px",
                    border:" 1px solid rgba( 255, 255, 255, 0.18 )",
                    }}
                     startIcon={<ReceiptIcon/>}
                     onClick={()=>navigate("facturi")} 
                     size="medium"
                     fullWidth>Facturi</Button>
                  </ListItemButton>


                  <ListItemButton>
                    
                    <Button 
                    style={{
                      background:" rgba( 214, 102, 238, 0.55 )",
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backDropFilter: "blur( 9px )",
                    WebkitBackdropFilter: "blur( 9px )",
                    borderRadius:"10px",
                    border:" 1px solid rgba( 255, 255, 255, 0.18 )",
                    }}
                    startIcon={<SummarizeRoundedIcon/>}
                    onClick={()=>navigate("rapoarte")} 
                    size="medium"
                    fullWidth>Rapoarte</Button>
                  </ListItemButton>

                  <ListItemButton> 
                   <Button 
                   style={{
                    background: "rgba( 214, 102, 238, 0.55 )",
                  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                  backDropFilter: "blur( 9px )",
                  WebkitBackdropFilter: "blur( 9px )",
                  borderRadius:"10px",
                  border:" 1px solid rgba( 255, 255, 255, 0.18 )",
                  }}
                   startIcon={<AddCircleOutlineRoundedIcon/>}
                   onClick={()=>navigate("adaugaFacturi")} 
                   size="medium"
                   fullWidth>Adauga Facturi</Button>
                  </ListItemButton>

                  <ListItemButton>
                    <Button 
                    style={{
                      background:" rgba( 214, 102, 238, 0.55 )",
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backDropFilter: "blur( 9px )",
                    WebkitBackdropFilter: "blur( 9px )",
                    borderRadius:"10px",
                    border:" 1px solid rgba( 255, 255, 255, 0.18 )",
                    }} 
                    startIcon={<AssessmentRoundedIcon/>}
                    onClick={()=>navigate("analiza")} 
                    size="medium"
                    fullWidth>Analiza</Button>
                  </ListItemButton>
                  

                  <ListItemButton>
                    <Button 
                    style={{
                      background: "rgba( 214, 102, 238, 0.55 )",
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backDropFilter: "blur( 9px )",
                    WebkitBackdropFilter: "blur( 9px )",
                    borderRadius:"10px",
                    border:" 1px solid rgba( 255, 255, 255, 0.18 )",
                    }}
                    startIcon={<LogoutIcon/>}
                    onClick={()=>navigate("/")} 
                    size="medium"
                    fullWidth>Log Out</Button>
                  </ListItemButton>
                 </List>
              </div>
            </Drawer>
          
         
    <div/>
  </>
)};

export default Navig