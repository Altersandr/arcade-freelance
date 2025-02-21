 // Funzione per alternare la visibilità delle risposte
 function toggleAnswer(id) {
    var answer = document.getElementById('answer' + id);
    if (answer.style.display === "none" || answer.style.display === "") {
        answer.style.display = "block";
    } else {
        answer.style.display = "none";
    }
}