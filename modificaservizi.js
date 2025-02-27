function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search); 
    return params.get(param);
}


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




    const id = getQueryParam("id");

    // Chiamata al backend per inviare i dati tramite POST
    fetch(`http://localhost:8080/servizi/${id}`, {
        method: 'PUT',
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
        console.log(serviceData)
        alert('Servizio salvato con successo!');
        window.location.href = 'profilofreelance.html'; // Reindirizza l'utente alla pagina di profilo
    })
    .catch(error => {
        console.error('Errore:', error);
        alert('Errore nel salvataggio del servizio');
    });
});

const loadInfo = ()=>{

    const id = getQueryParam("id");
    fetch(`http://localhost:8080/servizi/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {

        return response.json(); // Converte la risposta in formato JSON
    })
    .then(data => {
        document.querySelector("#serviceTitle").value = data.nome;
        document.querySelector("#serviceDescription").value = data.descrizione;
        document.querySelector("#servicePrice").value = data.prezzo;
        console.log(data)
      
    })
    .catch(error => {
        console.error('Errore:', error);
        alert('Errore nel salvataggio del servizio');
    });

}

document.querySelector(".btn-success").addEventListener("click", loadInfo);

