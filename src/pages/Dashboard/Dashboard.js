import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box'
import { Paper } from '@mui/material';
import './dashboard.css'
import Navig from '../../components/Navig';
import { Button, Divider, Icon, IconButton, Typography } from '@mui/material';
import { useUserAuth } from '../../context/userAuthContext';
import { collection, query, where, getDocs,onSnapshot, QuerySnapshot} from "firebase/firestore";
import { db } from '../../firebaseUtils/firebase_ut';


const Dashboard=()=>{


 const [datePersonale,setDatePersonale]=useState([]);
    const { currentUser }=useUserAuth();
    const [name, setName]=useState('');
    const [prename, setPrename]=useState('');
     
    useEffect(() => {
        const q2 = query(collection(db, "utilizator"),where('emailUtilizator','==',currentUser));
        const unsub=onSnapshot(q2,(snapshot)=>{
       let userData=[];
       snapshot.docs.forEach((doc)=>{
           userData.push(doc.data());
        });
        setDatePersonale(userData);
      })
      return ()=>{
        unsub();
      }
    },[currentUser]) 

    

    return (
        <div style={{display:'flex',}}>
           <Navig/>
           <Paper className="paperDash" elevation={24} sx={{width:'1250px',
            height:'250px' ,marginTop:'20px',marginLeft:'20px',
            borderRadius:'50px'}}>
                <Box >
              <Typography sx={{marginTop:'20px', 
            marginLeft:'15px',justifyContent:'center'}}>Bine ai venit,</Typography>
            <Typography >{datePersonale['nume']}</Typography>
            <Typography >{datePersonale['prenume']}</Typography>
            </Box>
            </Paper>

{/* <Paper className="paperDash" elevation={24} sx={{width:'1250px',
            height:'250px' ,marginTop:'20px',marginLeft:'20px',
            borderRadius:'50px'}}></Paper>


<Paper className="paperDash" elevation={24} sx={{width:'1250px',
            height:'250px' ,marginTop:'20px',marginLeft:'20px',
            borderRadius:'50px'}}></Paper> */}
        </div>
    )

}

export default Dashboard