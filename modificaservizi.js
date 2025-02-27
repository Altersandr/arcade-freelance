document.getElementById('editServiceForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita il refresh della pagina

    // Preleva i dati dal form
    const serviceData = {
        nome: document.getElementById('serviceTitle').value,
        descrizione: document.getElementById('serviceDescription').value,
        prezzo: parseFloat(document.getElementById('servicePrice').value)
    };

    // Verifica che i campi non siano vuoti
    if (serviceData.nome === "" || serviceData.descrizione === "" || isNaN(serviceData.prezzo)) {
        alert("Tutti i campi sono obbligatori!");
        return;
    }

    // Chiamata al backend per inviare i dati tramite POST
    fetch('http://localhost:8080/servizi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nel salvataggio del servizio');
        }
        return response.json(); // Converte la risposta in formato JSON
    })
    .then(data => {
        alert('Servizio salvato con successo!');
        window.location.href = 'profilofreelance.html'; // Reindirizza l'utente alla pagina di profilo
    })
    .catch(error => {
        console.error('Errore:', error);
        alert('Errore nel salvataggio del servizio');
    });
});

// Funzione per ottenere tutti i servizi tramite GET
const getAllServizi = async () => {
    try {
        const response = await fetch('http://localhost:8080/servizi');
        if (!response.ok) {
            throw new Error("Errore nel recupero dei servizi");
        }
        const data = await response.json();
        console.log(data); // Stampa i dati recuperati
    } catch (error) {
        console.error("Errore nel recupero dei servizi!", error);
    }
};

// Usa useEffect in React per recuperare i dati al primo render del componente
useEffect(() => {
    getAllServizi();
}, []);

// Funzione per creare un nuovo servizio con POST
const createServizio = async () => {
    const newServizio = {
        nome: "Servizio A",
        descrizione: "Descrizione servizio",
        prezzo: 100
    };

    try {
        const response = await fetch('http://localhost:8080/servizi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newServizio)
        });
        if (!response.ok) {
            throw new Error('Errore nella creazione del servizio');
        }
        const data = await response.json();
        console.log('Servizio creato:', data); // Stampa i dati del servizio creato
    } catch (error) {
        console.error('Errore nella creazione del servizio', error);
    }
};

// Funzione per aggiornare un servizio con PUT
const updateServizio = async (id) => {
    const updatedServizio = {
        nome: "Servizio A aggiornato",
        descrizione: "Nuova descrizione",
        prezzo: 150
    };

    try {
        const response = await fetch(`http://localhost:8080/servizi/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedServizio)
        });
        if (!response.ok) {
            throw new Error('Errore nell\'aggiornamento del servizio');
        }
        const data = await response.json();
        console.log('Servizio aggiornato:', data); // Stampa i dati del servizio aggiornato
    } catch (error) {
        console.error('Errore nell\'aggiornamento del servizio', error);
    }
};

// Funzione per eliminare un servizio con DELETE
const deleteServizio = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/servizi/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Errore nell\'eliminazione del servizio');
        }
        console.log("Servizio eliminato");
    } catch (error) {
        console.error('Errore nell\'eliminazione del servizio', error);
    }
};
