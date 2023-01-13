const addButtonElements = document.querySelectorAll('.add-button');

addButtonElements.forEach((addButton) => {
  addButton.addEventListener('click', () => {
    // Récupérer le produit associé au bouton "add-button" cliqué
    const product = addButton.dataset.product;
    
    // Récupérer la quantité actuelle du produit dans la commande
    let quantity = parseInt(addButton.dataset.quantity);
    
    // Incrémenter la quantité de 1
    quantity++;
    
    // Mettre à jour la quantité du produit dans la commande
    addButton.dataset.quantity = quantity;
    
    // Mettre à jour l'affichage de la quantité du produit dans la commande
    addButton.innerHTML = `${quantity} ${product}`;
    
    // Mettre à jour le prix total de la commande
    updateTotalPrice();
  });
});

function updateTotalPrice() {
  // Récupérer tous les boutons "add-button"
  const addButtonElements = document.querySelectorAll('.add-button');
  
  // Initialiser le prix total de la commande à 0
  let totalPrice = 0;
  
  // Pour chaque bouton "add-button", ajouter le prix du produit à la commande
  addButtonElements.forEach((addButton) => {
    const product = addButton.dataset.product;
    const quantity = parseInt(addButton.dataset.quantity);
    const price = parseInt(addButton.dataset.price);
    
    totalPrice += quantity * price;
  });
  
  // Mettre à jour l'affichage du prix total de la commande
  const totalPriceElement = document.querySelector('.total-price');
  totalPriceElement.innerHTML = `Prix total : ${totalPrice} €`;
}
