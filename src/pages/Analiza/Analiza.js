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
    const furnizoriUnici = [...new Set(numeFurnizor)]; // Am adăugat declarația pentru furnizoriUnici

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

    const dataLine = [
      {
        x: dataScadenta,
        y: valoareTotala,
        type: 'line',
      },
    ];

    const layoutLine = {
      title: 'Graficul Linie',
      xaxis: {
        title: 'Data Scadenței',
      },
      yaxis: {
        title: 'Valoare Totală',
      },
    };

    const dataRadar = [
      {
        r: valoareTotala,
        theta: furnizoriUnici,
        fill: 'toself',
        type: 'scatterpolar',
      },
    ];

    const layoutRadar = {
      polar: {
        radialaxis: {
          visible: true,
          range: [0, Math.max(...valoareTotala)],
        },
      },
      title: 'Distribuția valorii totale a facturilor în funcție de furnizori',
    };

    const dataScatter2 = [
      {
        x: tipFactura,
        y: valoareTotala,
        mode: 'markers',
        type: 'scatter',
      },
    ];

    const layoutScatter2 = {
      title: 'Valoarea totală a facturilor în funcție de tipul facturii',
      xaxis: {
        title: 'Tipul Facturii',
      },
      yaxis: {
        title: 'Valoare Totală',
      },
    };

    const dataBar2 = [
      {
        x: tipFactura,
        y: valoareTotala,
        type: 'bar',
      },
    ];

    const layoutBar2 = {
      title: 'Valoarea totală a facturilor în funcție de tipul facturii',
      xaxis: {
        title: 'Tipul Facturii',
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
          <Paper elevation={24} className="paperDiv">
            <Plot
              data={dataLine}
              layout={layoutLine}
            />
          </Paper>

          <Paper elevation={24} className="paperDiv">
            <Plot
              data={dataRadar}
              layout={layoutRadar}
            />
          </Paper>

          <Paper elevation={24} className="paperDiv">
            <Plot
              data={dataScatter2}
              layout={layoutScatter2}
            />
          </Paper>
        </Box>

        <Box sx={{ marginTop: '100px', display: 'flex' }}>
          <Paper elevation={24} className="paperDiv">
            <Plot
              data={dataBar2}
              layout={layoutBar2}
            />
          </Paper>

          {/* Adaugă celelalte două grafice aici */}
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
