import React, { useState } from "react";
import "./modal.css";
import { Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import Draggable from 'react-draggable';


export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      dataScadenta: "",
      valoareTotala:"",
      tipFactura: "utilitati",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.dataScadenta && formState.valoareTotala && formState.tipFactura) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    const updatedFormState = {
      dataScadenta:formState.dataScadenta,
      valoareTotala:formState.valoareTotala,
      tipFactura:formState.tipFactura,
    };
    onSubmit(updatedFormState);
    
    console.log(updatedFormState);
    closeModal();
  };

  return (
    
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
       
        <form>
          <div className="form-group">
            <label>Data Scadenta</label> 
             <input type="text" name="dataScadenta" onChange={handleChange} 
               defaultValue={formState.dataScadenta} />
           
          </div>
          <div className="form-group">
            <label htmlFor="valoareTotala">Valoare Totala</label>
            <input type="text" name="valoareTotala"
              
              onChange={handleChange}
              defaultValue={formState.valoareTotala}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Tip Factura</label>
            <select
              name="tipFactura"
              onChange={handleChange}
              value={formState.tipFactura}
            >
              <option value="utilitati">Utilitati</option>
              <option value="mentenanta">Mentenanta</option>
              <option value="inventar">Inventar</option>
              <option value="materii prime">Materii prime</option>
              <option value="nedefinit">Nedefinit</option>
            </select>
          </div>
          {errors && <div className="error">{`Nu ai completat: ${errors}`}</div>}
          <Button color="secondary" variant="contained" type="submit" className="btn" onClick={handleSubmit} startIcon={<UpgradeIcon/>}>
            Actualizeaza datele facturii
          </Button>
        </form>
        
      </div>
    </div>
  
  );
};