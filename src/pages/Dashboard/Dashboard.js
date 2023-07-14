import React, { useEffect, useState } from 'react';
import { Card, Grid, Typography, Avatar } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseUtils/firebase_ut';
import { useUserAuth } from '../../context/userAuthContext';

const Dashboard = () => {
  const [datePersonale, setDatePersonale] = useState([]);
  const { currentUser } = useUserAuth();
  const [name, setName] = useState('');
  const [prename, setPrename] = useState('');
  const [dateFactura, setDateFactura] = useState([]);

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

  // Calcularea datelor pentru graficul de tip plăcintă
  const calculatePieChartData = () => {
    const data = dateFactura.reduce((acc, factura) => {
      if (factura.numeFurnizor in acc) {
        acc[factura.numeFurnizor] += 1; // Incrementăm numărul de facturi pentru furnizorul curent
      } else {
        acc[factura.numeFurnizor] = 1; // Inițializăm numărul de facturi pentru un nou furnizor
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '150px',
                borderRadius: '20px',
                backgroundColor: '#d1c4e9',
                color: '#673ab7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Avatar sx={{ backgroundColor: '#673ab7', marginBottom: '10px' }}>
                <AssignmentIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontSize: '35px' }}>
                {dateFactura.length}
              </Typography>
              <Typography variant="h4" sx={{ fontSize: '20px', marginTop: '10px' }}>
                Total facturi înregistrate
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card
              sx={{
                height: '400px',
                borderRadius: '20px',
                backgroundColor: '#d1c4e9',
                color: '#673ab7',
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
              <PieChart width={400} height={300}>
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
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
