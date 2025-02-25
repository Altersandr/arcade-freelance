document.write(`
    <header class="d-flex justify-content-between align-items-center p-3">
        <!-- Logo -->
          <a class="header navbar-brand" href="../Homepage/homepage.html">
            <img src="../img/logo project work.png" alt="arcade Logo" class="me-2" width="50">
            
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
        
        <button class="btn text-white" onclick="window.location.href='../registerFreelance.html'">Sono un Freelancer</button>
        
        <!-- Login Button -->
        <button class="btn text-white" onclick="window.location.href='../login.html'">Accedi</button>
    </header>
    `);
