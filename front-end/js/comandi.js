const { ipcRenderer } = require('electron');
const $ = require('jquery'); 

$(function() {
    $('#apri_btn').on('click', function() {
        inviaMessaggio('apri');
    });

    $('#chiudi_btn').on('click', function() {
        inviaMessaggio('chiudi');
    });

    function inviaMessaggio(messaggio) {
        const serverIP = localStorage.getItem('serverIP');
        const serverPort = localStorage.getItem('serverPort');

        if (serverIP && serverPort) {
            fetch(`http://${serverIP}:${serverPort}/comando`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: messaggio })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Risposta dal server:', data);
            })
            .catch(error => {
                console.error('Errore:', error);
            });
        } else {
            console.error('Server IP e/o porta non sono stati impostati');
        }
    }
});
