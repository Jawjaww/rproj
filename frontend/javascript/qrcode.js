const express = require('express');
const qrCode = require('qr-image');

const app = express();

app.get('/qrcode/:tableId', (req, res) => {
  const { tableId } = req.params;

  // Générer un QR code contenant l'ID de la table
  const qrCodeData = qrCode.imageSync(tableId, { type: 'svg' });

  // Envoyer le QR code au client
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(qrCodeData);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
