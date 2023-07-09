const express = require('express');
const multer = require('multer');
const cors=require('cors');
const Tesseract = require('tesseract.js');
const admin = require("firebase-admin");
const serviceAccount = require('../../../serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://invoice-reader-4b865.appspot.com/',
});

const app = express();
const upload = multer().single('invoice');
app.use(cors());

app.post('/upload',upload,async (req, res) => {

  try {
    const image = req.file.buffer;
    const result = await Tesseract.recognize(image);
    const extractedText = result.data.text;
    const dat= extractInvoiceData(extractedText);
    console.log(dat.nume);
    console.log(dat.data);
    console.log(dat.valoare);
    res.json({dat});
  } catch (error) {
    console.error('Error processing invoice:', error);
    res.status(500).json({ error: 'An error occurred' });
  

  }
});
function extractInvoiceData(text) {
  console.log(text);
  const numeFurnRegex = /(Furnizor:)\s*[a-zA-z\s]*(SRL||SA||SC)\s/gmi;
  const dataScRegex = /[0-3]?[0-9][\/\-.][0-3]?[0-9][\/\-.][0-9]?[0-9]?[0-9][0-9]/gmi;
  const valTotalaRegex = /(Total de plata$)\s*[a-zA-Z\W\s]*[0-9\W]*/gmi;
  const numeFurnMatch = text.match(numeFurnRegex);
  const dataScMatch = text.match(dataScRegex);
  const valTotalaMatch=text.match(valTotalaRegex);

  // const nume = numeFurnMatch > 0? numeFurnMatch[0]:'';
  const data =  dataScMatch.length > 0 ? dataScMatch[1]:'' ;
  const valoare =  valTotalaMatch > 0? valTotalaMatch[0]:'';
 
//  console.log(nume);
 console.log(data);
 console.log(valoare);
 const ras={nume,data,valoare};
  return ras;
}
app.listen(3001, () => {
  console.log('Server merge pe portul 3001');
});
