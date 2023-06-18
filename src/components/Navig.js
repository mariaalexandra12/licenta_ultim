import React from "react";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Button from '@mui/material/Button'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import { ListItem, ListItemAvatar, ListItemButton, ListItemIcon} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const Navig=()=>{
    const navigate=useNavigate();

    return (
        <>  
        
        <div>
          <div className="navBar">
             <Drawer variant="permanent" open={true} style={{
                backgroundColor: "rgb(255, 166, 203)",

              }}>
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
                    width:"180px"
                    }} 
                      startIcon={<DashboardIcon/>}
                     onClick={()=>navigate("dashboard")} 
                     size="medium" 
                     >Dashboard</Button>
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
                    width:"180px"
                    }}
                     startIcon={<ReceiptIcon/>}
                     onClick={()=>navigate("facturi")} 
                     size="medium"
                     >Facturi</Button>
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
                  width:"180px"
                  }}
                   startIcon={<AddCircleOutlineRoundedIcon/>}
                   onClick={()=>navigate("adaugaFacturi")} 
                   size="medium">Adauga Facturi</Button>
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
                    width:"180px"
                    }} 
                    startIcon={<AssessmentRoundedIcon/>}
                    onClick={()=>navigate("analiza")} 
                    size="medium">Analiza</Button>
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
                    width:"180px"
                    }}
                    startIcon={<LogoutIcon/>}
                    onClick={()=>{
                      var result = window.confirm("Sigur doresti sa log out ?");
                      if(result===true){
                        navigate("/");
                      }
                      else{
                        return;
                      }
                    }}
                    size="medium">Log Out</Button>
                  </ListItemButton>
                 </List>
              
            </Drawer>
          
            </div>
          </div>
       
  </>
)};

export default Navig