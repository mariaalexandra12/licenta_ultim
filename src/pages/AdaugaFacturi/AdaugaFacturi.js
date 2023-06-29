import React,{ useState ,useEffect} from "react";
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
import { collection , doc ,getDoc, getDocs,addDoc} from "firebase/firestore";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import { createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const theme = createTheme();

function AdaugaFacturi(){
const [open, setOpen] = React.useState(true);

  const [selectedFile, setSelectedFile]=useState();
  const [numeFur,setNumeFur]=useState('');
  const [dataSc,setDataSc]=useState('');
  const [val,setVal]=useState('');
  const [eroareExtras,setEroareExtras]=useState('');
  const [stareIncarca,setStareIncarca]=useState('');
  const [categorii, setCategorii]=useState([]);
  const [succes, setSucces]=useState('');

  
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  
      useEffect(()=>{
        const categorieRef=collection(db,'categorie');
        const docRef=doc(categorieRef,'jTFKu2tvZWZhD9fua4uz');
        getDoc(docRef).then((d)=>{
          if(d.exists()){
            setCategorii(Object.values(d.data()))
          }
          else{
            console.log('nu exista doc')
          }
        }).catch(err=>{console.log(err)});
        
      },[]);
   
  const extrageDateFactura= async ()=>{
      categorii.forEach(el=>console.log(el));
       if(selectedFile){
        console.log(selectedFile);
        try {
          const formData=new FormData();
          formData.append('invoice',selectedFile);
          const raspuns= await fetch('http://localhost:3001/upload', {
          method: 'POST',
          body:formData,
        });
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
    //event.preventDefault();
    // try {
      const facturaRef=addDoc(collection(db,'factura'),{
        dataScadenta:dataSc,
        imgUrl:URL.createObjectURL(selectedFile),
        numeFurnizor:numeFur,
        tipFactura:catFactura,
        valoareTotala:val
      });
      setSucces('Factura a fost inregistrata cu succes!');
    //   }catch(err){
    //     setStareIncarca(err.message)
    // } 
  };

  const [catFactura , setCatFactura]=useState('');
  const fileInputRef = React.useRef(null);

  return(    
    <div >
    <Box sx={{display: 'flex'}}>
    <Navig/>
    <Paper elevation={24} style={{
      marginTop:'80px',
      // marginLeft:'20px',
      width:'calc(100% + 600px)',
      display:'flex',
      background: 'rgba( 24, 4, 4, 0.3 )',
      boxShadow:'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', 
      backdropFilter:' blur( 11px )',
      WebkitBackdropFilter:' blur( 11px )',
      borderRadius:' 50px',
      border: '1px solid rgba( 255, 255, 255, 0.18 )',
    }} >
    <Box sx={{marginTop: '-40px',
    display:'flex',
     }}>
     
      <Box sx={{flexDirection: 'column'}}>
      
      <div >      
      
      {
        <>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <Tooltip title="Adaugă o factură">
          <IconButton onClick={handleButtonClick} style={{ marginLeft: '140px', width: '90px', height: '90px', marginTop: '50px' }}>
            <AddCircleIcon color="secondary" style={{ width: '70px', height: '70px' }} />
          </IconButton>
        </Tooltip>
      </>
      }
      <Typography color="secondary" sx={{marginLeft:'50px'}}
      >Apasa aici pentru a adauga o factura</Typography>

      </div>
     
      {selectedFile && (
        <div>
          <img src={URL.createObjectURL(selectedFile)} alt="" style={{
        width:"600px",
        height:"600px",
        marginLeft:'15px',
        }}></img>
        </div>
      )}
       
    </Box>
    </Box>

    <Box component="form" noValidate sx={{ 
      mt: 1 ,
      marginTop:'10px',
      marginLeft:'80px',
      width:'400px',
      flexDirection: 'column'
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
      <Typography color="secondary" sx={{marginLeft:'50px'}}
      >Apasa aici pentru a extrage datele facturii</Typography>
      {eroareExtras && (<>
        <Alert severity="warning">
          {eroareExtras}
        </Alert>
      </>)}
      {/* <div className="dSc" style={{display:'flex',flexDirection:'row'}}> */}
      
      <FormControl fullWidth style={{marginTop:'10px'}}>
           
           <div className="nFunr" style={{display:'flex',flexDirection:'row',marginTop:'10px'}}>
              <label style={{marginTop:'20px'}}>Denumire Furnizor</label>
              <input type="text" defaultValue={numeFur} style={{
                width:'300px',
                height:'50px',
                borderRadius:'5px',
                background:'transparent',
              }}
              onChange={(e)=>setNumeFur(e.target.value)}
              ></input>
           </div>

           <div className="totPlata" style={{display:'flex',flexDirection:'row',marginTop:'10px'}}>
              <label style={{marginTop:'20px'}}>Total de plata</label>
              <input type="text" defaultValue={val} style={{
                width:'300px',
                height:'50px',
                borderRadius:'5px',
                background:'transparent',
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
                background:'transparent',
              }}
              onChange={(e)=>setDataSc(e.target.value)}
              ></input>
            </div>
     
            <FormControl fullWidth style={{marginTop:'10px'}}>
               <InputLabel id="categorieFactura">Categorie Factura</InputLabel>
                  <Select value={catFactura}
                  labelId="catFactura"
                  required
                  onChange={(e)=>setCatFactura(e.target.value)}>
                 {
                   categorii.map((loc) => {
                  return loc.map((el) => (
                    <MenuItem key={el} value={el}>
                        {el}
                      </MenuItem>
                    ));
                   })
                 }

                  </Select>
              </FormControl>
            
              <Button
              fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
             color="secondary" 
             onClick={handleInregistrare}>Inregistreaza factura </Button>

          
          </FormControl>

          {stareIncarca && (<>
          <Alert severity="warning">
            {stareIncarca}
          </Alert>
          </>)}

          {succes && (
            <>
           <Collapse in={open}>
            <Alert severity="success" style={{
              width:'300px',
              marginTop:'10px',
              marginLeft:'50px',
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
              </IconButton>}>{succes}</Alert>
              </Collapse>
              </>
          )}
          
          
          
        
        </Box>
        </Paper>
       </Box>
    </div>
)

}

export default AdaugaFacturi;