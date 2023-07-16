import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography , Avatar } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import TextField from '@mui/material/TextField';
import Navig from '../../components/Navig';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseUtils/firebase_ut';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useUserAuth } from '../../context/userAuthContext';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Button } from '@mui/material';
import { CSVLink } from 'react-csv';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DescriptionIcon from '@mui/icons-material/Description';
import PaidIcon from '@mui/icons-material/Paid';
import { PieChart } from '@mui/x-charts';



const Dashboard = () => {
  const { currentUser }=useUserAuth();
  const [ultimaFactura, setUltimaFactura] = useState(null);
  const [dateFactura, setDateFactura] = useState([]);
  const [datePersonale, setDatePersonale] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [valoareTotala, setValoareTotala] = useState([]);
  const [totalDePlata, setTotalDePlata]=useState();
  useEffect(() => {
    const q2 = query(collection(db, 'utilizator'), where('emailUtilizator', '==', currentUser));
    const unsub = onSnapshot(q2, (snapshot) => {
      let userData = [];
      snapshot.docs.forEach((doc) => {
        userData.push(doc.data());
      });
      setDatePersonale(userData);
    });
    return () => {
      unsub();
    };
  }, [currentUser]);

  useEffect(() => {
    const q2 = query(collection(db, 'factura'));
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
  }, []);

  
  useEffect(() => {
    dateFactura.forEach((fact) => {
      valoareTotala.push(fact['valoareTotala']);
    });
  }, [dateFactura]);

  useEffect(() => {
    let total = 0;
    dateFactura.forEach((fact) => {
      const val = parseFloat(fact['valoareTotala']);
      total += val;
    });
    setTotalDePlata(total.toFixed(2));
  }, [dateFactura]);
  
 

  const calculatePieChartData = () => {
    const data = dateFactura.reduce((acc, factura) => {
      if (factura.numeFurnizor in acc) {
        acc[factura.numeFurnizor] += parseFloat(factura.valoareTotala);
      } else {
        acc[factura.numeFurnizor] = parseFloat(factura.valoareTotala);
      }
      return acc;
    }, {});

    const totalPlata = parseFloat(totalDePlata);

    return Object.entries(data).map(([numeFurnizor, valoareFactura]) => ({
      label:numeFurnizor,
      valoareFactura,
      value: (valoareFactura / totalPlata),
    }));
  };

  const pieChartData = calculatePieChartData();

  const TOTAL = pieChartData.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};

