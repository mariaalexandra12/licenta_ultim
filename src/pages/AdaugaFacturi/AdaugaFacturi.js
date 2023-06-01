import React, { useState } from 'react';

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
