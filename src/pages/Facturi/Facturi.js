import React from 'react';
import { useNavigate } from "react-router-dom";
import './facturi.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Navig from '../../components/Navig';
import { useUserAuth } from '../../context/userAuthContext';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from 'prop-types';

  

const actions = [
    { icon: <FileCopyIcon />, name: 'Copiaza datele' },
    { icon: <SaveIcon />, name: 'Salveaza datele' },
    // { icon: <PrintIcon />, name: 'Print' },
    // { icon: <ShareIcon />, name: 'Share' },
  ];


  function createData(name, dataSc, tipF,valTotala) {
    return {
      name,
      dataSc,
      tipF,
      valTotala,
    };
  }
  

  const rows = [
    createData('Enel', '12.12.2023', 'utilitati', 24),
    createData('ING', '12.03.2023','materii prime',256),
    createData('Eclair', '03.09.2023', 'inventar',300),
    createData('Cupcake', '05.06.2023','nedefinit','456'),
  ];
 

  Row.propTypes = {
    row: PropTypes.shape({
      dataSc: PropTypes.string.isRequired,
      tipF: PropTypes.string.isRequired,
      valTotala: PropTypes.number.isRequired,
    //   history: PropTypes.arrayOf(
    //     PropTypes.shape({
    //       amount: PropTypes.number.isRequired,
    //       customerId: PropTypes.string.isRequired,
    //       date: PropTypes.string.isRequired,
    //     }),
    //   ).isRequired,
      name: PropTypes.string.isRequired,
    //   price: PropTypes.number.isRequired,
    //   protein: PropTypes.number.isRequired,
    }).isRequired,
  };
  

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

      return (
        <>
        
           <React.Fragment>
  <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
    <TableCell>
      <IconButton
        aria-label="expand row"
        size="small"
        onClick={() => setOpen(!open)}
      >
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    </TableCell>
    <TableCell component="th" scope="row">
      {row.name}
    </TableCell>
    <TableCell align="right">{row.dataSc }</TableCell>
    <TableCell align="right">{row.tipF}</TableCell>
    <TableCell align="right">{row.valTotala}</TableCell>
  </TableRow>
  {/* <TableRow>
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <Typography variant="h6" gutterBottom component="div">
            History
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>Nume</TableCell>
                <TableCell>Data scandeta</TableCell>
                <TableCell align="right">Tip Factura</TableCell>
                <TableCell align="right">Total price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {row.history.map((historyRow) => (
                <TableRow key={historyRow.date}>
                  <TableCell component="th" scope="row">
                    {historyRow.date}
                  </TableCell>
                  <TableCell>{historyRow.customerId}</TableCell>
                  <TableCell align="right">{historyRow.amount}</TableCell>
                  <TableCell align="right">
                    {Math.round(historyRow.amount * row.price * 100) / 100}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  </TableRow> */}
</React.Fragment>
</>
)
}
  
  

const Facturi=()=>{



   const { currentUser }=useUserAuth();

    const nav=useNavigate();

    return(
         <Box sx={{display: 'flex'}}>
           <Navig/>
            <Box sx={{marginTop: '80px'}}> 
       
        {/* <Button onClick={()=>{nav('/adaugaFacturi')}} color="secondary" variant="contained"
       sx={{marginTop:'30px'}}>Adauga facturi</Button> */}
        
        {/* <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 ,
       marginLeft:'1000px',marginTop:'100px'}} >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16, }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box> */}

<TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nume Furnizor</TableCell>
            <TableCell align="right">Data scadenta</TableCell>
            <TableCell align="right">Tip Factura</TableCell>
            <TableCell align="right">Valoarea Totala</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
        </Box>
    </Box>


    )
    
    }


export default Facturi