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
  const numeFurnRegex = /(Enel Energie Muntenia SA)/gmi;
  const dataScRegex = /Data scadenti: (\d{2}\.\d{2}\.\d{4})/;
  // const valTotalaRegex = /Valoare factura curenta \s*(\d{2},\d{2}) lei/gmi;
  const valTotalaRegex=/\d{0,3}?[,]?\d{0,3}?[,]?\d{0,3}?[,]?\d{0,3}?[,]?\d{0,3}[.]\d{2}/g;


  const numeFurnMatch = text.match(numeFurnRegex);
  const dataScMatch = text.match(dataScRegex);
  const valTotalaMatch = text.match(valTotalaRegex);

  const nume = numeFurnMatch? numeFurnMatch[0]:'';
  const data =  dataScMatch? dataScMatch[0]:'' ;
  const valoare =  valTotalaMatch? valTotalaMatch[0]:'';


 console.log(nume);
 console.log(data);
 console.log(valoare);
 const ras={nume,data,valoare};
  return ras;
  //return { numeFurnMatch , dataScMatch, valTotalaMatch};
}

app.listen(3001, () => {
  console.log('Server merge pe portul 3001');
});
