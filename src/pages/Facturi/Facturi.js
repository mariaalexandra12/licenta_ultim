import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Navig from '../../components/Navig';
import { useUserAuth } from '../../context/userAuthContext';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import { DataGrid, GridToolbarExport, GridToolbarDensitySelector, GridToolbarContainer, GridToolbarColumnsButton } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';

import { collection, query, where, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseUtils/firebase_ut';
import { Modal } from './modal';



function CustomNoRowsOverlay() {
  return (
    <div>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </div>
  );
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton color="secondary" />
      <GridToolbarDensitySelector color="secondary" />
      <GridToolbarExport color="secondary" />
    </GridToolbarContainer>
  );
}

const Facturi = () => {
  const { currentUser } = useUserAuth();

  const [dateFactura, setDateFactura] = useState([]);
  const [rows, setRows] = useState([]);
  const [idDoc, setIdDoc] = useState('');
  const [open, setOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [deleteAlert, setDeleteAlert] = useState('');
  const [updateFactura, setUpdateFactura] = useState('');
  const [existaRanduri,setExistaRanduri]=useState(false);

  const nav = useNavigate();

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
    const newRows = dateFactura.map((fact, index) => ({
      id: index,
      numeFurnizor: fact['numeFurnizor'],
      dataScadenta: fact['dataScadenta'],
      tipFact: fact['tipFactura'],
      valoareaTotala: fact['valoareTotala'],
    }));
    setRows(newRows);
  }, [dateFactura]);



  const handleDeleteRow = async (targetIndex) => {
    const rowToDelete = rows[targetIndex];
    try {
      await deleteDoc(doc(db, 'factura', idDoc));
      setRows(rows.filter((_, idx) => idx !== targetIndex));
      setRowToEdit(null);
      setModalOpen(false);
      setDeleteAlert('Factura a fost stearsa cu succes');
    } catch (error) {
      setDeleteAlert(error.message);
    }
  };

  const handleEditRow = (idx) => {
    const selectedRow = rows[idx];
    setRowToEdit(selectedRow);
    setModalOpen(true);

  };

  const handleSubmit = async (newRow) => {
    if (rowToEdit !== null) {
      try {
        const docRef = doc(db, 'factura', idDoc);
        await updateDoc(docRef, {
          dataScadenta: newRow.dataScadenta,
          tipFactura: newRow.tipFactura,
          valoareTotala: newRow.valoareTotala,
        });

        setRows((prevRows) => {
          const updatedRows = [...prevRows];
          updatedRows[rowToEdit.id] = {
            ...updatedRows[rowToEdit.id],
            dataScadenta: newRow.dataScadenta,
            tipFactura: newRow.tipFactura,
            valoareTotala: newRow.valoareTotala,
          };
          return updatedRows;
        });

        setUpdateFactura('Factura a fost actualizata cu succes');
        setModalOpen(false);
        setRowToEdit(null);
      } catch (error) {
        console.error('Error updating document:', error);
      }
    }
  };

  const handleView = () => {
    setModalViewOpen(true);
  };

  const columns = [
    { field: 'numeFurnizor', headerName: 'Nume Furnizor', width: 230 },
    { field: 'dataScadenta', headerName: 'Data Scadenta', width: 230 },
    { field: 'tipFact', headerName: 'Tip Factura', width: 230 },
    { field: 'valoareaTotala', headerName: 'Valoarea Totala', width: 230 },
    {
      field: 'actiuni',
      headerName: 'Actiuni',
      width: 230,
      renderCell: (params) => (
        <div>
          <Tooltip title="Sterge factura">
            <IconButton onClick={() => handleDeleteRow(params.row.id)}>
              <DeleteIcon color="secondary" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Editeaza factura">
            <IconButton onClick={() => handleEditRow(params.row.id)}>
              <EditIcon color="secondary" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Vizualizeaza factura">
            <IconButton onClick={handleView}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Navig />
      <Box sx={{ marginTop: '60px' }}>
        <div className="Facturi">
          {deleteAlert && (
            <>
              <Collapse in={open}>
                <Alert
                  severity="info"
                  style={{
                    width: '300px',
                    marginTop: '10px',
                    marginLeft: '500px',
                    display: 'hover',
                  }}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {deleteAlert}
                </Alert>
              </Collapse>
            </>
          )}

          {updateFactura && (
            <>
              <Collapse in={open}>
                <Alert
                  severity="info"
                  style={{
                    width: '300px',
                    marginTop: '10px',
                    marginLeft: '500px',
                    display: 'hover',
                  }}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {updateFactura}
                </Alert>
              </Collapse>
            </>
          )}


        {rows.length === 0 ? (
           <div> 
           <DataGrid
           rows={[]}
           columns={[]}
           checkboxSelection
           components={{
             Toolbar: CustomToolbar,
           }}
           slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
           sx={{
             marginTop: '10px',
             fontSize: '18px',
             marginLeft: '40px',
             background: 'rgba( 189, 16, 224, 0.25 )',
             boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
             backdropFilter: 'blur( 10px )',
             WebkitBackdropFilter: 'blur( 10px )',
             borderRadius: '30px',
           }}
           
         />
           
           </div>
          )
        :
        (
        <div> 
        <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        components={{
          Toolbar: CustomToolbar,
        }}
        sx={{
          marginTop: '10px',
          fontSize: '18px',
          marginLeft: '40px',
          background: 'rgba( 189, 16, 224, 0.25 )',
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
          backdropFilter: 'blur( 10px )',
          WebkitBackdropFilter: 'blur( 10px )',
          borderRadius: '30px',
        }}
      />

      <Button
        onClick={() => {
          nav('/adaugaFacturi');
        }}
        color="secondary"
        variant="contained"
        sx={{
          marginTop: '40px',
          marginLeft: '550px',
          width: '200px',
          height: '70px',
        }}
      >
        Adauga facturi
      </Button>

      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null ? rows[rowToEdit.id] : null}
        />
      )}
        </div>
        )
        }
          


        </div>
      </Box>
    </Box>
  );
};

export default Facturi;
