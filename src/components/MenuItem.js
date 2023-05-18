import React from 'react';

import { ListItemIcon ,ListItem ,ListItemText ,Icon} from '@mui/material';


const MenuItem=({label,icon,activeIcon,path})=>{
    const [active,setActive] =React.useState(true);
    return <ListItem>
        <ListItemIcon>
            <Icon>
                <img 
                src={active ? activeIcon :icon} 
                alt={label}></img>
            </Icon>
        </ListItemIcon>
        <ListItemText primary={label} 
        primaryTypographyProps={{variant:"body1"}}></ListItemText>
    </ListItem>
}

export default MenuItem