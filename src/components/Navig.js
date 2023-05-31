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
import { ListItemButton} from "@mui/material";

const Navig=()=>{
    return (
        <div>
            <Drawer variant="permanent" open={true}>
                <div>
                <img src={invoice} alt="Invoice" title="Invoice Reader App"/>
                  <List>
                  <ListItemButton>
                    <Button variant="contained" startIcon={<DashboardIcon/>}
                    color="success">Dashboard</Button>
                  </ListItemButton>
                  <ListItemButton>
                  <Button variant="contained" startIcon={<ReceiptIcon/>}
                  color="error">Facturi</Button>
                  </ListItemButton>
                  <ListItemButton>
                  <Button variant="contained" startIcon={<SummarizeRoundedIcon/>} 
                  color="secondary" >Rapoarte</Button>
                  </ListItemButton>
                  <ListItemButton>
                  <Button variant="contained" startIcon={<AddCircleOutlineRoundedIcon/>}
                  color="info">Adauga Facturi</Button>
                  </ListItemButton>
                  <ListItemButton>
                  <Button variant="contained" startIcon={<AssessmentRoundedIcon/>}
                  color="warning">Analiza</Button>
                  </ListItemButton>
                  </List>
                  
                </div>
            </Drawer>
        </div>
    )
}

export default Navig