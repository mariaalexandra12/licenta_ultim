import React from "react";
import Drawer from '@mui/material/Drawer';
import { makeStyles } from 'tss-react/mui'

const useStyles=makeStyles({
    navLogo: {
       display:'flex'
    }
});

const Navig=()=>{
    const classes=useStyles();
    return (
        <div>
            <Drawer variant="permanent" open={true}>
                <div className={classes.navLogo}>
                    <h2>Invoice Reader App</h2>
                </div>
             
            </Drawer>
        </div>
    )
}

export default Navig