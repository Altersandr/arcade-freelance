 // Simulazione dati recensioni fatte
 const reviews = [
    { freelancer: "Luca Bianchi", date: "2024-01-10", rating: 5, text: "Ottimo servizio, sicuramente tornerò!" },
    { freelancer: "Giulia Verdi", date: "2024-02-15", rating: 4, text: "Lavoro buono, ma con qualche ritardo." },
    { freelancer: "Marco Neri", date: "2024-02-20", rating: 5, text: "Servizio impeccabile!" }
];

function loadReviews() {
    const reviewsList = document.getElementById("reviews-list");
    reviews.forEach(review => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<strong>${review.freelancer}</strong> - ${review.date} <br>
                        <span class="text-warning">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span><br>
                        <small>${review.text}</small>`;
        reviewsList.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", loadReviews);