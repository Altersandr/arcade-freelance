document.write(`
    <header class="d-flex justify-content-between align-items-center p-3">
        <!-- Logo -->
          <a class="header navbar-brand me-5" href="../Homepage/homepage.html">
            <img src="../img/logoArcade.png" alt="arcade Logo" class="me-2" width="50">
            
        </a>
      <div class="dropdown">
    <button class="btn text-white dropdown-toggle" type="button" id="menuDropdown" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fas fa-bars"></i>
    </button>
    <ul class="dropdown-menu" aria-labelledby="menuDropdown">
        <li><a class="dropdown-item" href="../TuttiServizi/allservices.html">Tutti i servizi</a></li>
        <li><a class="dropdown-item" href="../Contatti/contatti.html">Contatti</a></li>
        <li><a class="dropdown-item" href="../FAQ/faq.html">FAQ</a></li>
    </ul>
</div>


        <!-- Search Bar -->
        <div class="input-group mx-auto w-25 text-center">
            <input type="text" id="searchInput" class="form-control" placeholder="Cerca servizi o freelancer...">
            <button class="btn text-white" id="searchButton">Cerca</button>
        </div>

          <!-- Profilo Dropdown (visibile solo dopo login) -->
    <div class="dropdown" id="profileDropdown" style="display: none;">
        <button class="btn text-white dropdown-toggle" type="button" id="profileMenu" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-user-circle fa-lg"></i> <!-- Icona profilo -->
        </button>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileMenu">
            <li><a class="dropdown-item" href="../freelance.html">Dashboard</a></li>
            <li><a class="dropdown-item" href="../imieiServizi.html">I miei servizi</a></li>
            <li><a class="dropdown-item" href="../profilofreelance.html">Profilo</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><button class="btn text-white" id="logoutButton">Logout</button></li>
        </ul>
    </div>
    <div class="dropdown" id="clientDropdown" style="display: none;">
        <button class="btn text-white dropdown-toggle" type="button" id="clientMenu" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-user-circle fa-lg"></i> <!-- Icona profilo -->
        </button>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="clientMenu">
            <li><a class="dropdown-item" href="../DashBoardCliente/dashboardCliente.html">Dashboard</a></li>
            <li><a class="dropdown-item" href="../profiloCliente/cliente.html">Profilo</a></li>
            <li><a class="dropdown-item" href="../Carrello/carrello.html">Carrello</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><button class="btn text-white" id="logoutButton">Logout</button></li>
        </ul>
    </div>

         <button class="btn text-white" id="btnFreelance" type="button">Sono un Freelancer</button>

        

        <!-- Login Button -->
        <button class="btn text-white" id="loginBtn" type="button">Accedi</button>

        <!-- Logout Button (nascosto di default) -->
        

        </header>

   
        
    
    <!-- Modal di registrazione Freelancer -->
    <div class="modal fade" id="freelancerModal" tabindex="-1" aria-labelledby="freelancerModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="freelancerModalLabel">Registrati come Freelancer</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="freelancerForm">
                        <div class="mb-3">
                            <label for="freelancer-firstname" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="freelancer-firstname" required>
                        </div>
                        <div class="mb-3">
                            <label for="freelancer-lastname" class="form-label">Cognome</label>
                            <input type="text" class="form-control" id="freelancer-lastname" required>
                        </div>
                        <div class="mb-3">
                            <label for="freelancer-email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="freelancer-email" required>
                        </div>
                        <div class="mb-3">
                            <label for="freelancer-password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="freelancer-password" required>
                        </div>
                        <div class="mb-3">
                            <label for="freelancer-phone" class="form-label">Numero di Telefono</label>
                            <input type="tel" class="form-control" id="freelancer-phone" required>
                        </div>
                        <div class="mb-3">
                            <label for="freelancer-iva" class="form-label">Partita IVA</label>
                            <input type="text" class="form-control" id="freelancer-iva" required>
                        </div>
                        <div class="mb-3">
                            <label for="tipoAttivita" class="form-label">Tipo di Attività</label>
                            <select id="tipoAttivita" class="form-select" required>
                                <option value="Consulente">Consulente</option>
                                <option value="Sviluppatore">Sviluppatore</option>
                                <option value="Designer">Designer</option>
                                <option value="Copywriter">Copywriter</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Altro">Altro</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Registrati come Freelancer</button>
                    </form>
                    <p class="mt-3 text-center">Oppure, se sei già registrato, <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal" data-bs-dismiss="modal">Accedi</a></p>
                </div>
            </div>
        </div>
    </div>


    
    
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
    .then(response => response.json())
    .then(data => {
        if (!data.token || !data.ruolo) {
            throw new Error('Login fallito, ruolo o token non trovati');
        }
        
        // Salva token e ruolo nel localStorage
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("ruolo", data.ruolo);
        
        // Aggiorna l'header con il ruolo
        aggiornaHeader(data.ruolo);  // Chiamato subito dopo aver memorizzato il ruolo
        
        // Chiudi il modal di login
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        if (modal) modal.hide();

        // Reindirizza in base al ruolo
        window.location.href = data.ruolo === "freelance" ? "../freelance.html" : "../DashBoardCliente/dashboardCliente.html";
    })
    .catch(error => {
        console.error('Errore nel login:', error);
        alert('Errore nel login: ' + error.message);
    });
};



// Aggiornamento header
/*function aggiornaHeader(ruolo) {
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("btnFreelance").style.display = "none";
    document.getElementById("profileDropdown").style.display = "none";
    document.getElementById("clientDropdown").style.display = "none";
    
    if (ruolo === "freelance") {
        document.getElementById("profileDropdown").style.display = "block";
    } else if (ruolo === "cliente") {
        document.getElementById("clientDropdown").style.display = "block";
    }
}*/

// Controllo autenticazione all'avvio
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("authToken");
    const ruolo = localStorage.getItem("ruolo");
    if (token && ruolo) {
        aggiornaHeader(ruolo);
    }
});

// Logout
function logout() {
    fetch('http://localhost:8080/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("authToken")
        }
    })
    .finally(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("ruolo");
        window.location.reload();
    });
}

document.getElementById('logoutButton')?.addEventListener('click', logout);

document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    login(document.getElementById('loginUsername').value, document.getElementById('loginPassword').value);
});

// Eventi apertura modali

document.getElementById("loginBtn")?.addEventListener("click", function() {
    new bootstrap.Modal(document.getElementById('loginModal')).show();
});

document.getElementById("btnFreelance")?.addEventListener("click", function() {
    new bootstrap.Modal(document.getElementById('freelancerModal')).show();
});

const aggiornaHeader = () => {
    console.log("Eseguo aggiornaHeader..."); //  DEBUG
    const authToken = localStorage.getItem("authToken");
    const ruolo = localStorage.getItem("ruolo");
    
    console.log("Token:", authToken, "Ruolo:", ruolo); //  DEBUG

    // Seleziona gli elementi dell'header
    const loginBtn = document.getElementById("loginBtn");
    const freelanceButton = document.getElementById("btnFreelance");
    const profileDropdown = document.getElementById("profileDropdown");
    const clientDropdown = document.getElementById("clientDropdown");

    if (authToken && ruolo) {
        console.log("Utente autenticato, aggiornamento header..."); //  DEBUG

        if (loginBtn) loginBtn.style.display = "none";
        if (freelanceButton) freelanceButton.style.display = "none";

        if (ruolo === "freelance") {
            if (profileDropdown) profileDropdown.style.display = "block";
            if (clientDropdown) clientDropdown.style.display = "none";
        } else if (ruolo === "cliente") {
            if (profileDropdown) profileDropdown.style.display = "none";
            if (clientDropdown) clientDropdown.style.display = "block";
        }
    } else {
        console.log("Nessun utente autenticato, ripristino header..."); //  DEBUG

        if (loginBtn) loginBtn.style.display = "block";
        if (freelanceButton) freelanceButton.style.display = "block";
        if (profileDropdown) profileDropdown.style.display = "none";
        if (clientDropdown) clientDropdown.style.display = "none";
    }
};

// Esegui l'aggiornamento dell'header ogni volta che la pagina si carica
document.addEventListener("DOMContentLoaded", aggiornaHeader);






/*//gestione form registrazione
document.addEventListener("DOMContentLoaded", function () {
    // Aggiungi l'evento submit al form di registrazione
    document.getElementById('registerForm')?.addEventListener('submit', function(event) {
        event.preventDefault(); // Previene il comportamento di invio predefinito del form

        // Raccogli i dati del modulo
        const newUser = {
            nome: document.getElementById('register-firstname').value,
            cognome: document.getElementById('register-lastname').value,
            email: document.getElementById('register-email').value,
            password: document.getElementById('register-password').value
        };

        // Funzione per inviare la registrazione al backend
        addUser(newUser);
    });
});

// Funzione per la registrazione dell'utente
function addUser(newUser) {
    fetch('http://localhost:8080/utenti/addUser/cliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Imposta il content-type
        },
        body: JSON.stringify(newUser) // Invio dei dati come JSON
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message || "Errore durante la registrazione"); });
        }
        return response.json();
    })
    .then(data => {
        // Successo nella registrazione
        console.log('Utente registrato con successo:', data);
        alert('Registrazione avvenuta con successo!');

        // Pulisce il form e chiude il modal
        clearForm();
        closeModal();
    })
    .catch(error => {
        // Gestione degli errori
        console.error('Errore nella registrazione:', error);
        alert('Registrazione fallita: ' + error.message);
    });
}

// Funzione per svuotare i campi del modulo di registrazione
function clearForm() {
    document.getElementById('registerForm').reset(); // Reset del modulo
}

// Funzione per chiudere il modal di registrazione
function closeModal() {
    const modal = document.getElementById('registerModal');
    const modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) {
        modalInstance.hide(); // Chiude il modal
    }
}*/