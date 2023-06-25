const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const admin = require("firebase-admin");
const serviceAccount = require('../../serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://invoice-reader-4b865.appspot.com/',
});

const app = express();
const upload = multer();

//upload.single('invoice'),
app.post('/upload',  async (req, res) => {

  try {
    const image = req.body;
    const result = await Tesseract.recognize(image);
    const extractedText = result.data.text;

    // Extrage numele furnizorului, data scadentă și valoarea totală
    const { supplierName, dueDate, totalValue } = extractInvoiceData(extractedText);

    const bucket = admin.storage().bucket();
    const file = bucket.file(`invoices/${req.file.originalname}`);
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });
    stream.end(image);

    stream.on('finish', async () => {
      const imageUrl = `https://storage.googleapis.com/gs://invoice-reader-4b865.appspot.com/invoices/`;

      res.json({ supplierName, dueDate, totalValue, imageUrl });
    });

    stream.on('error', (error) => {
      console.error('Error uploading image to Firebase:', error);
      res.status(500).json({ error: 'An error occurred' });
    });
  } catch (error) {
    console.error('Error processing invoice:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

function extractInvoiceData(text) {
  // Implementează logica de extragere a datelor din textul facturii
  // Aici poți utiliza expresii regulate (RegEx) sau alte metode pentru a identifica și extrage informațiile dorite
  // În acest exemplu, vom utiliza o expresie regulată simplă pentru a extrage numele furnizorului, data scadentă și valoarea totală
  const numeFurnRegex = /Nume furnizor: (.+)/;
  const dataScRegex = /Data scadenta: (.+)/;
  const valTotalaRegex = /(Total de plata)*[0-9].*/gmi;

  const numeFurnMatch = text.match(numeFurnRegex);
  const dataScMatch = text.match(dataScRegex);
  const valTotalaMatch = text.match(valTotalaRegex);

  const nume = numeFurnMatch ? numeFurnMatch[1] : '';
  const data = dataScMatch ? dataScMatch[1] : '';
  const valoare = valTotalaMatch ? parseInt(valTotalaMatch[1], 10) : 0;

  return { nume, data, valoare };
}

app.listen(3001, () => {
  console.log('Server merge pe portul 3001');
});
