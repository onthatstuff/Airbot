const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const dgram = require('dgram');

// Variabili globali
let mainWindow;
let UDPClient;

const isMacOs = process.platform === 'darwin';
const isDev = process.env.NODE_ENV === 'production'; 

// funzione per creare la finestra principale
function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'AIRBOT',
        width: isDev ? 1920 : 1800,
        height: isDev ? 1080 : 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // aggiunto per abilitare l'integrazione di Node.js
        }
    });

    mainWindow.setFullScreen(false);

    // apri i devtools se sei in ambiente di sviluppo
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    // carica il file HTML della tua interfaccia utente
    mainWindow.loadFile(path.join(__dirname, "./front-end/index.html"));
}

// funzione per inizializzare la socket UDP client
function initUDPClient() {
    UDPClient = dgram.createSocket('udp4');

    // gestisci gli errori della socket
    UDPClient.on('error', (err) => {
        console.error('Errore nella socket UDP:', err);
        UDPClient.close();
    });
}

// quando l'applicazione è pronta, crea la finestra principale e inizializza la socket UDP
app.whenReady().then(() => {
    createMainWindow();
    initUDPClient();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

// quando tutte le finestre vengono chiuse, chiudi l'applicazione (tranne su macOS)
app.on('window-all-closed', () => {
    if (!isMacOs) {
        app.quit();
    }
});

// gestisci l'evento IPC per inviare messaggi alla socket
ipcMain.on('imposta-connessione-socket', (event, { serverIP, serverPort }) => {
    console.log(`Connessione impostata su ${serverIP}:${serverPort}`);
    event.sender.send('connessione-impostata', { serverIP, serverPort });
});

ipcMain.on('invia-messaggio-socket', (event, { messaggio, serverIP, serverPort }) => {
    console.log(`Invio messaggio: ${messaggio} a ${serverIP}:${serverPort}`);
    UDPClient.send(Buffer.from(messaggio), serverPort, serverIP, (err) => {
        if (err) {
            console.error('Errore nell\'invio del messaggio:', err);
        } else {
            console.log('Messaggio inviato con successo:', messaggio);
        }
    });
});
