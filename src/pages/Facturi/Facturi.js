import React,{useEffect , useState} from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Navig from '../../components/Navig';
import { useUserAuth } from '../../context/userAuthContext';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { Table } from './table'
import { Modal } from "./modal";
import { db } from '../../firebaseUtils/firebase_ut';
import { collection, query, 
  where, 
  getDocs,
  onSnapshot, doc,
  deleteDoc,
  updateDoc,
  QuerySnapshot,
  QueryDocumentSnapshot } from "firebase/firestore";
import ModalView from './modalView';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { Icon, Tooltip } from '@mui/material';
import { DataGrid, GridToolbarExport ,
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarColumnsButton,} from '@mui/x-data-grid';
  import DeleteIcon from '@mui/icons-material/Delete';
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import EditIcon from '@mui/icons-material/Edit';

  function CustomToolbar() {
    return (
      <GridToolbarContainer >
        <GridToolbarColumnsButton color='secondary'/>
        <GridToolbarDensitySelector color='secondary' />
        <GridToolbarExport color='secondary' />
      </GridToolbarContainer>
    );
  }
  

const Facturi=()=>{

    const { currentUser }= useUserAuth()

    const [indexFact,setIndexFact]=useState(0);
    const [dateFactura,setDateFactura]=useState([]);
    const [rows, setRows] = useState([])
    const [idDoc,setIdDoc]=useState('');
    const [open, setOpen] = React.useState(true);

    useEffect(()=>{
     
        console.log(currentUser);
        const q2 = query(collection(db, "factura"),where("emailUtilizator","==",currentUser));
        const unsub=onSnapshot(q2,(snapshot) => {
            const items=[];
            snapshot.forEach((doc)=>{
                items.push(doc.data());
                setIdDoc(doc.id);
            });
          setDateFactura(items);
        })
        return ()=>{
            unsub();
        }
        },[currentUser])

    useEffect(()=>{
        dateFactura.map((fact)=>console.log(fact));
        console.log(idDoc);
        const newRows=dateFactura.map((fact,index)=>({
          id:index,
          numeFurnizor:fact['numeFurnizor'],
          dataScadenta:fact['dataScadenta'],
          tipFact:fact['tipFactura'],
          valoareaTotala:fact['valoareTotala'],
        }));
        setRows(newRows);
    },[dateFactura]);


  const [modalOpen, setModalOpen] = useState(false);
  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null); 
  const [deleteAlert,setDeleteAlert] = useState('');
  const [updateFactura,setUpdateFactura] = useState('');

const handleDeleteRow= async(targetIndex)=>{
    const rowToDelete=rows[targetIndex];
    try{
      await deleteDoc(doc(db,"factura",idDoc));
      setRows(rows.filter((_, idx) => idx !== targetIndex));
      setRowToEdit(null);
      setModalOpen(false);
      setDeleteAlert('Factura a fost stearsa cu succes');
    }catch(error){
      setDeleteAlert(error.message);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(rows[idx]);
    setModalOpen(true);
    
  };

  const handleSubmit = async (newRow) => {
    console.log('buna');
    console.log(newRow);
    
       if(rowToEdit !== null){
          console.log(rowToEdit);
          const q3 = query(collection(db, "factura"),where("numeFurnizor","==",rowToEdit.numeFurnizor));
          const querySnapshot= getDocs(q3);
          if(querySnapshot.empty){
            console.log(querySnapshot);
            const docRef= doc(db,'factura',querySnapshot.docs[0].id);
             await updateDoc(docRef,newRow);
            setUpdateFactura('Factura a fost actualizata cu succes');
          }

          
          setRows((prevRows) => {
            const updatedRows = [...prevRows];
            updatedRows[rowToEdit] = { ...newRow, id: updatedRows[rowToEdit].id };
            return updatedRows;
          });    
        setModalOpen(false);
        setRowToEdit(null);
       }
       
  };

   const handleView=()=>{
       setModalViewOpen(true);
   }

    const nav=useNavigate();

    const [imageSrc, setImageSrc] = useState('');

    const columns = [
      { field: 'numeFurnizor', headerName: 'Nume Furnizor', width: 230 },
      { field: 'dataScadenta', headerName: 'Data Scadenta', width: 230 },
      { field: 'tipFact', headerName: 'Tip Factura', width: 230 },
      { field: 'valoareaTotala', headerName: 'Valoarea Totala', width: 230 },
      { field: 'actiuni', headerName: 'Actiuni', width: 230 , 
      renderCell: (params) => (
        <div >
          <Tooltip title="Sterge factura">
            <IconButton onClick={handleDeleteRow}>
              <DeleteIcon color='secondary'/>
            </IconButton>
          </Tooltip>

          <Tooltip title="Editeaza factura">
            <IconButton onClick={handleEditRow}>
              <EditIcon color='secondary'/>
            </IconButton>
          </Tooltip>

          <Tooltip title="Vizualizeaza factura">
            <IconButton>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),} 
    ];

   

    return(
         <Box sx={{display: 'flex'}}>
           <Navig/>
             <Box sx={{marginTop: '60px'}}> 

     <div className="Facturi">

     {deleteAlert && (
            <>
           <Collapse in={open}>
            <Alert severity='info' style={{
              width:'300px',
              marginTop:'10px',
              marginLeft:'500px',
              display:'hover',
            }}  
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}> 
                <CloseIcon fontSize="inherit"/>  
              </IconButton>}>{deleteAlert}</Alert>
              </Collapse>
              </>
          )}

      {updateFactura && (
            <>
           <Collapse in={open}>
            <Alert severity='info' style={{
              width:'300px',
              marginTop:'10px',
              marginLeft:'500px',
              display:'hover',
            }}  
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}> 
                <CloseIcon fontSize="inherit"/>  
              </IconButton>}>{updateFactura}</Alert>
              </Collapse>
              </>
          )}

        <DataGrid rows={rows}
         columns={columns}
         checkboxSelection
         slots={{toolbar:CustomToolbar}}
         sx={{marginTop:'10px',
          fontSize:'18px',
          marginLeft:'40px',
          background: 'rgba( 189, 16, 224, 0.25 )',
          boxShadow:'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
          backdropFilter: 'blur( 10px )',
          WebkitBackdropFilter:' blur( 10px )',
          borderRadius:'30px'}}
          >

        </DataGrid>
             
        <Button onClick={()=>{nav('/adaugaFacturi')}} color="secondary" variant="contained"
       sx={{marginTop:'40px',marginLeft:'550px', width:'200px',
       height:'70px'}}>Adauga facturi</Button> 
     {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          // defaultValue={rowToEdit !== null && rows[rowToEdit]}
          defaultValue={rowToEdit}
        />
      )}
        
        {modalViewOpen && (
          <ModalView
             imageURL={imageSrc}
             closeModalView={()=>setModalViewOpen(false)}
          ></ModalView>
        )}


    </div>

        </Box>
    </Box>

    )
    
    }


export default Facturi