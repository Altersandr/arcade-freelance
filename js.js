document.addEventListener("DOMContentLoaded", function() {
    console.log("Dashboard Freelance pronta!");

    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        });
    });

    const logoutButton = document.querySelector(".nav-link.btn");
    if (logoutButton) {
        logoutButton.addEventListener("click", function(event) {
            event.preventDefault();
            alert("Sei sicuro di voler uscire?");
            window.location.href = "index.html";
        });
    }
});
