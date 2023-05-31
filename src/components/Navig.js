import React from "react";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import MenuItem from './MenuItem';
import Button from '@mui/material/Button'


const Navig=()=>{
    return (
        <div>
            <Drawer variant="permanent" open={true}>
                <div>
                  <h1>Invoice Reader App</h1>
                  <Button variant="contained" 
                  onClick={()=>console.log("Invoice Reader App")}>First Mui com</Button>
                </div>
            </Drawer>
        </div>
    )
}

export default Navig