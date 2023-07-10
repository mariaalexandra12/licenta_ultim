import React,{ useState , useEffect } from 'react';
import Navig from "../../components/Navig";
import { Box, Button } from '@mui/material';
import { useUserAuth } from '../../context/userAuthContext';
import { collection, query, where, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseUtils/firebase_ut';
import Paper from '@mui/material/Paper';
import Plotly from 'plotly.js/dist/plotly';



const Analiza=()=>{

     const { currentUser }=useUserAuth();
     const [dateFactura, setDateFactura] = useState([]);
     const [idDoc, setIdDoc] = useState('');

     const [dataScadenta,setDataScadenta] = useState([]);
     const [tipFactura,setTipFactura]=useState([]);
     const [valoareTotala,setValoareTotala] = useState([]);
     const [numeFurnizor,setNumeFurnizor]=useState([]);


     useEffect(() => {
      const q2 = query(collection(db, 'factura'), where('emailUtilizator', '==', currentUser));
      const unsub = onSnapshot(q2, (snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push(doc.data());
          setIdDoc(doc.id);
        });
        setDateFactura(items);
      });
      return () => {
        unsub();
      };
      
    }, [currentUser]);

    useEffect(()=>{
       dateFactura.forEach((fact)=>{
        dataScadenta.push(fact['dataScadenta']);
        numeFurnizor.push(fact['numeFurnizor']);
        tipFactura.push(fact['tipFactura']);
        valoareTotala.push(fact['valoareTotala']);
       })
    },[dateFactura])

    function createPlotlyCharts(dataScadenta, valoareTotala, tipFactura, numeFurnizor) {
  
      const furnizoriUnici = [...new Set(numeFurnizor)];
      const valoriFurnizori = [];
    
      furnizoriUnici.forEach((furnizor) => {
        const totalValoare = valoareTotala.reduce((acc, val, index) => {
          if (numeFurnizor[index] === furnizor) {
            return acc + val;
          }
          return acc;
        }, 0);
    
        valoriFurnizori.push(totalValoare);
      });
    
      const data = [{
        x: furnizoriUnici,
        y: valoriFurnizori,
        type: 'bar'
      }];
    
      const layout = {
        title: 'Valoarea totală a facturilor în funcție de furnizori',
        xaxis: {
          title: 'Furnizor'
        },
        yaxis: {
          title: 'Valoare Totală'
        }
      };
    
      Plotly.newPlot('chartDiv', data, layout);
    }
    

    useEffect(()=>{
       console.log(dataScadenta);
       console.log(numeFurnizor);
       console.log(tipFactura);
       console.log(valoareTotala);
    },[dataScadenta,numeFurnizor,tipFactura,valoareTotala])
    
    return (
        <>
        <Box sx={{display: 'flex'}}>
        <Navig/>
        <Box sx={{marginTop: '30px'}}>
          <Paper elevation={24} style={{
            width:"400px",
            height:'400px',
            marginLeft:'20px',
            marginTop:'10px',
            background: 'rgba( 228, 189, 189, 0.25 )',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter: 'blur( 4px )',
            WebkitBackdropFilter: 'blur( 4px )',
            borderRadius: '10px',
            border: '1px solid rgba( 255, 255, 255, 0.18 )',}}>
              <Button variant='contained'>Genereaza grafic</Button>
            </Paper>






        </Box>
    
        </Box>
        </>
    )

}

export default Analiza