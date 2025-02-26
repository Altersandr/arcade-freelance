//funzione modifica email e pass db
document.addEventListener('DOMContentLoaded', function () {
    const profileForm = document.getElementById('profileForm');

    profileForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value

        // Creazione dell'oggetto con i dati aggiornati
        const updateData = {
            email: email,
            password: password
        };

        fetch('utenti/updateUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else {
                alert('Errore durante l’aggiornamento del profilo.');
            }
        })
        .catch(error => {
            console.error('Errore:', error);
            alert('Errore nel salvataggio delle modifiche.');
        });
    });
});
//fine funzione



document.addEventListener('DOMContentLoaded', function() {
    const fillFormBtn = document.getElementById('fillFormBtn');
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');
    const profileForm = document.getElementById('profileForm');
    const portfolioInput = document.getElementById('portfolio');
    const portfolioForm = document.getElementById('portfolioForm');
    const servicesForm = document.getElementById('servicesForm');

    fillFormBtn.addEventListener('click', function() {
        const savedData = {
            email: 'claudiaalves@email.com',
            password: 'password123',
            username: 'Claudia Alves',
            vatNumber: 'IT12345678901',
            taxCode: 'ALVCLD85M01H501Z',
            iban: 'IT60X0542811101000000123456'
        };

        document.getElementById('email').value = savedData.email;
        document.getElementById('password').value = savedData.password;
        document.getElementById('confirmPassword').value = savedData.password;
        document.getElementById('username').value = savedData.username;
        document.getElementById('vatNumber').value = savedData.vatNumber;
        document.getElementById('taxCode').value = savedData.taxCode;
        document.getElementById('iban').value = savedData.iban;
    });

    togglePassword.addEventListener('click', function() {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        confirmPasswordField.setAttribute('type', type);
        this.classList.toggle('fa-lock');
        this.classList.toggle('fa-lock-open');
    });

    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (passwordField.value !== confirmPasswordField.value) {
            alert('Errore: Le password non corrispondono.');
            return;
        }

        const formData = new FormData(profileForm);
        fetch('/save-profile', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Modifiche salvate con successo!');
                window.history.back();
            } else {
                alert('Errore nel salvataggio delle modifiche.');
            }
        })
        .catch(error => {
            console.error('Errore:', error);
            alert('Errore nel salvataggio delle modifiche.');
        });
    });

    portfolioForm.addEventListener('submit', function(event) {
        const allowedExtensions = ['image/jpeg', 'image/png', 'image/gif'];
        const files = portfolioInput.files;
        for (let i = 0; i < files.length; i++) {
            if (!allowedExtensions.includes(files[i].type)) {
                alert('Errore: Uno o più file non sono supportati. Si prega di caricare solo immagini JPEG, PNG o GIF.');
                event.preventDefault();
                return;
            }
        }
    });

    document.querySelector('button[onclick="addPortfolioItem()"]').addEventListener('click', function() {
        const description = document.getElementById('portfolioDescription').value;
        const files = portfolioInput.files;
        const allowedExtensions = ['image/jpeg', 'image/png', 'image/gif'];

        for (let i = 0; i < files.length; i++) {
            if (!allowedExtensions.includes(files[i].type)) {
                alert('Errore: Uno o più file non sono supportati. Si prega di caricare solo immagini JPEG, PNG o GIF.');
                return;
            }
        }

        const portfolioList = document.getElementById('portfolioList');
        for (let i = 0; i < files.length; i++) {
            const listItem = document.createElement('li');
            const reader = new FileReader();
            reader.onload = function(e) {
                listItem.innerHTML = `<span><img src="${e.target.result}" alt="${files[i].name}" style="width: 50px; height: 50px; margin-right: 10px;">${files[i].name}: ${description}</span><button class="btn btn-danger btn-sm" onclick="removeItem(this)">Rimuovi</button>`;
                portfolioList.appendChild(listItem);
            };
            reader.readAsDataURL(files[i]);
        }
        portfolioInput.value = '';
        document.getElementById('portfolioDescription').value = '';
    });

    servicesForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Modifiche ai servizi salvate!');
    });
});

function addService() {
    const serviceNameInput = document.getElementById('serviceName');
    const serviceDescriptionInput = document.getElementById('serviceDescription');
    const serviceImageInput = document.getElementById('serviceImage');
    const servicePriceInput = document.getElementById('servicePrice');
    const serviceName = serviceNameInput.value.trim();
    const serviceDescription = serviceDescriptionInput.value.trim();
    const serviceImage = serviceImageInput.files[0];
    const servicePrice = servicePriceInput.value.trim();

    if (serviceName && serviceDescription && serviceImage && servicePrice) {
        const servicesList = document.getElementById('servicesList');
        const li = document.createElement('li');
        const reader = new FileReader();
        reader.onload = function(e) {
            li.innerHTML = `<span><img src="${e.target.result}" alt="${serviceName}" style="width: 50px; height: 50px; margin-right: 10px;">${serviceName}: ${serviceDescription} - €${servicePrice}</span><button class="btn btn-danger btn-sm" onclick="removeItem(this)">Rimuovi</button>`;
            servicesList.appendChild(li);
        };
        reader.readAsDataURL(serviceImage);
        serviceNameInput.value = '';
        serviceDescriptionInput.value = '';
        serviceImageInput.value = '';
        servicePriceInput.value = '';
    } else {
        alert('Errore: Tutti i campi devono essere compilati.');
    }
}

function addPortfolioItem() {
    const portfolioInput = document.getElementById('portfolio');
    const portfolioDescriptionInput = document.getElementById('portfolioDescription');
    const portfolioFiles = portfolioInput.files;
    const portfolioDescription = portfolioDescriptionInput.value.trim();
    const allowedExtensions = ['image/jpeg', 'image/png', 'image/gif'];

    if (portfolioFiles.length > 0 && portfolioDescription) {
        for (let i = 0; i < portfolioFiles.length; i++) {
            if (!allowedExtensions.includes(portfolioFiles[i].type)) {
                alert('Errore: Uno o più file non sono supportati. Si prega di caricare solo immagini JPEG, PNG o GIF.');
                return;
            }
        }

        const portfolioList = document.getElementById('portfolioList');
        for (let i = 0; i < portfolioFiles.length; i++) {
            const li = document.createElement('li');
            const reader = new FileReader();
            reader.onload = function(e) {
                li.innerHTML = `<span><img src="${e.target.result}" alt="${portfolioFiles[i].name}" style="width: 50px; height: 50px; margin-right: 10px;">${portfolioFiles[i].name}: ${portfolioDescription}</span><button class="btn btn-danger btn-sm" onclick="removeItem(this)">Rimuovi</button>`;
                portfolioList.appendChild(li);
            };
            reader.readAsDataURL(portfolioFiles[i]);
        }
        portfolioInput.value = '';
        portfolioDescriptionInput.value = '';
    } else {
        alert('Errore: Tutti i campi devono essere compilati.');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', function() {
        window.location.href = '../arcade-freelance/Homepage/homepage.html';
    });
});

function removeItem(button) {
    const li = button.closest('li');
    li.remove();
}
