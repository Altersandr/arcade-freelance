//msotra dati utente autenticato
document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('authToken'); // Recupera il token dal localStorage

    if (!token) {
        alert('Devi essere autenticato per vedere queste informazioni.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/utenti/getAuthenticatedUser', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Errore nel recupero dei dati utente.');
        }

        const userData = await response.json(); // Ottiene i dati dell'utente

        // Aggiorna il nome utente nella sezione del profilo
        document.getElementById('customer-name').textContent = `${userData.nome} ${userData.cognome}`;

        // Aggiorna i dettagli personali nella lista
        document.querySelector('.personal-email').textContent = userData.email;
        document.querySelector('.personal-name').textContent = userData.nome;
        document.querySelector('.personal-surname').textContent = userData.cognome;

        // Precompila il form di modifica profilo con i dati attuali
        document.getElementById('email').value = userData.email;
        document.getElementById('firstname').value = userData.nome;
        document.getElementById('lastname').value = userData.cognome;

    } catch (error) {
        console.log(localStorage.getItem('authToken'));
        console.error('Errore:', error);
        alert('Impossibile recuperare i dati dell’utente.');
    }
});