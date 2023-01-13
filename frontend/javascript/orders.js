const express = require('express');

const app = express();

// On utilise une base de données pour stocker les informations sur les tables et les commandes
const db = {
  tables: {
    // Chaque clé est le numéro de la table, et la valeur est l'ID du groupe de clients actuellement assis à cette table
    1: null,
    2: null,
    3: null
  },
  orders: {
    // Chaque clé est l'ID du groupe de clients, et la valeur est un tableau de produits commandés
    'abc123': [],
    'def456': []
  }
};

app.get('/table/:tableId', (req, res) => {
  // Récupère l'ID de la table passé en paramètre
  const tableId = req.params.tableId;

  // Récupère l'ID du groupe de clients actuellement assis à cette table
  const currentGroup = db.tables[tableId];

  let html = `<h1>Table ${tableId}</h1>`;

  if (currentGroup) {
    // Si un groupe est déjà assigné à cette table, affiche la liste des produits commandés
    html += '<h2>Commande en cours :</h2>';
    html += '<ul>';
    db.orders[currentGroup].forEach((product) => {
      html += `<li>${product}</li>`;
    });
    html += '</ul>';
  } else {
    // Sinon, affiche un formulaire permettant de créer un nouveau groupe et de scanner le code QR
    html += '<form method="post" action="/table/' + tableId + '/group">';
    html += '<label for="group">Scannez le code QR de votre table pour créer un nouveau groupe de commande :</label>';
    html += '<input type="text" name="group" />';
    html += '<input type="submit" value="Créer le groupe" />';
    html += '</form>';
  }
  res.send(html);
});

app.post
