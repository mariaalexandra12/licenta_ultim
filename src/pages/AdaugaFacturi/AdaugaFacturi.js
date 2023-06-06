import React from "react";

export default function AdauagaFacturi(){
  return(
    <div class="pdfwork">
      <span>Select PDF</span>
      <input type="file" class="selectpdf"></input>
      <button class="upload">Upload</button>
      <div class="afterupload">
        <span>Select Page</span>
        <select class="selectPage"></select>
      </div>
    </div>
  )
}