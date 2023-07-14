import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import Navig from '../../components/Navig';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseUtils/firebase_ut';

const Dashboard = () => {
  const [dateFactura, setDateFactura] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Navig />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                marginTop: '50px',
                height: '150px',
                borderRadius: '20px',
                backgroundColor: '#D1C4E9',
                color: '#311B92',
              }}
            >
              <CardContent>
                <Typography variant="h6">Card 1</Typography>
                {/* Adăugați conținutul dorit pentru cardul 1 */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                marginTop: '50px',
                height: '150px',
                borderRadius: '20px',
                backgroundColor: '#C5CAE9',
                color: '#311B92',
              }}
            >
              <CardContent>
                <Typography variant="h6">Card 2</Typography>
                {/* Adăugați conținutul dorit pentru cardul 2 */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                marginTop: '50px',
                height: '150px',
                borderRadius: '20px',
                backgroundColor: '#BBDEFB',
                color: '#311B92',
              }}
            >
              <CardContent>
                <Typography variant="h6">Card 3</Typography>
                {/* Adăugați conținutul dorit pentru cardul 3 */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                marginTop: '50px',
                height: '150px',
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
        <div style={{ width: '400px', height: '300px', margin: '50px' }}>
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Selectați data"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </>
  );
};

export default Dashboard;
