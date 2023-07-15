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
    if (dateFactura.length > 0) {
      const storedData = JSON.parse(localStorage.getItem('chartData'));

      if (storedData) {
        setDataScadenta(storedData.dataScadenta);
        setTipFactura(storedData.tipFactura);
        setValoareTotala(storedData.valoareTotala);
        setNumeFurnizor(storedData.numeFurnizor);
      } else {
        const dataScadenta = [];
        const tipFactura = [];
        const valoareTotala = [];
        const numeFurnizor = [];

        dateFactura.forEach((fact) => {
          dataScadenta.push(fact['dataScadenta']);
          numeFurnizor.push(fact['numeFurnizor']);
          tipFactura.push(fact['tipFactura']);
          valoareTotala.push(fact['valoareTotala']);
        });

        setDataScadenta(dataScadenta);
        setTipFactura(tipFactura);
        setValoareTotala(valoareTotala);
        setNumeFurnizor(numeFurnizor);

        const chartData = {
          dataScadenta,
          tipFactura,
          valoareTotala,
          numeFurnizor,
        };

        localStorage.setItem('chartData', JSON.stringify(chartData));
      }
    }
  }, [dateFactura]);

  useEffect(() => {
    console.log(dataScadenta);
    console.log(numeFurnizor);
    console.log(tipFactura);
    console.log(valoareTotala);
  }, [dataScadenta, numeFurnizor, tipFactura, valoareTotala]);

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
        marker: {
          color: '#4287f5',
        },
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

  const dataPie = [
    {
      labels: numeFurnizor,
      values: valoareTotala,
      type: 'pie',
      marker: {
        colors: ['#4287f5', '#42f57f', '#f54287', '#f5a742', '#8742f5', '#f54242'],
      },
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
      marker: {
        color: '#f54242',
      },
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
      marker: {
        color: '#42f57f',
      },
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
      theta: numeFurnizor,
      fill: 'toself',
      type: 'scatterpolar',
      marker: {
        color: '#8742f5',
      },
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
      marker: {
        color: '#f5a742',
      },
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
      marker: {
        color: '#4287f5',
      },
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

  const dataRose = [
    {
      r: valoareTotala,
      theta: numeFurnizor,
      type: 'scatterpolar',
      mode: 'markers',
      marker: {
        color: '#f54287',
      },
    },
  ];

  const layoutRose = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0, Math.max(...valoareTotala)],
      },
    },
    title: 'Distribuția valorii totale a facturilor în funcție de furnizori (Graficul Trandafir)',
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Navig />
        <div className="chartDiv">{createPlotlyCharts(dataScadenta, valoareTotala, numeFurnizor)}</div>
        <Paper elevation={24} className="paperDiv" sx={{ marginLeft: '50px' ,
        width:'400px',
        height:'400px',}}>
          <Plot
            data={dataPie}
            layout={layoutPie}
          />
        </Paper>


        <Paper elevation={24} className="paperDiv" sx={{width:'400px',height:'400px'}}>
          <Plot
            data={dataBar2}
            layout={layoutBar2}
          />
        </Paper>


        <Paper elevation={24} className="paperDiv" sx={{width:'400px',height:'400px'}}>
          <Plot
            data={dataRose}
            layout={layoutRose}
          />
        </Paper>
      </Box>
    </>
  );
};

export default Analiza;
