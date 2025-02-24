document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Messaggio inviato con successo!');
    this.reset();
});
