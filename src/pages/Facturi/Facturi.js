import React,{useEffect , useState} from 'react';
import { useNavigate } from "react-router-dom";
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
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from 'prop-types';
import { Table } from './table'
import { Modal } from "./modal";


const actions = [
    { icon: <FileCopyIcon />, name: 'Copiaza datele' },
    { icon: <SaveIcon />, name: 'Salveaza datele' },
    // { icon: <PrintIcon />, name: 'Print' },
    // { icon: <ShareIcon />, name: 'Share' },
  ];

  

const Facturi=()=>{

    useEffect(()=>{


    },[])

    const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      page: "Home",
      description: "This is the main page of the website",
      status: "live",
    },
    {
      page: "About Us",
      description: "This page has details about the company",
      status: "draft",
    },
    {
      page: "Pricing",
      description: "Prices for different subscriptions",
      status: "error",
    },
  ]);

  const [rowToEdit, setRowToEdit] = useState(null);
  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

   const { currentUser }=useUserAuth();

   useEffect(()=>{
      

   },[])

    const nav=useNavigate();

    return(
         <Box sx={{display: 'flex'}}>
           <Navig/>
             <Box sx={{marginTop: '80px'}}> 

     <div className="Facturi">
        <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
        <Button onClick={()=>{nav('/adaugaFacturi')}} color="secondary" variant="contained"
       sx={{marginTop:'30px',marginLeft:'500px'}}>Adauga facturi</Button> 
        
         <Box sx={{ height: 120, transform: 'translateZ(0px)', flexGrow: 1 ,
       marginLeft:'1100px'}} >
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
    </Box>
    </div>

        
        </Box>
    </Box>

    )
    
    }


export default Facturi