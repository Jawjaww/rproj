const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const tables = require(path.join(__dirname, './backend/controllers/tables')); // Chemin des tables ici

// Utilisez les routes définies dans le fichier routes.js
const routes = require(path.join(__dirname, './backend/routes/routes')); // Chemin relatif des routes ici
app.use(routes);

// Spécifiez le chemin absolu du répertoire contenant vos fichiers statiques
const staticFilesDirectory = path.resolve(__dirname, './frontend');

// Pour autoriser des polices et images  externes au csp 
app.use(function (req, res, next) {
  res.setHeader('Content-Security-Policy', 'font-src https://fonts.gstatic.com');
  next();
});

// Votre code de configuration du serveur ici
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Une erreur est survenue');
    }
  });
});

// Rend le contenu du répertoire "public" accessible via le serveur
app.use('/', express.static(staticFilesDirectory));

server.listen(3001, () => {
  console.log('Serveur en écoute sur le port 3001');
});

io.on('connection', (socket) => {
  console.log('Un client s\'est connecté');

  // écouteurs d'événements à tous les éléments .add-button
  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Code à exécuter lorsque l'utilisateur clique sur le bouton
    });
  });

  // Gérez les événements envoyés par le client ici
  // Par exemple :
  socket.on('add-order', (order) => {
    console.log(`Commande reçue : ${order}`);

    // Récupérez la table correspondant à l'ID envoyé par le client
    const tableId = order.tableId;
    const table = tables.getTableById(tableId); // Utilisez la fonction getTableById du module tables ici
    if (!table) {
      console.error(`Table non trouvée avec ID ${tableId}`);
      return;
    }

    // Ajoutez la commande à la table
    table.orders.push(order);

    // Envoyez la commande à tous les autres clients connectés à la table
    socket.broadcast.emit('add-order', order);
  });

  // Gérez la déconnexion du client ici
  socket.on('disconnect', () => {
    console.log('Un client s\'est déconnecté');
  });
});

