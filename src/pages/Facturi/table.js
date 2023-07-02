import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './table.css';
import { IconButton } from "@mui/material";

export const Table = ({ rows, deleteRow, editRow }) => {
    return (
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Nr Factura</th>
              <th className="expand">Nume Furnizor</th>
              <th>Data Scadenta</th>
              <th>Tip Factura</th>
              <th>Valoare Totala</th>
              <th>Actiuni</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
            //   const statusText =
            //     row.status.charAt(0).toUpperCase() + row.status.slice(1);
  
              return (
                <tr key={idx}>
                  <td>{row.page}</td>
                  <td className="expand">{row.numeFurnizor}</td>
                  <td>
                    <span className={`label label-${row.status}`}>
                      {statusText}
                    </span>
                  </td>
                  <td className="fit">
                    <span className="actions">
                        <IconButton className="delete-btn">
                      <DeleteIcon
                        onClick={() => deleteRow(idx)}
                      />
                      </IconButton>
                      
                      <IconButton  className="edit-btn" >
                      <EditIcon

                        onClick={() => editRow(idx)}
                      />
                      </IconButton>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };