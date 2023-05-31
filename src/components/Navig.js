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
                    <ListItemAvatar>
                        <DashboardIcon/>
                    </ListItemAvatar>
                    <Button variant="contained" color="success">Dashboard</Button>
                  </ListItemButton>
                
                  <ListItemButton>
                     <ListItemAvatar>
                        <ReceiptIcon/>
                     </ListItemAvatar>
                     <Button variant="contained" color="error">Facturi</Button>
                  </ListItemButton>


                  <ListItemButton>
                    <ListItemAvatar>
                        <SummarizeRoundedIcon/>
                    </ListItemAvatar>
                    <Button variant="contained" color="secondary" >Rapoarte</Button>
                  </ListItemButton>

                  <ListItemButton>
                   <ListItemAvatar>
                    <AddCircleOutlineRoundedIcon/>
                   </ListItemAvatar>
                   <Button variant="contained" color="info">Adauga Facturi</Button>
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemAvatar>
                        <AssessmentRoundedIcon/>
                    </ListItemAvatar>
                    <Button variant="contained" color="warning">Analiza</Button>
                  </ListItemButton>
                  </List>
                  </div>
                </Divider>
            </Drawer>
        </div>
    )
}

export default Navig