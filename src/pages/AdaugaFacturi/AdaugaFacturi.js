import React, { useState } from 'react';


const firebaseConfig = {
  apiKey: "AIzaSyBj-1iw_5zOCZE-RZ1kzuy_wcb58XuW_1M",
  authDomain: "invoice-reader-4b865.firebaseapp.com",
  databaseURL: "https://invoice-reader-4b865-default-rtdb.firebaseio.com",
  projectId: "invoice-reader-4b865",
  storageBucket: "invoice-reader-4b865.appspot.com",
  messagingSenderId: "1079218684020",
  appId: "1:1079218684020:web:759261781a389b346bd121"
};




function AdaugaFacturi() {
  const [selectedImage,setSelectedImage]=useState();
  const imageChange=(event)=>{
    if(event.target.files && event.target.files.length >0){
        setSelectedImage(event.target.files[0]);
    }
  }  
  
  const onSubmit=(event)=>{
    event.preventDefault();
    alert(URL.createObjectURL(selectedImage));
  }
  return (
    <div>
       <h1 style={{marginLeft:"500px"}}>Incarca Facturi</h1>
       <form onSubmit={onSubmit} style={{marginLeft:"250px"}}>
         <div className="formElements">
            <div className="row">
            <label>Alege factura</label>
            <br/>
            <input type='file' onChange={imageChange}></input>
            </div><br/>
            <button type='submit'>Upload file</button>
         </div>
         <div style={{
                marginTop:"20px",
                marginLeft:"0px",
                display: "flex",
                flexDirection: "column",
            }}>
                <img src={URL.createObjectURL(selectedImage)} alt="img"
                style={{
                    maxHeight:"420px",
                    maxWidth:"400px",    
                }}/>
            </div>
       </form>
    </div>
  );
}

export default AdaugaFacturi
