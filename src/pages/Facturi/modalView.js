import React from 'react';
 

const ModalView=({imageURL, closeModalView})=>{

   return (

    <div className="model-container-view" style={{
    width:'450px' ,
    backgroundColor:' rgba( 92, 9, 92, 0.25 )',
    boxShadow:' 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter:' blur( 15px )',
    WebkitBackdropFilter:' blur( 15px )',
    borderRadius: '20px',
   border:' 1px solid rgba( 255, 255, 255, 0.18 )',
   padding: '2rem',
    }}
    onClick={(e) => {
        if (e.target.className === "modal-container") closeModalView();
      }}
    >
       <img src={imageURL} alt=""></img>
    </div>
   )
}

export default ModalView