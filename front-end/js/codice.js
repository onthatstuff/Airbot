const salva_btn = document.getElementById('salva_btn');
const lock_gif = document.getElementById('lock_gif');
const gif = document.getElementById('skater_gif');

salva_btn.addEventListener('click', function() {
    const code = document.getElementById('code').value;
    if (!code){
        alert("Il codice non può essere vuoto");
    }
    else{
        // Nascondi il testo e il pulsante, mostra la GIF
        document.getElementById('code_text').style.display = 'none';
        document.getElementById('alert_text').style.display = 'none';
        document.getElementById('code').style.display = 'none';
        among_gif.style.display = 'none';
        salva_btn.style.display = 'none';
        lock_gif.style.display = 'block';

        // Dopo un breve ritardo, reindirizza l'utente
        setTimeout(function() {
            window.location.href = 'service.html';
        }, 2000); // Cambia il valore di 2000 (in millisecondi) a quanto desideri
    }
});
