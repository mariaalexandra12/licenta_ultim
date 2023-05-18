import React from "react";
import Drawer from '@mui/material/Drawer';
import { useStyles } from "../styles";
import List from '@mui/material/List';
import MenuItem from './MenuItem';


const Navig=()=>{
    const classes=useStyles();
    return (
        <div>
            <Drawer  variant="permanent" open={true}>
                <div className={classes.navLogo}>
                    <h1>Invoice Reader App</h1>
                </div>
             <List>
                <MenuItem label="Dashboard" />
             </List>
            </Drawer>
        </div>
    )
}

export default Navig