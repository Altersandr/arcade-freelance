
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search); 
    return params.get(param);
}

const id = getQueryParam("id");

var profile = "";
const fetchProfileData = ()=>{
    const token = localStorage.getItem("authToken");

    return fetch("http://localhost:8080/api/profile",
        {   method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(token)
            
        }
    )
    .then(response=> response.json())
    .then(authProfile=>{
        fetch("http://localhost:8080/utenti/getlogged",
            {   method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(authProfile.email)
                
            }
        ).then(response=> response.json())
        .then(prof=>{
           profile = prof;
            
        })

    })
}


//funzione modifica email e pass database
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
//fine funzione

fetchProfileData();

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
            email: profile.email,
            password: profile.password,
            firstname: profile.nome,
            lastname: profile.cognome,
            taxCode: 'ALVCLD85M01H501Z',
            iban: 'IT60X0542811101000000123456'
        };

        document.getElementById('email').value = savedData.email;
        document.getElementById('password').value = savedData.password;
        document.getElementById('confirmPassword').value = savedData.password;
        document.getElementById('firstname').value = savedData.firstname;
        document.getElementById('lastname').value = savedData.lastname;
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

    // servicesForm.addEventListener('submit', function(event) {
    //     event.preventDefault();
    //     alert('Modifiche ai servizi salvate!');
    // });
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

function logout() {
    // Recupera il token dal localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.error("Nessun token trovato nel localStorage");
        return;
    }

    fetch('http://localhost:8080/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Logout fallito');
        }
        return response.json();
    })
    .then(data => {
        console.log('Logout effettuato:', data);
        printOutput(data);
        // Rimuove il token dal localStorage
        localStorage.removeItem("authToken");
        // Nasconde il pulsante Logout e mostra il pulsante Accedi
        document.getElementById("logoutButton").style.display = "none";
        document.getElementById("loginBtn").style.display = "block";
        document.getElementById("btnProfilo").style.display = "none";
        document.getElementById("btnFreelance").style.display = "block";
    })
    .catch(error => {
        console.error('Errore durante il logout:', error);
        printOutput({ error: error.message });
    });
}

// Aggiungi l'ascoltatore dell'evento di clic sul pulsante di logout
// document.addEventListener("DOMContentLoaded", () => {
// document.getElementById('logoutButton')?.addEventListener('click', logout);
// });