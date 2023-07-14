import React, { useState, useEffect } from 'react';
import Navig from "../../components/Navig";
import { Box, Paper } from '@mui/material';
import { useUserAuth } from '../../context/userAuthContext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseUtils/firebase_ut';
import Plotly from 'plotly.js/dist/plotly';
import './analiza.css'

const Analiza = () => {
  const { currentUser } = useUserAuth();
  const [dateFactura, setDateFactura] = useState([]);
  const [idDoc, setIdDoc] = useState('');

  const [dataScadenta, setDataScadenta] = useState([]);
  const [tipFactura, setTipFactura] = useState([]);
  const [valoareTotala, setValoareTotala] = useState([]);
  const [numeFurnizor, setNumeFurnizor] = useState([]);

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

  useEffect(() => {
    dateFactura.forEach((fact) => {
      dataScadenta.push(fact['dataScadenta']);
      numeFurnizor.push(fact['numeFurnizor']);
      tipFactura.push(fact['tipFactura']);
      valoareTotala.push(fact['valoareTotala']);
    });

    generateCharts();
  }, [dateFactura]);

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

    const data = [
      {
        x: furnizoriUnici,
        y: valoriFurnizori,
        type: 'bar',
      },
    ];

    const layout = {
      title: 'Valoarea totală a facturilor în funcție de furnizori',
      xaxis: {
        title: 'Furnizor',
      },
      yaxis: {
        title: 'Valoare Totală',
      },
    };

    Plotly.newPlot('chartDiv', data, layout);
  }

  function generateCharts() {
    const dataPie = [
      {
        labels: numeFurnizor,
        values: valoareTotala,
        type: 'pie',
      },
    ];

    const layoutPie = {
      title: 'Valoarea totală a facturilor în funcție de furnizori ',
    };

    Plotly.newPlot('chartDivPie', dataPie, layoutPie);

    const dataScatter = [
      {
        x: dataScadenta,
        y: valoareTotala,
        mode: 'markers',
        type: 'scatter',
      },
    ];

    const layoutScatter = {
      title: 'Valoarea totală a facturilor în funcție de data scadenței ',
      xaxis: {
        title: 'Data Scadenței',
      },
      yaxis: {
        title: 'Valoare Totală',
      },
    };

    Plotly.newPlot('chartDivScatter', dataScatter, layoutScatter);
  }

  useEffect(() => {
    console.log(dataScadenta);
    console.log(numeFurnizor);
    console.log(tipFactura);
    console.log(valoareTotala);
  }, [dataScadenta, numeFurnizor, tipFactura, valoareTotala]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navig />
        <Box sx={{ marginTop: '100px', display: 'flex' }}>
          <div className="chartDiv"></div>

          <Paper elevation={24} className="paperDiv">
            <div id="chartDivPie"></div>
          </Paper>

          <Paper elevation={24} className="paperDiv">
            <div id="chartDivScatter"></div>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Analiza;
