let websocket;

function sendMessage(){
    websocket.onopen = function(event){
        console.log('Connexion établie');
        websocket.send('Hi server!')
    }
    websocket.onmessage = function(event){
        let message = document.getElementById("message").innerHTML =event.data;
        console.log('Message reçu : '+ event.data);
    }
    websocket.onclose = function(){
        console.log('Communication terminé ');
    }
}

function createWebSocket(){
    websocket = new WebSocket('ws://localhost::12345');
    let button = document.getElementById("event");
    button.onclick = sendMessage;
}






