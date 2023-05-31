import React from "react";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import MenuItem from './MenuItem';
import { makeStyles, withStyles } from 'tss-react/mui'
import invoice from "./images/invoice.png"
import  Button  from "@mui/material/Button";

const styles = makeStyles({
    navlogo:{
        width:20,
    },

    navigationLogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    },

    navigationDrawer: {
        width:240,
    }
}); 

const Navig=()=>{
    const classes =styles();
    return (
        <div className={classes.navigationLogoContainer}>
            <Drawer variant="permanent" open={true}>
                <div>
                  <h1>Invoice Reader App</h1>
                  <Button>First MaterialUi</Button>
                </div>
            </Drawer>
        </div>
    )
}

export default Navig