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
import { db } from '../../firebaseUtils/firebase_ut';
import { collection, query, 
  where, 
  getDocs,
  onSnapshot, doc,
  deleteDoc,
  updateDoc} from "firebase/firestore";
import ModalView from './modalView';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

const actions = [
    { icon: <FileCopyIcon />, name: 'Copiaza datele' },
    { icon: <SaveIcon />, name: 'Salveaza datele' },
    // { icon: <PrintIcon />, name: 'Print' },
    // { icon: <ShareIcon />, name: 'Share' },
  ];

  

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
          setIndexFact(+1);
        })
        return ()=>{
            unsub();
        }
        },[currentUser])

    useEffect(()=>{
        dateFactura.map((fact)=>console.log(fact));
        console.log(idDoc);
        const newRows=dateFactura.map((fact)=>({
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
    // const rowToEdit= rows[idx];
    // setRowToEdit({...rowToEdit, id: rowToEdit.id});
    setRowToEdit(idx);
    setModalOpen(true);

  };

  const handleSubmit = async (newRow) => {
    // rowToEdit === null
    //   ? setRows([...rows, newRow])
    //   : setRows(
    //       rows.map((currRow, idx) => {
    //         if (idx !== rowToEdit) return currRow;

    //         return newRow;
    //       })
    //     );

       if(rowToEdit !== null && rows[rowToEdit]?.id){
        try{
          const rowToUpdate=rows[rowToEdit];
          console.log(rowToUpdate);
          const docRef=doc(db,"factura",rowToUpdate.id);
          await updateDoc(docRef,newRow);
          setUpdateFactura('Factura a fost actualizata cu succes');
          // setRows(
          //   rows.map((currRow,idx)=>{
          //     if(idx !== rowToEdit) return currRow;
          //     return {...newRow, id:currRow.id};
          //   })
          setRows((prevRows) => {
            const updatedRows = [...prevRows];
            updatedRows[rowToEdit] = { ...newRow, id: updatedRows[rowToEdit].id };
            return updatedRows;
          });    
        }catch(err){
          setUpdateFactura(err.message);
        }
        setModalOpen(false);
       }
       
  };

   const handleView=()=>{
       setModalViewOpen(true);
   }

    const nav=useNavigate();

    const [imageSrc, setImageSrc] = useState('');

    // useEffect(() => {
    //   // Obțineți link-ul blob
    //   console.log(dateFactura['imgUrl']);
    //   const blobUrl = dateFactura['imgUrl']
  
    //   fetch(blobUrl)
    //     .then((response) => response.blob())
    //     .then((blob) => {
    //       // Creează un obiect FileReader pentru a citi conținutul obiectului Blob
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         // Când citirea este finalizată, setează sursa imaginii
    //         setImageSrc(reader.result);
    //       };
    //       reader.readAsDataURL(blob);
    //     });
    //     console.log(imageSrc)
    // }, []);

    return(
         <Box sx={{display: 'flex'}}>
           <Navig/>
             <Box sx={{marginTop: '80px'}}> 

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

        <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} viewImage={handleView}/>
        <Button onClick={()=>{nav('/adaugaFacturi')}} color="secondary" variant="contained"
       sx={{marginTop:'30px',marginLeft:'500px'}}>Adauga facturi</Button> 
     {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
        
        {modalViewOpen && (
          <ModalView
             imageURL={imageSrc}
             closeModalView={()=>setModalViewOpen(false)}
          ></ModalView>
        )}


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