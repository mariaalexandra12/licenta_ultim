import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box'
import { Paper } from '@mui/material';
import './dashboard.css'
import Navig from '../../components/Navig';
import { Button, Divider, Icon, IconButton, Typography } from '@mui/material';
import { useUserAuth } from '../../context/userAuthContext';
import { collection, query, where, getDocs,onSnapshot, QuerySnapshot} from "firebase/firestore";
import { db } from '../../firebaseUtils/firebase_ut';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Clock from './Clock';

const Dashboard=()=>{


 const [datePersonale,setDatePersonale]=useState([]);
    const { currentUser }=useUserAuth();
    const [name, setName]=useState('');
    const [prename, setPrename]=useState('');
    const [dateFactura , setDateFactura]=useState([]);
     
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

    useEffect(() => {
      const q2 = query(collection(db, 'factura'), where('emailUtilizator', '==', currentUser));
      const unsub = onSnapshot(q2, (snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setDateFactura(items);
      });
      return () => {
        unsub();
      };
      
    }, [currentUser]);
    
    return (
      <>
        <div style={{display:'flex',}}>
           <Navig/>
           <Paper className="paperDash" elevation={24} sx={{width:'1150px',
            height:'250px' ,marginTop:'20px',marginLeft:'20px',
            borderRadius:'50px'}}>
                <Box sx={{marginLeft:'20px'}}>
              <Typography mt={8} sx={{fontSize:'35px'}}>Bine ai venit,</Typography>
            {datePersonale.map((pers)=>(
              <div>
                <Typography sx={{fontSize:'25px'}}>{pers['nume']}</Typography>
                <Typography sx={{fontSize:'25px'}}>{pers['prenume']}!</Typography>
              </div>
            ))}
            </Box>
            </Paper>
           
            <Paper elevation={24} sx={{width:'300px',
            height:'100px',marginTop:'300px',
            borderRadius:'50px',
            marginLeft:'-1050px',
            background:'rgba( 206, 163, 230, 0.25 )',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter:' blur( 4px )',
            WebkitBackdropFilter: 'blur( 4px )',
            borderRadius: '50px',
            border: '1px solid rgba( 255, 255, 255, 0.18 )',}}>
              <Typography sx={{fontSize:'25px',marginLeft:'15px',marginTop:'10px'}}>Total facturi inregistrate</Typography>
              <Typography sx={{fontSize:'25px',marginLeft:'130px',marginTop:'10px'}}>{dateFactura.length}</Typography>
            </Paper>

            <LocalizationProvider dateAdapter={AdapterDayjs} >
               <StaticDatePicker  sx={{width:'150px',height:'480px',marginTop:'300px',
              marginLeft:'550px',
              background:'rgba( 206, 163, 230, 0.25 )',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter:' blur( 4px )',
            WebkitBackdropFilter: 'blur( 4px )',
            borderRadius: '50px',
            border: '1px solid rgba( 255, 255, 255, 0.18 )'}}/>
            </LocalizationProvider>

            <Clock />

        </div>


        </>
    )

}

export default Dashboard