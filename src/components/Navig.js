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
import { ListItem, ListItemAvatar, ListItemButton} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";


const Navig=()=>{
    const navigate=useNavigate();
    return (
        <div>
            <Drawer variant="permanent" open={true}>
              <Divider>
                <div>
                  <h1>Invoice Read</h1>
                  <List>
                  <ListItemButton>
                    <Button variant="contained" color="success" startIcon={<DashboardIcon/>}
                    onClick={()=>navigate("dashboard")}>Dashboard</Button>
                  </ListItemButton>
                
                  <ListItemButton>
                     <Button variant="contained" color="error" startIcon={<ReceiptIcon/>}
                     onClick={()=>navigate("facturi")}>Facturi</Button>
                  </ListItemButton>


                  <ListItemButton>
                    
                    <Button variant="contained" color="secondary" 
                    startIcon={<SummarizeRoundedIcon/>}
                    onClick={()=>navigate("rapoarte")}>Rapoarte</Button>
                  </ListItemButton>

                  <ListItemButton> 
                   <Button variant="contained" color="info" startIcon={<AddCircleOutlineRoundedIcon/>}
                   onClick={()=>navigate("adaugaFacturi")}>Adauga Facturi</Button>
                  </ListItemButton>

                  <ListItemButton>
                    <Button variant="contained" color="warning" startIcon={<AssessmentRoundedIcon/>}
                    onClick={()=>navigate("analiza")}>Analiza</Button>
                  </ListItemButton>
                  </List>
                  </div>
                </Divider>
            </Drawer>
        </div>
    )
}

export default Navig