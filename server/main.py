from flask import Flask, request, jsonify
from airbot import Airbot

# inizializzazione delle variabili
localIP = "0.0.0.0"  # Ascolta su tutte le interfacce di rete disponibili
localPort = 5562
FERMA = "stop"
message = ""

# creazione dell'oggetto Airbot
# airbot = Airbot("/dev/ttyUSB0", "/dev/ttyACM0")

# creazione dell'app Flask
app = Flask(__name__)

@app.route('/comando', methods=['POST'])
def comando():
    global message
    data = request.json
    message = data.get('message', '').lower()

    if message:
        # esegui il comando con Airbot
        # airbot.esegui_comando(message)
        print(f"Comando ricevuto: {message}")
        return jsonify({'status': 'success', 'message': f'Comando eseguito: {message}'}), 200

    return jsonify({'status': 'error', 'message': 'Nessun comando ricevuto'}), 400

@app.route('/stop', methods=['POST'])
def stop():
    global message
    message = FERMA
    print("Comando di stop ricevuto")
    return jsonify({'status': 'success', 'message': 'Server in fase di arresto'}), 200

if __name__ == '__main__':
    print(f"Server avviato\nAirbot ON! {localIP} su porta {localPort}")
    app.run(host=localIP, port=localPort)
    # Il loop per l'ascolto di Flask sostituisce il while loop originale

