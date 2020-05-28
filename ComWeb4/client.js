
let login = prompt("Entrez votre login"); //On se logue avant d'afficher le html pour que le serveur ajoute un client a son tableau
let websocket;
createWebSocket(); //permet la communication entre le serveur et le client

function sendMessage(){
    event.preventDefault();
    let texte = document.getElementById("input").value; //On récupère le message entrer par un client
    websocket.send(login+" : "+texte); // affiche le message dans le chat
    document.getElementById("input").value = ""; //On efface le message dans le input
   
}

function createWebSocket(){
    websocket = new WebSocket('ws://localhost:12345'); //On ouvre le serveur sur la page web
    let button = document.getElementById("event");// On créer la détection de l'evenement "cliquez sur le bouton"
    button.onclick = function(){
        sendMessage(); // permet d'envoyer le message sur le chat
    }
}

websocket.onopen = function(event){ //fonction appelée automatiquement lorsqu"un client entre sur le serveur du chat
    websocket.send("    "+login+" nous a rejoint"); // affiche le message dans le chat
    console.log('Connexion établie');

}
/*
websocket.onclose = function(){
    websocket.send("    "+login+" nous a quitté");
    console.log('Communication terminé ');
}*/

websocket.onmessage = function(event){//fonction appelée automatiquement lorsqu"un client envoie un message sur le chat
    let chat = document.getElementById("message"); // on définit l'endroit ou sera affiché le message
    chat.setAttribute("disabled",false);
    chat.append(event.data+"\n");  // affiche le message dans le chat
    chat.setAttribute("disabled",true);
    console.log('Message reçu : '+ event.data);
}
