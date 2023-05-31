import React from "react";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import MenuItem from './MenuItem';
import { makeStyles, withStyles } from 'tss-react/mui'

const styles = makeStyles({
    navlogo:{
        width: '50%',
    },
});

const Navig=()=>{
    const classes=styles();
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