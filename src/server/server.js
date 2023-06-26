const express = require('express');
const multer = require('multer');
const cors=require('cors');
const Tesseract = require('tesseract.js');
const admin = require("firebase-admin");
const serviceAccount = require('../../serviceAccount.json');

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

    
    const { supplierName, dueDate, totalValue } = extractInvoiceData(extractedText);
    res.json({ supplierName, dueDate, totalValue});
    // const bucket = admin.storage().bucket();
    // const file = bucket.file(`invoices/${req.file.originalname}`);
    // const stream = file.createWriteStream({
    //   metadata: {
    //     contentType: req.mimetype,
    //   },
    // });
    // stream.end(image);

    // stream.on('finish', async () => {
    //   const imageUrl = `https://storage.googleapis.com/gs://invoice-reader-4b865.appspot.com/invoices/`;

     
    // });
  
    // stream.on('error', (error) => {
    //   console.error('Error uploading image to Firebase:', error);
    //   res.status(500).json({ error: 'An error occurred' });
    // });
  } catch (error) {
    console.error('Error processing invoice:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

function extractInvoiceData(text) {
  console.log(text);
  const numeFurnRegex = /Nume furnizor: (.+)/;
  const dataScRegex = /Data scadenta: (.+)/;
  const valTotalaRegex = /(Total de plata)*[0-9].*/gmi;

  const numeFurnMatch = text.match(numeFurnRegex);
  const dataScMatch = text.match(dataScRegex);
  const valTotalaMatch = text.match(valTotalaRegex);

  const nume = numeFurnMatch ? numeFurnMatch[1] : '';
  const data = dataScMatch ? dataScMatch[1] : '';
  const valoare = valTotalaMatch ? valTotalaMatch[1]:'';


  console.log('------',nume,data,valoare);
  return { nume, data, valoare };
}

app.listen(3001, () => {
  console.log('Server merge pe portul 3001');
});
