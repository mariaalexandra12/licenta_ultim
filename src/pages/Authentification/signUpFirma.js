import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BusinessIcon from '@mui/icons-material/Business';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton , InputAdornment } from '@mui/material';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Checkbox from '@mui/material/Checkbox';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { getAuth ,createUserWithEmailAndPassword } from 'firebase/auth';
import { collection,addDoc } from "firebase/firestore";
import { db } from '../../firebaseUtils/firebase_ut';


export default function SignUpPers() {

  const [visible,setVisible] = useState();
  const nav=useNavigate();

  const EndAdornment = () =>{
    return <InputAdornment position='end'>
     <IconButton onClick={()=>{setVisible(!visible)}}>
       {visible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
     </IconButton> 
    </InputAdornment>
  }

  const Icon=()=>{
    return(
      <InputAdornment position='end'>
        <IconButton>
          <PersonIcon/>
        </IconButton>
      </InputAdornment>
    )
  }


  const [email , setEmail]=useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass]=useState('')
  const [denumireFirma,setDenumireFirma]=useState('')
  const [cif, setCif]=useState('')
  const [localitate, setLocalitate]=useState('')
  const [adresa,setAdresa]=useState('')
  const [capSoc,setCapSoc]=useState('')
  const [judet,setJudet]=useState('')
  const [ errors , setErrors] = useState([])
  const [authError,setAuthError] = useState('')
  const [platitTVA,setPlatitorTVA] = useState(false)

  const handleSubmit=(event)=>{
    event.preventDefault();
    const errors=validate();
    const auth=getAuth();
    setErrors(errors);
    if(!errors.email && !errors.password && !errors.confirmPass && !errors.adresa 
        && !errors.capSoc && !errors.cif && !errors.denumireFirma && !errors.judet && !errors.localitate){
          createUserWithEmailAndPassword(auth,email,password)
          .then((userCredential)=>{
           const user=userCredential.user;
           addDoc(collection(db,'firma'),{
            CIF:cif,
            emailFirma:email,
            judet:judet,
            localitate:localitate,
            nume:denumireFirma,
            parolaFirma:password,
            platitorTVA:platitTVA
          });
         }).catch((err)=>{
            setAuthError(err.message);
          });
          nav('/');
      }
      
  }

  const validate=()=>{
    const eroare = {};
    if(!email){
      eroare.email="Adresa de mail nu a fost introdusa.";
    }
    else if(!/(@gmail.com)/.test(email)){
         eroare.email="Adresa de mail nu are un format valid."
    }
    else{
      eroare.email='';
    }


    if(!password){
      eroare.password="Parola nu a fost introdusa.";
    }
    else if(password.length>15 || password.length<10){
         eroare.password="Parola trebuie sa contina intre 10-15 caractere."
    }
    else{
      eroare.password='';
    }


    if(!confirmPass){
       eroare.confirmPass="Nu ai introdus confirmarea parolei.";
    }
    else if(confirmPass!==password){
      eroare.confirmPass="Parola introdusa nu corespunde cu parola de mai sus.";
    }
    else{
      eroare.confirmPass='';
    }

    if(!denumireFirma){
      eroare.denumireFirma="Nu ai introdus denumirea firmei.";
    }
    else if(!/(SRL)/.test(denumireFirma)){
      eroare.denumireFirma="Denumirea trebuie sa contina SRL."
    }
    else{
      eroare.denumireFirma="";
    }

    if(!cif){
      eroare.cif="Nu ai introdus codul de inregistrare fiscala al firmei"
    }
    else{
      eroare.cif="";
    }

    
    if(!capSoc){
      eroare.capSoc="Nu ai introdus capitalul social al firmei"
    }
    else{
      eroare.capSoc="";
    }

    if(!adresa){
      eroare.adresa="Nu ai introdus adresa firmei"
    }
    else if(!/(Str.).+(nr.)/gmi.test(adresa) || !/[0-9]/.test(adresa)){
     eroare.adresa="Adresa trebuie sa fie de forma : Str.{..} nr.{..}."
    }
    else{
      eroare.adresa="";
    }

    if(!judet){
      eroare.judet="Nu ai selectat un judet din lista";
    }
    else{
      eroare.judet="";
    }

    if(!localitate){
      eroare.localitate="Nu ai selectat o localiate din lista";
    }
    else{
      eroare.localitate="";
    }
    
    return eroare;
  };
  


  const Romania = {
    judete: [
      {
        nume:'Arad',
        localitati:['Arad','Chisineu-Cris','Curtici','Ineu','Lipova','Nădlac','Sebiș']
      },
      {
        nume:'Alba',
        localitati:['Aiud','Alba Iulia','Blaj','Sebes','Abrud','Baia de Aries','Cugir','Campeni','Ocna Mures']
      },
      {
        nume:'Arges',
        localitati:['Curtea de Arges','Campulung','Pitesti','Costesti','Mioveni','Topoloveni','Stefanesti']
      },
      {
        nume:'Bacau',
        localitati:['Bacau','Moinesti','Onesti','Buhusi','Comanesti','Darmanesti','Slanic-Moldova','TarguOcna']
      },
      {
        nume: 'Bucuresti',
        localitati: ['Sector 1','Sector 2','Sector 3','Sector 4','Sector 5','Sector 6']
      },
      {
        nume:'Bihor',
        localitati: ['Beius','Marghita','Oradea','Salonta','Alesd','Nucet','Sacuieni']
      },
      {
        nume:'Bistrita-Nasaud',
        localitati:['Bistratita','Beclean','Nasaud','Sangeorz-Bai']
      },
      {
        nume:'Botosani',
        localitati:['Botosani','Albesti','Braesti','Copalau']
      },
      {
        nume:'Brasov',
        localitati:['Brasov','Codlea','Fagaras','Sacele','Ghimbav','Predeal','Rupea','Rasnov']
      },
      {
        nume:'Braila',
        localitati:['Braila']
      },
      {
        nume:'Buzau',
        localitati:['Buzau','Ramnicu Sarat','Nehoiu','Pogoanele']
      },
      {
        nume:'Caras-Severin',
        localitati:['Caransebes','Resita','Bocsa','Baile Herculane']
      },
      {
        nume:'Calarasi',
        localitati:['Calarasi','Oltenita','Budesti','Fundulea']
      },
      {
        nume:'Cluj',
        localitati:['Cluj-Napoca','Campia Turzii','Dej','Gherla','Turda']
      },
      {
        nume:'Constanta',
        localitati:['Mangalia','Constanta','Medgidia','Cernavoda','Navodari']
      },
      {
        nume:'Covasna',
        localitati:['Sfantu Gheorghe','Targu Secuiesc','Covasna']
      },
      {
        nume:'Dambovita',
        localitati:['Moreni','Targoviste','']
      },
      {
        nume:'Dolj',
        localitati:['Bailesti','Calafat','Craiova']
      },
      {
        nume:'Galati',
        localitati:['Galati','Tecuci','Targu Bujor']
      },
      {
        nume:'Giurgiu',
        localitati:['Giurgiu','Bolintin-Vale']
      },
      {
        nume:'Gorj',
        localitati:['Motru','Targu-Jiu']
      },
      {
        nume:'Harghita',
        localitati:['Gheorgheni','Miercurea Ciuc','Ordoheiu Secuiesc','Toplita']
      },
      {
        nume:'Hunedoara',
        localitati:['Brad','Deva','Hunedoara','Orastie','Petrosani']
      },
      {
        nume:'Ialomita',
        localitati:['Fetesti','Slobozia','Urziceni','Amara']
      },
      {
        nume:'Maramures',
        localitati:['Baia Mare','Sighetu Marmatiei','Baia Sprie']
      },
      {
        nume:'Mehedinti',
        localitati:['Drobeta-Turnu Severin','Orsova',]
      },
      {
        nume:'Mures',
        localitati:['Reghin','Sighisoara','Targu Mures','Tarnaveni']
      },
      {
        nume:'Neamt',
        localitati:['Piatra Neamt','Roman','Bicaz','Targu Neamt']
      },
      {
        nume:'Olt',
        localitati:['Caracal','Slatina','Corabia','Draganesti-Olt']
      },
      {
        nume:'Prahova',
        localitati:['Campina','Ploiesti','Azuga']
      },
      {
        nume:'Satu Mare',
        localitati:['Carei','Satu Mare']
      },
      {
        nume:'Salaj',
        localitati:['Zalau']
      },
      {
        nume:'Sibiu',
        localitati:['Medias','Sibiu','Avrig','']
      },
      {
        nume:'Suceava',
        localitati:['Campulung Moldovenesc','Falticeni','Rdauti','Suceava','Vatra Dornei']
      },
      {
        nume:'Teleorman',
        localitati:['Alexandria','Turnu Magurele','Rosiorii de Vede']
      },
      {
        nume:'Timis',
        localitati:['Lugoj','Timisoara','Buzias','Faget']
      },
      {
        nume:'Tulcea',
        localitati:['Tulcea','Macin','Sulina']
      },
      {
        nume:'Vaslui',
        localitati:['Barlad','Husi','Vaslui','Negresti']
      },
      {
        nume:'Valcea',
        localitati:['Dragasani','Ramnicu Valcea']
      },
      {
        nume:'Vrancea',
        localitati:['Adjud','Focsani','Marasesti','Odobesto','Panciu']
      },
      {
        nume: 'Ilfov',
        localitati: ['Voluntari', 'Pantelimon', 'Otopeni','Bragadiru','Buftea','Popesti-Leordeni']
      },
  
    ]
  };

  const handleJudet = (event) => {
    setJudet(event.target.value);
    setLocalitate('');
  };

  const handleLocalitate = (event) => {
    setLocalitate(event.target.value);
  };

  const judete=Romania.judete;
  const local=judet ? judete.find((jud) => jud.nume===judet).localitati : [];
   
  return (
    <>
    {
      authError && (
        <div>
          <Alert severity='error'>{authError}</Alert>
        </div>
      )
    }

    <Paper elevation={24} style={{
      marginLeft:"350px",
      width:"50%",
      height:'full',
      color:"primary",
      padding:"10px",
      background: 'rgba( 186, 152, 224, 0.7 )',
      boxShadow:'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', 
      backdropFilter:' blur( 11px )',
      WebkitBackdropFilter:' blur( 11px )',
      borderRadius:' 50px',
      border: '1px solid rgba( 255, 255, 255, 0.18 )',}} square="true">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <BusinessIcon />
          </Avatar>
          <Typography component="h1" style={{fontSize:'20px'}} variant='h6'>
           Suntem aproape gata!</Typography>
           <Typography variant='h6' 
           style={{fontSize:'20px',justifyContent:'center'}}
           >Trebuie sa introduci datele firmei pentru a crea contul: 
         </Typography> 
        
          <Box component="form" noValidate  sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            
              <Grid item xs={12} sm={6}>
              
                <TextField
                  autoComplete="given-name"
                  required
                  name="denFirma"
                  fullWidth
                  id="denFirma"
                  label="Denumire Firma"
                  autoFocus
                  onChange={(e)=>setDenumireFirma(e.target.value)}
                 ></TextField>
            
            {errors.denumireFirma && (
              <div>
              <Alert severity="error">
                {errors.denumireFirma}
              </Alert>
              </div>
             )}
              </Grid>


              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  id="cif"
                  label="CIF"
                  name="cif"
                  onChange={(e)=>setCif(e.target.value)}
                 ></TextField>
                 {errors.cif && (
              <div>
              <Alert severity="error">
                {errors.cif}
              </Alert>
              </div>
             )}
                
              </Grid>

              <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
               <InputLabel>Judet</InputLabel>
               <Select
               required
                 labelId="judet"
                 id="judet"
                 value={judet}
                 label="Judet"
                 onChange={handleJudet}>
                 {
                  judete.map((jud)=>(
                    <MenuItem key={jud.nume} value={jud.nume}>{jud.nume}</MenuItem>
                  ))
                 }
               </Select>
               </FormControl>
               {errors.judet && (
              <div>
              <Alert severity="error">
                {errors.judet}
              </Alert>
              </div>
             )}
              </Grid>

              <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
              <InputLabel id="local">Localitate</InputLabel>
              <Select
              required
                 labelId="local"
                 id="demo-simple-select"
                value={localitate}
                label="Localitate"
                 onChange={handleLocalitate}>
                {
                  local.map((loc)=>(
                    <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                  ))
                }

               </Select>
               </FormControl>
               {errors.localitate && (
              <div>
              <Alert severity="error">
                {errors.localitate}
              </Alert>
              </div>
             )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="adr"
                  label="Adresa"
                  name="adr"
                  onChange={(e)=>setAdresa(e.target.value)}
                 ></TextField>
                 {errors.adresa && (
              <div>
              <Alert severity="error">
                {errors.adresa}
              </Alert>
              </div>
             )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                type="number"
                  required
                  fullWidth
                  id="capSoc"
                  label="Capital Social"
                  name="capSoc"
                  onChange={(e)=>setCapSoc(e.target.value)}
                 ></TextField>
                    {errors.capSoc && (
                <div>
                 <Alert severity="error">
                    {errors.capSoc}
                 </Alert>
               </div>
             )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                required
                  fullWidth
                  id="email"
                  label="Adresa de email a firmei"
                  name="emailFirma"
                  autoComplete="emailFirma"
                  InputProps={{
                    endAdornment:<Icon/>,
                  }}
                  onChange={(e)=>setEmail(e.target.value)}></TextField>
                {errors.email && (
              <div>
              <Alert severity="error">
                {errors.email}
              </Alert>
              </div>
             )}
              </Grid>


              <Grid item xs={12}>
               <TextField
                  required
                  fullWidth
                  name="password"
                  label="Parola"
                  type={visible ? "text":"password"}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: <EndAdornment/>,
                  }}
                  onChange={(e)=>setPassword(e.target.value)}
                  />
                  {errors.password && (
              <div>
              <Alert severity="error">
                {errors.password}
              </Alert>
              </div>
             )}
                  
                  
              </Grid>
         
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirma Parola"
                  type={visible ? "text":"password"}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: <EndAdornment/>,
                  }}
                  onChange={(e)=>setConfirmPass(e.target.value)}/>
                   {errors.confirmPass && (
                  <div>
                    <Alert severity="error">
                      {errors.confirmPass}
                    </Alert>
                  </div>
                 )}
              </Grid>
             
             <div style={{marginLeft:'20px',marginTop:'10px',fontSize:'18px'}}>
              <label>Platitor de TVA</label>
              <Checkbox checked={platitTVA} color="secondary" onChange={(e)=>
                setPlatitorTVA(e.target.value)}>
              </Checkbox>
              </div>

            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
              onClick={handleSubmit}
            >
              Intra in cont
            </Button>

            </form>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/" color="secondary" underline='hover'>
                  Ai deja un cont? Intra in cont!
                </Link>
                <p style={{fontSize:'15px',opacity:'0.6'}}
                >Doar campurile marcate cu * sunt obligatorii</p>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

    </Paper>
    </>
  );
}