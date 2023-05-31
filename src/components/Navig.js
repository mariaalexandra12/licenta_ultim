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


const Navig=()=>{
    return (
        <div>
            <Drawer variant="permanent" open={true}>
              <Divider>
                <div>
                  <h1>Invoice Read</h1>
                  <List>
                  <ListItemButton>
                    <Button variant="contained" color="success" startIcon={<DashboardIcon/>}>Dashboard</Button>
                  </ListItemButton>
                
                  <ListItemButton>
                    
                     <Button variant="contained" color="error" startIcon={<ReceiptIcon/>}>Facturi</Button>
                  </ListItemButton>


                  <ListItemButton>
                    
                    <Button variant="contained" color="secondary" startIcon={<SummarizeRoundedIcon/>}>Rapoarte</Button>
                  </ListItemButton>

                  <ListItemButton>
                   <Button variant="contained" color="info" startIcon={<AddCircleOutlineRoundedIcon/>}>Adauga Facturi</Button>
                  </ListItemButton>

                  <ListItemButton>
                    
                    <Button variant="contained" color="warning" startIcon={<AssessmentRoundedIcon/>}>Analiza</Button>
                  </ListItemButton>
                  </List>
                  </div>
                </Divider>
            </Drawer>
        </div>
    )
}

export default Navig