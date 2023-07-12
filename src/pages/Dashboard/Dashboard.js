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
           <div style={{display:'flex',}}>
           <Paper className="paperDash" elevation={24} sx={{width:'1250px',
            height:'250px' ,marginTop:'20px',marginLeft:'20px', display:'row',
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

            <Paper className="paperNrFact"  elevation={24} sx={{width:'150px',
            height:'150px' ,marginTop:'20px',marginLeft:'20px', display:'row',
            borderRadius:'50px'}}/>
            </div>
        </div>


        </>
    )

}

export default Dashboard