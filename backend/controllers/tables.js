// Tableau qui contient les informations sur les tables
const tables = [
  {
    id: 1,
    name: 'Table 1',
    orders: []
  },
  {
    id: 2,
    name: 'Table 2',
    orders: []
  },
  {
    id: 3,
    name: 'Table 3',
    orders: []
  }
];

// Fonction qui retourne la table correspondant à un ID donné
exports.getTableById = (id) => {
  return tables.find(table => table.id === id);
};

// Fonction qui retourne le total des commandes pour une table donnée
exports.getOrdersByTable = (req, res) => {
  // Récupération de l'ID de la table à partir de l'URL
  const tableId = parseInt(req.params.id, 10);

  // Utilisation de la fonction getTableById pour récupérer la table correspondante
  const table = this.getTableById(tableId);

  // Si la table n'a pas été trouvée, retourne une erreur 404 (Not Found)
  if (!table) {
    res.status(404).send('Table non trouvée');
    return;
  }

  // Retourne les commandes de la table
  res.json(table.orders);
};

// Fonction qui ajoute une commande pour une table donnée
exports.addOrder = (req, res) => {
  // Récupération de l'ID de la table à partir de l'URL
  const tableId = parseInt(req.params.id, 10);

  // Utilisation de la fonction getTableById pour récupérer la table correspondante
  const table = this.getTableById(tableId);

  // Si la table n'a pas été trouvée, retourne une erreur 404 (Not Found)
  if (!table) {
    res.status(404).send('Table non trouvée');
    return;
  }

  // Ajout de la commande à la table
  const order = req.body;
  table.orders.push(order);

  // Retourne un statut de réussite
  res.sendStatus(200);
};
