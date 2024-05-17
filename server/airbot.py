# questo file contiene la classe Airbot che rappresenta il robot
import pycreate2
import serial
import time

# definizione della classe Airbot
class Airbot():

    # dizionario che associa i comandi ricevuti dal server ai metodi della classe
    COMANDI_METODI = {
        "percorso1": "Percorso1",
        "apri": "ApriSportello",
        "chiudi": "ChiudiSportello",
        "ledverdi": "LedVerdi",
        "ledrossi": "LedRossi",
        "ledblu": "LedBlu",
        "startSound" : "StartSound",
        "istruzioniSound" : "IstruzioniSound",
    }

    # costruttore della classe Airbot
    def __init__(self, portaRoomba, portaArduino):
        # inizializzazione delle variabili
        self.roomba = pycreate2.Create2(portaRoomba)
        self.serialPort = serial.Serial(port=portaArduino, baudrate=9600)
        # connessione al robot
        print("AirBot ON!")
        

    # metodo per l'esecuzione dei comandi
    def esegui_comando(self, comando):
        # ricerca del metodo associato al comando
        metodo = self.COMANDI_METODI.get(comando.lower())
        # esecuzione del metodo
        if metodo:
            getattr(self, metodo)()
        else:
            print("Comando non riconosciuto")


    def Percorso1(self):
        print("Percorso 1")
        self.roomba.start()
        self.roomba.safe()
        # qui puoi aggiungere la logica per il percorso 1
        self.roomba.drive_direct(50, 50)
        time.sleep(2)
        self.roomba.stop()

    def ApriSportello(self):
        print("Apertura sportello in corso...")
        apri = 'a'
        try:
            self.serialPort.write(apri.encode())
            time.sleep(1)
        except:
            print("Errore porta seriale")

    def ChiudiSportello(self):
        print("Chiusura sportello in corso...")
        chiudi = 'c'
        try:
            self.serialPort.write(chiudi.encode())
            time.sleep(1)
        except:
            print("Errore porta seriale")
        
    def LedVerdi(self):
        print("Led Verdi in corso...")
        ledverdi = 'g'
        try:
            self.serialPort.write(ledverdi.encode())
            time.sleep(1)
        except:
            print("Errore porta seriale")

    def LedRossi(self):
        print("Led Rossi in corso...")
        ledrossi = 'r'
        try:
            self.serialPort.write(ledrossi.encode())
            time.sleep(1)
        except:
            print("Errore porta seriale")

    def LedBlu(self):
        print("Led Blu in corso...")
        ledblu = 'b'
        try:
            self.serialPort.write(ledblu.encode())
            time.sleep(1)
        except:
            print("Errore porta seriale")