useEffect(() => {
  const q2 = query(collection(db, 'factura'));
  const unsub = onSnapshot(q2, (snapshot) => {
    const items = [];
    snapshot.forEach((doc) => {
      items.push(doc.data());
    });
    setDateFactura(items);

    // Obține ultima factură adăugată
    const ultimaFacturaAdaugata = items[items.length - 1];
    setUltimaFactura(ultimaFacturaAdaugata);
  });
  return () => {
    unsub();
  };
}, []);


  return (
    <>
    <Box sx={{display:'flex'}}>
      <Navig />
      <div  >
        <Paper elevation={24}  sx={{width:'1230px',
        marginTop:'100px',
        marginLeft:'20px',
        borderRadius:'50px',
        position:'relative',
        }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
            className="border-animation"
              sx={{
                display:'flex',
                marginLeft:'20px',
                height: '170px',
                borderRadius: '20px',
                backgroundColor: '#BBDEFB',
                color: '#311B92',
                overflow:'hidden',
              
              }}
            >
              <CardContent sx={{zIndex:'10'}}>
              <Avatar sx={{ backgroundColor: '#673ab7', marginBottom: '10px' }}>
                <ContactsIcon />
              </Avatar>
              {datePersonale.map((pers)=>(
                <>
                 <Typography variant="h6" sx={{ fontSize: '20px',zIndex:'2' }}>
                Bine ai venit , 
              </Typography>
              <Typography variant="h6" sx={{ fontSize: '20px', marginTop: '10px' ,
              zIndex:'2'}}>
                {pers['nume']} {pers['prenume']}! 
              </Typography>
                </>
              ))}
             
              </CardContent>
            </Card>
          </Grid>


          <Grid item xs={12} sm={6} md={3}>
            <Card
            className="border-animation"
              sx={{
                height: '170px',
                borderRadius: '20px',
                backgroundColor: '#C5CAE9',
                color: '#311B92',
                overflow:'hidden',
              }}
            >
              <CardContent sx={{zIndex:'10'}}>
              <Avatar sx={{ backgroundColor: '#673ab7', marginBottom: '10px' }}>
                <DescriptionIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontSize: '35px',zIndex:'2' }}>
                {dateFactura.length}
              </Typography>
              <Typography variant="h4" sx={{ fontSize: '20px',zIndex:'2' }}>
                Total facturi înregistrate
              </Typography>
              </CardContent>
            </Card>
          </Grid>


          <Grid item xs={12} sm={6} md={3}>
            <Card
            className="border-animation"
              sx={{
                height: '170px',
                borderRadius: '20px',
                backgroundColor: '#BBDEFB',
                color: '#311B92',
                overflow:'hidden',

              }}
            >
              <CardContent sx={{position: 'relative',zIndex:'10'}}>
              <Avatar sx={{ backgroundColor: '#673ab7', marginBottom: '10px' }}>
                <PaidIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontSize: '35px',zIndex:'10' }}>
                {totalDePlata}
              </Typography>
              <Typography variant="h4" sx={{ fontSize: '20px',zIndex:'10' }}>
                Total de plata
              </Typography>
              
              </CardContent>
            </Card>
          </Grid>


          <Grid item xs={12} sm={6} md={2.5}>
            <Card
              className="border-animation"
              sx={{
                height: '180px',
                borderRadius: '20px',
                backgroundColor: '#B3E5FC',
                color: '#311B92',
                overflow:'hidden',
              }}
            >
              <CardContent sx={{zIndex:'10'}}>
                <Typography variant="h6" sx={{zIndex:'2'}}>Ultima factura inregistrata</Typography>
                {ultimaFactura ? (
      <>
        <Typography variant="body1" sx={{zIndex:'2'}}>
          Nume furnizor: {ultimaFactura.numeFurnizor}
        </Typography>
        <Typography variant="body1" sx={{zIndex:'2'}}>
          Valoare totală: {ultimaFactura.valoareTotala}
        </Typography>
         Data scadenta : {ultimaFactura.dataScadenta}
      </>
    ) : (
      <Typography variant="body1" sx={{zIndex:'2'}}>
        Nu există facturi înregistrate.
      </Typography>
    )}
              </CardContent>
            </Card>
          </Grid>


          <Card
  sx={{
    marginTop:'20px',
    marginLeft:'50px',
    width: '600px',
    height: '400px',
    borderRadius: '20px',
    backgroundColor: 'transparent',
    color: '#311B92',
  }}
>
  <CardContent>
    <Typography variant="h6" sx={{ fontSize: '20px' }}>
      Ponderea facturilor inregistrate in totalul de plata 
    </Typography>
    <PieChart
      series={[
        {
          data: pieChartData,
          cx: 150,
          cy: 150,
          innerRadius: 90,
          outerRadius: 150,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{ height: '400px', marginLeft: '100px' }}
      legend={{
        position: 'right',
        markSize:'108',
        align: 'center',
        verticalAlign: 'middle',
        layout: 'vertical',
        formatter: (label, value) => `${label}: ${value.toFixed(2)}%`,}}
    />
  </CardContent>
</Card>

<Card sx={{marginTop:'20px'}}>
  <CardContent>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
         <StaticDateTimePicker orientation="landscape" />
     </LocalizationProvider>
     </CardContent>
   </Card>
        </Grid>
        </Paper>
      </div>
      </Box>
    </>
  );
};

export default Dashboard;
