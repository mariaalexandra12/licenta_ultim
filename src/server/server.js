const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const admin = require('firebase/firebase')
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://invoice-reader-4b865.appspot.com/',
});

const app = express();
const upload = multer();

app.post('/upload', upload.single('invoice'), async (req, res) => {
  try {
    const image = req.file.buffer;

    const result = await Tesseract.recognize(image);
    const extractedText = result.data.text;

    // Extrage numele furnizorului, data scadentă și valoarea totală
    const { numeFurn, dataSc, valTotal } = extractInvoiceData(extractedText);

    const bucket = admin.storage().bucket();
    const file = bucket.file(`invoices/${req.file.originalname}`);
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });
    stream.end(image);

    stream.on('finish', async () => {
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

      // Salvare în baza de date Firebase
      const database = admin.firestore();
      const invoiceRef = await database.collection('invoices').add({
        numeFurnizor: '',
        dataScadenta: '',
        valoareTotala: 0,
        urlImagine: imageUrl,
      });

    });

    stream.on('error', (error) => {
      console.error('Nu am putut incarca imaginea in Firebase:', error);
      res.status(500).json({ error: 'A aparut o eroare' });
    });
  } catch (error) {
    console.error('Eroare procesare factura', error);
    res.status(500).json({ error: 'A aparut o eroare' });
  }
});

function extractInvoiceData(text) {
  // Implementează logica de extragere a datelor din textul facturii
  // Aici poți utiliza expresii regulate (RegEx) sau alte metode pentru a identifica și extrage informațiile dorite
  // În acest exemplu, vom utiliza o expresie regulată simplă pentru a extrage numele furnizorului, data scadentă și valoarea totală
  const numeFurnRegex = /Nume furnizor: (.+)/;
  const dataScRegex = /Data scadenta: (.+)/;
  const valTotalaRegex = /Valoare totala: (\d+)/;

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
