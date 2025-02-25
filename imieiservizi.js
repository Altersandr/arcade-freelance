document.addEventListener('DOMContentLoaded', function() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const addServiceButton = document.getElementById('add-service-btn');
    const servicesContainer = document.getElementById('services-container');

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