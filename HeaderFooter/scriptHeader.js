document.write(`
    <header class="d-flex justify-content-between align-items-center p-3">
        <!-- Logo -->
          <a class="header navbar-brand" href="../Homepage/homepage.html">
            <img src="../img/arcade-logo.png" alt="arcade Logo" class="me-2">
            
        </a>
        <div class="dropdown">
            <button class="btn text-white dropdown-toggle" type="button" id="menuDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                Menu
            </button>
            <ul class="dropdown-menu" aria-labelledby="menuDropdown">
                <li><a class="dropdown-item" href="../Servizi/tuttiServizi.html">Tutti i servizi</a></li>
                <li><a class="dropdown-item" href="../Contatti/contatti.html">Contatti</a></li>
                <li><a class="dropdown-item" href="../FAQ/faq.html">FAQ</a></li>
            </ul>
        </div>

        <!-- Search Bar -->
        <div class="input-group mx-auto w-25 text-center">
            <input type="text" id="searchInput" class="form-control" placeholder="Cerca servizi o freelancer...">
            <button class="btn text-white" id="searchButton">Cerca</button>
        </div>

        <button class="btn text-white">Sono un Freelancer</button>

        <!-- Login Button -->
        <button class="btn text-white" id="loginBtn" type="button">Accedi</button>

        <!-- Logout Button (nascosto di default) -->
        <button class="btn text-white" id="logoutButton" style="display: none;">Logout</button>
    </header>
    
    <!-- Modal di login -->
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginModalLabel">Accedi</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="loginForm">
                        <div class="mb-3">
                            <label for="loginUsername" class="form-label">Email</label>
                            <input type="text" class="form-control" id="loginUsername" required>
                        </div>
                        <div class="mb-3">
                            <label for="loginPassword" class="form-label">Password</label>
                            <input type="password" class="form-control" id="loginPassword" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Accedi</button>
                    </form>
                    <p>Non sei iscritto? <a href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Registrati!</a></p>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal di registrazione -->
    <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="registerModalLabel">Registrati</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="registerForm">
                    <div class="mb-3">
                        <label for="register-firstname" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="register-firstname" required>
                    </div>
                    <div class="mb-3">
                        <label for="register-lastname" class="form-label">Cognome</label>
                        <input type="text" class="form-control" id="register-lastname" required>
                    </div>
                    <div class="mb-3">
                        <label for="register-email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="register-email" required>
                    </div>
                    <div class="mb-3">
                        <label for="register-password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="register-password" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Registrati</button>
                </form>
                <p class="mt-3 text-center">Oppure, se sei già registrato, <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal" data-bs-dismiss="modal">Accedi</a></p>
            </div>
        </div>
    </div>
</div>
`);

//gestione login
function printOutput(data) {
    console.log(JSON.stringify(data, null, 2));
}

// Funzione per il login
const login = (email, password) => {
    fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login fallito');
        }
        return response.json();
    })
    .then(data => {
        console.log('Login effettuato:', data);
        printOutput(data);
        // Salva il token nel localStorage
        if (data.token) {
            localStorage.setItem("authToken", data.token);
            // Nasconde il pulsante Accedi e mostra il pulsante Logout
            document.getElementById("logoutButton").style.display = "block";
            document.getElementById("loginBtn").style.display = "none";
            // Chiude il modal di login
            const modal = document.getElementById('loginModal');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
    })
    .catch(error => {
        console.error('Errore nel login:', error);
        printOutput({ error: error.message });
    });
};

// Funzione per il logout
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
    })
    .catch(error => {
        console.error('Errore durante il logout:', error);
        printOutput({ error: error.message });
    });
}

// Gestione del submit del form di login
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    login(email, password);
});

// Aggiungi evento per aprire il modal quando si clicca su "Accedi"
document.getElementById("loginBtn").addEventListener("click", function() {
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
});

// Aggiungi evento per il logout
document.getElementById('logoutButton').addEventListener('click', function() {
    logout();
});

// Funzione per controllare lo stato di login all'avvio della pagina
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("authToken");
    if (token) {
        // Se l'utente è loggato, nasconde il pulsante Accedi e mostra il pulsante Logout
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("logoutButton").style.display = "block";
    } else {
        // Se l'utente non è loggato, mostra il pulsante Accedi
        document.getElementById("loginBtn").style.display = "block";
        document.getElementById("logoutButton").style.display = "none";
    }
});

// Funzione per la registrazione di un nuovo utente
function addUser(newUser) {
    console.log(newUser)
    fetch('http://localhost:8080/utenti/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message || "Errore durante la registrazione"); });
        }
        return response.json();
    })
    .then(data => {
        console.log('Utente registrato con successo:', data);
        printOutput(data);
        // Pulisce il form solo se la registrazione ha avuto successo
        clearForm();
        closeModal();
    })
    .catch(error => {
        console.error('Errore nella registrazione:', error);
        printOutput({ error: error.message });
        alert('Registrazione fallita: ' + error.message);
    });
}

// Funzione per svuotare i campi del modulo di registrazione
function clearForm() {
    document.getElementById('registerForm').reset();
}

// Funzione per chiudere il modal di registrazione
function closeModal() {
    const modal = document.getElementById('registerModal');
    const modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) {
        modalInstance.hide();
    }
}

// Gestione del form per aggiungere un nuovo utente
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const newUser = {
        nome: document.getElementById('register-firstname').value,
        cognome: document.getElementById('register-lastname').value,
        email: document.getElementById('register-email').value,
        password: document.getElementById('register-password').value,
        ruolo: "cliente"
    };

    addUser(newUser);
});