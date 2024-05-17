const { ipcRenderer } = require('electron');
const $ = require('jquery'); 

$(function() {
    $('.connetti-btn button').on('click', function() {
        const serverIP = $('#serverIP').val();
        let serverPort = parseInt($('#serverPort').val());

        if (validatePort(serverPort)) {
            ipcRenderer.send('imposta-connessione-socket', { serverIP, serverPort });
        }
    });

    $('#apri_btn').on('click', function() {
        const serverIP = $('#serverIP').val();
        let serverPort = parseInt($('#serverPort').val());

        if (validatePort(serverPort)) {
            inviaMessaggio(serverIP, serverPort, 'apri');
        }
    });

    $('#chiudi_btn').on('click', function() {
        const serverIP = $('#serverIP').val();
        let serverPort = parseInt($('#serverPort').val());

        if (validatePort(serverPort)) {
            inviaMessaggio(serverIP, serverPort, 'chiudi');
        }
    });

    function validatePort(port) {
        const portError = $('#portError');
        if (port >= 1 && port <= 65535) {
            portError.text(''); // Rimuovi eventuali messaggi di errore
            return true;
        } else {
            portError.text('La porta deve essere compresa tra 1 e 65535.');
            return false;
        }
    }

    function inviaMessaggio(serverIP, serverPort, messaggio) {
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
    }
});
