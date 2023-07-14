import React, { useEffect, useState } from 'react';
import { Card, Grid, Paper, Typography } from '@mui/material';
import Navig from '../../components/Navig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseUtils/firebase_ut';
import { useUserAuth } from '../../context/userAuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

const Dashboard = () => {
  const [datePersonale, setDatePersonale] = useState([]);
  const [dateFactura, setDateFactura] = useState([]);
  const { currentUser } = useUserAuth();

  useEffect(() => {
    const unsubscribe1 = onSnapshot(query(collection(db, 'utilizator'), where('emailUtilizator', '==', currentUser)), (snapshot) => {
      const userData = snapshot.docs.map((doc) => doc.data());
      setDatePersonale(userData);
    });

    const unsubscribe2 = onSnapshot(query(collection(db, 'factura'), where('emailUtilizator', '==', currentUser)), (snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());
      setDateFactura(items);
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [currentUser]);

  const data = [
    { month: 'Jan', value: 200 },
    { month: 'Feb', value: 300 },
    { month: 'Mar', value: 150 },
    { month: 'Apr', value: 400 },
    { month: 'May', value: 250 },
    { month: 'Jun', value: 500 },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <Navig />
      <Paper
        sx={{
          height: '1000px',
          width: '1300px',
          borderRadius: '20px',
          marginTop: '20px',
          padding: '20px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                marginTop:'50px',
                height: '150px',
                borderRadius: '20px',
                backgroundColor: 'rgb(94, 53, 177)',
                color: 'rgb(255, 255, 255)',
              }}
            >
              <Avatar variant="rounded" sx={{ margin: '15px' }}>
                <AssignmentIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontSize: '35px', marginLeft: '20px' }} color="white">
                {dateFactura.length}
              </Typography>
              <Typography variant="h1" sx={{ fontSize: '25px', marginLeft: '15px' }}>
                Total facturi inregistrate
              </Typography>
            </Card>
          </Grid>
   
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                marginTop:'50px',
                height: '150px',
                borderRadius: '20px',
                backgroundColor: 'rgb(94, 53, 177)',
                color: 'rgb(255, 255, 255)',
              }}
            >
              <Avatar variant="rounded" sx={{ margin: '15px' }}>
                <AssignmentIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontSize: '35px', marginLeft: '20px' }} color="white">
                {dateFactura.length}
              </Typography>
              <Typography variant="h1" sx={{ fontSize: '25px', marginLeft: '15px' }}>
                Total facturi inregistrate
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                marginTop:'50px',
                height: '150px',
                borderRadius: '20px',
                backgroundColor: 'rgb(94, 53, 177)',
                color: 'rgb(255, 255, 255)',
              }}
            >
              <Avatar variant="rounded" sx={{ margin: '15px' }}>
                <AssignmentIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontSize: '35px', marginLeft: '20px' }} color="white">
                {dateFactura.length}
              </Typography>
              <Typography variant="h1" sx={{ fontSize: '25px', marginLeft: '15px' }}>
                Total facturi inregistrate
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                marginTop:'50px',
                height: '150px',
                borderRadius: '20px',
                backgroundColor: 'rgb(94, 53, 177)',
                color: 'rgb(255, 255, 255)',
              }}
            >
              <Avatar variant="rounded" sx={{ margin: '15px' }}>
                <AssignmentIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontSize: '35px', marginLeft: '20px' }} color="white">
                {dateFactura.length}
              </Typography>
              <Typography variant="h1" sx={{ fontSize: '25px', marginLeft: '15px' }}>
                Total facturi inregistrate
              </Typography>
            </Card>
          </Grid>

        


          <Grid item xs={12} sm={6} md={6}>
            <Card
              sx={{
                marginTop:'50px',
                height: '300px',
                borderRadius: '20px',
                backgroundColor: 'transparent',
              
                width:'600px',
              }}
            >
              <LineChart width={550} height={300} data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '500px',
                marginTop:'50px',
                borderRadius: '20px',
                marginLeft:'80px',
                width:'400px',
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDateTimePicker
                  label="Select Date"
                  value={null}
                  onChange={() => {}}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Dashboard;
