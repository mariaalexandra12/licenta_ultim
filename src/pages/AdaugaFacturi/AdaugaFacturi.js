import React from 'react';



function AdaugaFacturi() {


  return (
    <div>
       <h1 style={{marginLeft:"500px"}}>Incarca Facturi</h1>
       <form style={{marginLeft:"500px"}}>
         <div className="formElements">
            <input type='file' onChange={(e)=>{console.log(e.target.files[0])}}></input>
            <button>Show file</button>
         </div>
       </form>
    </div>
  );
}

export default AdaugaFacturi
