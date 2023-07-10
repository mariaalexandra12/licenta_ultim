// import React,{ useState , useEffect } from 'react';
// import Navig from "../../components/Navig";
// import { Box, Button } from '@mui/material';
// import { useUserAuth } from '../../context/userAuthContext';
// import { collection, query, where, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
// import { db } from '../../firebaseUtils/firebase_ut';


// const Analiza=()=>{

//      const { currentUser }=useUserAuth();
//      const [dateFactura, setDateFactura] = useState([]);
//      const [idDoc, setIdDoc] = useState('');

//      useEffect(() => {
//       const q2 = query(collection(db, 'factura'), where('emailUtilizator', '==', currentUser));
//       const unsub = onSnapshot(q2, (snapshot) => {
//         const items = [];
//         snapshot.forEach((doc) => {
//           items.push(doc.data());
//           setIdDoc(doc.id);
//         });
//         setDateFactura(items);
//       });
//       return () => {
//         unsub();
//       };
//       console.log(dateFactura);
//     }, [currentUser]);

    
//     return (
//         <>
//         <Box sx={{display: 'flex'}}>
//         <Navig/>
//         <Box sx={{marginTop: '80px'}}>
       
//         </Box>
    
//         </Box>
//         </>
//     )

// }

// export default Analiza