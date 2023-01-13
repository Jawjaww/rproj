const express = require('express');
const router = express.Router();

// Import du module qr-image pour générer un QR code
const qr = require('qr-image');

// Import du module tablesController à partir du fichier tables.js dans le répertoire controllers
const tablesController = require('../controllers/tables');

// Route qui retourne le total des commandes pour une table donnée
router.get('/api/tables/:id/orders', tablesController.getOrdersByTable);

// Route qui ajoute une commande pour une table donnée
router.post('/api/tables/:id/orders', tablesController.addOrder);

// Route qui génère un QR code pour une table donnée
router.get('/tables/:id/qr-code', (req, res, next) => {
  // Récupération de l'ID de la table à partir de l'URL
  const tableId = parseInt(req.params.id, 10);

  // Utilisation de la fonction getTableById du module tablesController pour récupérer la table correspondante
  const table = tablesController.getTableById(tableId);

  // Si la table n'a pas été trouvée, retourne une erreur 404 (Not Found)
  if (!table) {
    const err = new Error("Table non trouvée");
    err.status = 404;
    return next(err);
  }

  // Si la table n'est pas disponible, retourne une erreur 400 (Bad Request)
  if (!table.available) {
    const err = new Error("Table non disponible");
    err.status = 400;
    return next(err);
  }

  // Mise à jour de la disponibilité de la table
  table.available = false;

  // Génération du QR code en utilisant l'URL de la table comme contenu
  const qrCode = qr.imageSync(`https://monrestaurant.com/table/${tableId}`, { type: 'svg' });

  // Envoi du QR code en réponse
  res.type('svg');
  res.send(qrCode);
});

// Gestion des erreurs
router.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send("Désolé, nous n'avons pas pu trouver ce que vous cherchiez");
  } else if (err.status === 400) {
    res.status(400).send("Désolé, cette table n'est pas disponible pour le moment");
  } else {
    res.status(500).send("Une erreur inattendue est survenue, veuillez réessayer plus tard");
  }
});

module.exports = router;
