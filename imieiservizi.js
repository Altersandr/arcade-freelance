document.addEventListener('DOMContentLoaded', function() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const addServiceButton = document.getElementById('add-service-btn');
    const servicesContainer = document.getElementById('services-container');

    document.addEventListener("DOMContentLoaded", caricaServizi);
    

    document.addEventListener("DOMContentLoaded", function () {
        const servizi = [
            {
                titolo: "Design Grafico",
                descrizione: "Creazione di loghi, brochure, biglietti da visita e altro materiale grafico.",
                immagine: "/freelance/web.jpg"
            },
            {
                titolo: "Illustrazioni",
                descrizione: "Realizzazione di illustrazioni personalizzate per libri, riviste e progetti digitali.",
                immagine: "/freelance/illustrazione.png"
            },
            {
                titolo: "Web Design",
                descrizione: "Progettazione e sviluppo di siti web moderni e responsive.",
                immagine: "/freelance/Web Development Promotion Instagram Post.png"
            }
        ];
        console.log("Caricamento servizi...");
        console.log(servizi); // Controlliamo se i servizi vengono letti correttamente
        
        const serviziContainer = document.querySelector(".row");
    
        function renderServizi() {
            serviziContainer.innerHTML = ""; // Svuota il contenitore prima di aggiornare
            servizi.forEach((servizio, index) => {
                const card = `
                    <div class="col-md-4">
                        <div class="card service-card mb-4">
                            <img src="${servizio.immagine}" class="card-img-top" alt="${servizio.titolo}">
                            <div class="card-body">
                                <h5 class="card-title">${servizio.titolo}</h5>
                                <p class="card-text">${servizio.descrizione}</p>
                                <button class="btn btn-primary" onclick="modificaServizio(${index})">Modifica</button>
                                <button class="btn btn-danger" onclick="rimuoviServizio(${index})">Cancella</button>
                            </div>
                        </div>
                    </div>
                `;
                serviziContainer.innerHTML += card;
            });
        }
    
        window.rimuoviServizio = function (index) {
            servizi.splice(index, 1);
            renderServizi();
        };
    
        window.modificaServizio = function (index) {
            window.location.href = 'modificaservizi.html';
        };
    
        renderServizi();
    });
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const title = card.querySelector('.card-title').innerText;
            const description = card.querySelector('.card-text').innerText;

            const newTitle = prompt('Modifica il titolo del servizio:', title);
            const newDescription = prompt('Modifica la descrizione del servizio:', description);

            if (newTitle) {
                card.querySelector('.card-title').innerText = newTitle;
            }
            if (newDescription) {
                card.querySelector('.card-text').innerText = newDescription;
            }
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.col-md-4');
            card.remove();
        });
    });

    addServiceButton.addEventListener('click', function() {
        const newTitle = prompt('Inserisci il titolo del nuovo servizio:');
        const newDescription = prompt('Inserisci la descrizione del nuovo servizio:');
        const newImage = prompt('Inserisci l\'URL dell\'immagine del nuovo servizio:');

        if (newTitle && newDescription && newImage) {
            const newServiceHTML = `
                <div class="col-md-4">
                    <div class="card service-card mb-4">
                        <img src="${newImage}" class="card-img-top" alt="${newTitle}">
                        <div class="card-body">
                            <h5 class="card-title">${newTitle}</h5>
                            <p class="card-text">${newDescription}</p>
                            <button class="btn btn-primary edit-btn">Modifica</button>
                            <button class="btn btn-danger delete-btn">Cancella</button>
                        </div>
                    </div>
                </div>
            `;
            servicesContainer.insertAdjacentHTML('beforeend', newServiceHTML);

            // Aggiungi gli event listener ai nuovi pulsanti
            const newEditButton = servicesContainer.lastElementChild.querySelector('.edit-btn');
            const newDeleteButton = servicesContainer.lastElementChild.querySelector('.delete-btn');

            newEditButton.addEventListener('click', function() {
                const card = this.closest('.card');
                const title = card.querySelector('.card-title').innerText;
                const description = card.querySelector('.card-text').innerText;

                const newTitle = prompt('Modifica il titolo del servizio:', title);
                const newDescription = prompt('Modifica la descrizione del servizio:', description);

                if (newTitle) {
                    card.querySelector('.card-title').innerText = newTitle;
                }
                if (newDescription) {
                    card.querySelector('.card-text').innerText = newDescription;
                }
            });

            newDeleteButton.addEventListener('click', function() {
                const card = this.closest('.col-md-4');
                card.remove();
            });
        }
    });
});
(document).ready(function () {
    loadServices(); // Carica i servizi al caricamento della pagina

    function loadServices() {
        $.ajax({
            url: "/api/servizi", // Endpoint backend
            method: "GET",
            success: function (data) {
                let tableBody = $("#servicesTable tbody");
                tableBody.empty(); // Svuota la tabella
                data.forEach(service => {
                    let row = `
                        <tr>
                            <td>${service.nome}</td>
                            <td>${service.descrizione}</td>
                            <td>${service.prezzo.toFixed(2)} €</td>
                            <td>${service.categoria}</td>
                            <td>
                                <button class="edit-btn" data-id="${service.id}">✏️</button>
                                <button class="delete-btn" data-id="${service.id}">🗑️</button>
                            </td>
                        </tr>`;
                    tableBody.append(row);
                });
            }
        });
    }
});