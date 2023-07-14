import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography , Avatar } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import Navig from '../../components/Navig';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseUtils/firebase_ut';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useUserAuth } from '../../context/userAuthContext';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Button } from '@mui/material';
import { CSVLink } from 'react-csv';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DescriptionIcon from '@mui/icons-material/Description';
import PaidIcon from '@mui/icons-material/Paid';

const Dashboard = () => {
  const { currentUser }=useUserAuth();
  const [dateFactura, setDateFactura] = useState([]);
  const [datePersonale, setDatePersonale] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [valoareTotala, setValoareTotala] = useState([]);
  const [totalDePlata, setTotalDePlata]=useState(0);
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
    const total = valoareTotala.reduce((acc, value) => acc + parseFloat(value), 0);
    setTotalDePlata(total);
  }, []);
 

  const calculatePieChartData = () => {
    const data = dateFactura.reduce((acc, factura) => {
      if (factura.numeFurnizor in acc) {
        acc[factura.numeFurnizor] += 1; 
      } else {
        acc[factura.numeFurnizor] = 1; 
      }
      return acc;
    }, {});
    return Object.entries(data).map(([numeFurnizor, numarFacturi]) => ({
      numeFurnizor,
      numarFacturi,
    }));
  };

  const pieChartData = calculatePieChartData();

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
              sx={{
                display:'flex',
                marginLeft:'20px',
                height: '170px',
                borderRadius: '20px',
                backgroundColor: '#BBDEFB',
                color: '#311B92',
              }}
            >
              <CardContent>
              <Avatar sx={{ backgroundColor: '#673ab7', marginBottom: '10px' }}>
                <ContactsIcon />
              </Avatar>
              {datePersonale.map((pers)=>(
                <>
                 <Typography variant="h6" sx={{ fontSize: '20px' }}>
                Bine ai venit , 
              </Typography>
              <Typography variant="h6" sx={{ fontSize: '20px', marginTop: '10px' }}>
                {pers['nume']} {pers['prenume']}! 
              </Typography>
                </>
              ))}
             
              </CardContent>
            </Card>
          </Grid>


          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '170px',
                borderRadius: '20px',
                backgroundColor: '#C5CAE9',
                color: '#311B92',
              }}
            >
              <CardContent>
              <Avatar sx={{ backgroundColor: '#673ab7', marginBottom: '10px' }}>
                <DescriptionIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontSize: '35px' }}>
                {dateFactura.length}
              </Typography>
              <Typography variant="h4" sx={{ fontSize: '20px' }}>
                Total facturi înregistrate
              </Typography>
              </CardContent>
            </Card>
          </Grid>


          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '170px',
                borderRadius: '20px',
                backgroundColor: '#BBDEFB',
                color: '#311B92',
              }}
            >
              <CardContent>
              <Avatar sx={{ backgroundColor: '#673ab7', marginBottom: '10px' }}>
                <PaidIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontSize: '35px' }}>
                {totalDePlata}
              </Typography>
              <Typography variant="h4" sx={{ fontSize: '20px' }}>
                Total de plata
              </Typography>
              </CardContent>
            </Card>
          </Grid>


          <Grid item xs={12} sm={6} md={2.5}>
            <Card
              sx={{
                height: '170px',
                borderRadius: '20px',
                backgroundColor: '#B3E5FC',
                color: '#311B92',
              }}
            >
              <CardContent>
                <Typography variant="h6">Card 4</Typography>
                {/* Adăugați conținutul dorit pentru cardul 4 */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>


        <div style={{ width: '600px', height: '300px', margin: '50px' }}>
          <ResponsiveContainer>
            <BarChart data={dateFactura}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="numeFurnizor" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="valoareTotala" fill="#311B92" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Grid item xs={12} sm={6} md={6}>
            <Card
              sx={{
                height: '400px',
                borderRadius: '20px',
                backgroundColor: '#d1c4e9',
                color: '#BBDEFB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '20px',
              }}
            >
              <Typography variant="h4" sx={{ fontSize: '20px', marginBottom: '20px' }}>
                Distribuția facturilor pe furnizori
              </Typography>
              <PieChart width={450} height={300} style={{marginTop: '20px', marginBottom: '20px'}}>
                <Pie
                  data={pieChartData}
                  dataKey="numarFacturi"
                  nameKey="numeFurnizor"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = 25 + innerRadius + (outerRadius - innerRadius);
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#8884d8"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                      >
                        {pieChartData[index].numeFurnizor}
                      </text>
                    );
                  }}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Card>
          </Grid>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Selectați data"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider> */}
        </Paper>
      </div>
      </Box>
    </>
  );
};

export default Dashboard;
