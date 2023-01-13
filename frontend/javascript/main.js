import io from 'socket.io-client';
const socket = io('http://localhost:3000'); // Remplacez localhost par l'adresse de votre serveur

function addButtonClicked() {
  // Code à exécuter lorsque l'utilisateur clique sur le bouton
}

const addButtons = document.querySelectorAll('.add-button');
addButtons.forEach(button => {
  button.addEventListener('click', addButtonClicked);
});

window.onload = function() {
  // Initialisez votre application ici
}
