import React,{ useState , useCallback} from "react";
import "./uploader.css";
import { Alert, Box, Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Navig from "../../components/Navig";
import Card from '@mui/material/Card';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { db, storage } from "../../firebaseUtils/firebase_ut";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import firebase from 'firebase/app';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { collection ,
  getDoc,
  getDocs,
   addDoc,
   updateDoc, 
   doc} from "firebase/firestore";

function AdaugaFacturi(){
  const [selectedFile, setSelectedFile]=useState();

  const [numeFur,setNumeFur]=useState('');
  const [dataSc,setDataSc]=useState('');
  const [val,setVal]=useState('');
  //const [urlImage,setUrlImage]=useState('');
  const [eroareExtras,setEroareExtras]=useState('');
  const [stareIncarca,setStareIncarca]=useState('');

  const extrageDateFactura= async ()=>{
       if(selectedFile){
        console.log(selectedFile);
        try {
          const formData=new FormData();
          formData.append('invoice',selectedFile);
          const raspuns= await fetch('http://localhost:3001/upload', {
          method: 'POST',
          body:formData,
        });
        // console.log(res);
        if(raspuns.ok){
           raspuns.json().then(matr=>{
            const array=Object.keys(matr).map(key=>
              [key,matr[key]]);
              const d=array[0];
              const o=JSON.stringify(d[1]);
              const jsonObj=JSON.parse(o);
              setNumeFur(jsonObj.nume);
              setDataSc(jsonObj.data);
              setVal(jsonObj.valoare);
              });
            }
          }catch(err){
            setEroareExtras(err.message);
          }
         }
         }
     


  const handleInregistrare=()=>{
    try {
      const invoiceRef =db.collection('facturi').add({
        numeFur,
        dataSc,
        val,
        //urlImage,
      });
      }catch(err){
        setStareIncarca(err.message);
      // Succes! Datele au fost încărcate în baza de date Firebase
    } 
  };


  return(    
    <>
    <Box sx={{display: 'flex'}}>
    <Navig/>
    <Box sx={{marginTop: '50px',
    display:'flex',
     }}>
      <Box sx={{marginLeft:'15px',flexDirection: 'column'}}>

      <div >
      <input type="file" onChange={(e)=>setSelectedFile(e.target.files[0])} style={{display:'none'}} />
        <Card sx={{ minWidth: 275 , marginTop:"50px" ,
      background: 'rgba( 177, 94, 241, 0.25 )',
      boxShadow:' 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      backdropFilter:' blur( 4px )',
      WebkitBackdropFilter: 'blur( 4px )',
      borderRadius:' 10px',
      border: '1px solid rgba( 255, 255, 255, 0.18 )'}}>
        <CardContent>
         <form>
          <input type="file" onChange={(e)=>setSelectedFile(e.target.files[0])}
          ></input>
          
         </form>
       </CardContent>
    </Card>

      </div>
     
      {selectedFile && (
        <div>
          <img src={URL.createObjectURL(selectedFile)} alt="" style={{
        width:"450px",
        height:"500px",
        }}></img>
        </div>
      )}
       
    </Box>
    </Box>

    <Box component="form" noValidate sx={{ 
      mt: 1 ,
      marginTop:'100px',
      marginLeft:'200px',
      width:'400px',
     }}>
      
      <Tooltip title="Extrage datele facturii">
        <IconButton  style={{
        marginLeft:'140px',
        width:'90px',
        height:'90px',
      }}
      onClick={extrageDateFactura}
      >
      <DocumentScannerIcon color="secondary" style={{
        width:'70px',
        height:'70px',
      }}>
      </DocumentScannerIcon>
      </IconButton>
      </Tooltip>
      {eroareExtras && (<>
        <Alert severity="warning">
          {eroareExtras}
        </Alert>
      </>)}
      <div className="dSc" style={{display:'flex',flexDirection:'row'}}>
              <label style={{marginTop:'20px'}}>Denumire Furnizor</label>
              <input type="text" defaultValue={numeFur} style={{
                width:'300px',
                height:'50px',
                borderRadius:'5px',
                background:'aliceblue',
              }}
              onChange={(e)=>setNumeFur(e.target.value)}
              ></input>
           </div>

           <div className="dSc" style={{display:'flex',flexDirection:'row',marginTop:'10px'}}>
              <label style={{marginTop:'20px'}}>Total de plata</label>
              <input type="text" defaultValue={val} style={{
                width:'300px',
                height:'50px',
                borderRadius:'5px',
                background:'aliceblue',
              }}
              onChange={(e)=>setVal(e.target.value)}
              ></input>
             </div>

            <div className="dSc" style={{display:'flex',flexDirection:'row',marginTop:'10px'}}>
              <label style={{marginTop:'10px'}}>Data Scadenta</label>
              <input type="text" defaultValue={dataSc} style={{
                width:'300px',
                height:'50px',
                borderRadius:'5px',
                background:'aliceblue',
              }}
              onChange={(e)=>setDataSc(e.target.value)}
              ></input>
            </div>

            <FormControl fullWidth style={{marginTop:'10px'}}>
      <InputLabel id="categorieFactura">Categorie Factura</InputLabel>
       <Select
    labelId="categorieFactura"
    id="demo-simple-select"
    //value={age}
    label="Age"
    // onChange={handleChange}
  >
    {/* <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem> */}
  </Select>
</FormControl>
              <Button
              fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="secondary" onClick={handleInregistrare}>
            Inregistreaza factura 
          </Button>
          {stareIncarca && (<>
          <Alert severity="warning">
            {stareIncarca}
          </Alert>
          </>)}

        </Box>

    </Box>
    </>
)

}

export default AdaugaFacturi;