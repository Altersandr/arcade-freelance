





document.addEventListener('DOMContentLoaded', function () {
    const profileForm = document.getElementById('profileForm');

    profileForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const lastname = document.getElementById("lastname").value;
        const firstname = document.getElementById("firstname").value;

        
        // console.log('Email:', email);
        // console.log('Password:', password);

        // Controlla se le password corrispondono
        if (password !== confirmPassword) {
            alert('Le password non corrispondono');
            return;
        }

        // Oggetto con i dati da aggiornare
        const updateData = {
            email: email,
            password: password,  // Puoi anche aggiungere altri campi come il nome utente, se necessario
            nome: firstname,
            cognome: lastname
        };

        // Recupera il token dal localStorage
        const token = localStorage.getItem('authToken');  // Assicurati che la chiave sia corretta

        // Controlla se il token esiste
        if (!token) {
            alert('Token non trovato. Devi essere autenticato.');
            return;
        }

        // Invia la richiesta PUT per aggiornare i dati
        fetch('http://localhost:8080/utenti/updateUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
            },
            body: JSON.stringify(updateData)  // Invia i dati da aggiornare
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella risposta del server');
            }
            return response.json();
        })
        .then(data => {
          
            console.log('Risposta del server:', data);  //per vedere i dati ricevuti
            if (data.message) {
                alert(data.message);  // Mostra il messaggio di successo o errore ricevuto dal server
            } else {
                alert('Errore durante l’aggiornamento del profilo.');
            }
        })
        
    });
});