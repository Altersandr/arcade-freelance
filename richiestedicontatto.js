document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('.table tbody');

    table.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-success')) {
            handleAccept(event.target);
        } else if (event.target.classList.contains('btn-danger')) {
            handleDecline(event.target);
        }
    });

    function handleAccept(button) {
        const row = button.closest('tr');
        row.style.backgroundColor = 'green';
        const name = row.querySelector('td:nth-child(2)').textContent;
        alert(`Richiesta di ${name} accettata! Buon lavoro, torna nella dashboard ordini per caricare il progetto.`);
        
        
        button.textContent = 'In Corso';
        button.classList.remove('btn-success');
        button.classList.add('btn-secondary');
        button.disabled = true; 
    }
    document.addEventListener('DOMContentLoaded', function() {
        const redirectButton = document.getElementById('redirectButton');
        redirectButton.addEventListener('click', function() {
            window.location.href = 'http://127.0.0.1:3000/profilofreelance.html'; 
        });
    });
    function handleDecline(button) {
        const row = button.closest('tr');
        row.style.backgroundColor = 'red';
        const name = row.querySelector('td:nth-child(2)').textContent;
        alert(`Richiesta di ${name} declinata!`);
        setTimeout(() => {
            row.remove();
        }, 1000); 
    }
});