import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box'
import { Paper } from '@mui/material';
import Navig from '../../components/Navig';
import { Button, Divider, Icon, IconButton, Typography } from '@mui/material';
import { useUserAuth } from '../../context/userAuthContext';
import { collection, query, where, getDocs,onSnapshot, QuerySnapshot} from "firebase/firestore";
import { db } from '../../firebaseUtils/firebase_ut';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';


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
           <Paper sx={{height:'1000px',width:'1250px',background:'#EEEEEE',
           borderRadius:'20px',
           marginLeft:'20px',
           marginTop:'20px',}} >
           <Paper className="paperDash"  sx={{width:'1250px',
            height:'50px' ,marginTop:'80px',
            }}>
                <Box sx={{marginLeft:'20px'}}>
            {datePersonale.map((pers)=>(
              <div>
                <Typography mt={8} sx={{fontSize:'35px'}} color='secondary'
                >Bine ai venit , {pers['nume']} {pers['prenume']}!</Typography>
              </div>
            ))}
            </Box>
            </Paper>
           
            <Paper elevation={24} sx={{width:'300px',
            marginLeft:'20px',
            marginTop:'20px',
            background:'rgba( 206, 163, 230, 0.25 )',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter:' blur( 4px )',
            WebkitBackdropFilter: 'blur( 4px )',
            border: '1px solid rgba( 255, 255, 255, 0.18 )',}}>
              <Typography sx={{fontSize:'25px',marginLeft:'15px',marginTop:'10px'}}>Total facturi inregistrate</Typography>
              <Typography sx={{fontSize:'25px',marginLeft:'130px',marginTop:'10px'}}>{dateFactura.length}</Typography>
            </Paper>


            </Paper>
        </div>


        </>
    )

}

export default Dashboard