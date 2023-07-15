import React, { useState, useEffect } from 'react';
import Navig from "../../components/Navig";
import { Box, Paper } from '@mui/material';
import { useUserAuth } from '../../context/userAuthContext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseUtils/firebase_ut';
import Plot from 'react-plotly.js';
import './analiza.css';

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
    const dataScadenta = [];
    const numeFurnizor = [];
    const tipFactura = [];
    const valoareTotala = [];

    dateFactura.forEach((fact) => {
      dataScadenta.push(fact['dataScadenta']);
      numeFurnizor.push(fact['numeFurnizor']);
      tipFactura.push(fact['tipFactura']);
      valoareTotala.push(fact['valoareTotala']);
    });

    generateCharts(dataScadenta, numeFurnizor, tipFactura, valoareTotala);
  }, [dateFactura]);

  function createPlotlyCharts(dataScadenta, valoareTotala, numeFurnizor) {
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

    const dataBar = [
      {
        x: furnizoriUnici,
        y: valoriFurnizori,
        type: 'bar',
      },
    ];

    const layoutBar = {
      title: 'Valoarea totală a facturilor în funcție de furnizori',
      xaxis: {
        title: 'Furnizor',
      },
      yaxis: {
        title: 'Valoare Totală',
      },
    };

    return (
      <Plot
        data={dataBar}
        layout={layoutBar}
      />
    );
  }

  function generateCharts(dataScadenta, numeFurnizor, tipFactura, valoareTotala) {
    const dataPie = [
      {
        labels: numeFurnizor,
        values: valoareTotala,
        type: 'pie',
      },
    ];

    const layoutPie = {
      title: 'Valoarea totală a facturilor în funcție de furnizori',
    };

    const dataScatter = [
      {
        x: dataScadenta,
        y: valoareTotala,
        mode: 'markers',
        type: 'scatter',
      },
    ];

    const layoutScatter = {
      title: 'Valoarea totală a facturilor în funcție de data scadenței',
      xaxis: {
        title: 'Data Scadenței',
      },
      yaxis: {
        title: 'Valoare Totală',
      },
    };

    return (
      <>
        <Box sx={{ marginTop: '100px', display: 'flex' }}>
          <div className="chartDiv">{createPlotlyCharts(dataScadenta, valoareTotala, numeFurnizor)}</div>

          <Paper elevation={24} className="paperDiv">
            <Plot
              data={dataPie}
              layout={layoutPie}
            />
          </Paper>

          <Paper elevation={24} className="paperDiv">
            <Plot
              data={dataScatter}
              layout={layoutScatter}
            />
          </Paper>
        </Box>

        <Box sx={{ marginTop: '100px', display: 'flex' }}>
          {/* Graficul 4 */}
          <Paper elevation={24} className="paperDiv">
            {/* Adaugă componenta Plot pentru al patrulea grafic aici */}
          </Paper>

          {/* Graficul 5 */}
          <Paper elevation={24} className="paperDiv">
            {/* Adaugă componenta Plot pentru al cincilea grafic aici */}
          </Paper>

          {/* Graficul 6 */}
          <Paper elevation={24} className="paperDiv">
            {/* Adaugă componenta Plot pentru al șaselea grafic aici */}
          </Paper>
        </Box>
      </>
    );
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
        {generateCharts(dataScadenta, numeFurnizor, tipFactura, valoareTotala)}
      </Box>
    </>
  );
};

export default Analiza;
