const changeActive = ()=>{
    document.querySelectorAll(".dropdown-item").forEach((element)=>element.addEventListener("click", (e)=>{
        e.preventDefault();
        const actives = element.parentElement.parentElement.querySelectorAll(".active");
        console.log(actives)
        actives ? actives.forEach((elem)=>elem.classList.remove("active")): null;
        element.classList.toggle("active");
    }))
}

changeActive();

function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search); 
    return params.get(param);
}

const id = getQueryParam("id");


// console.log(id)


const addService = ()=>{
    const nuovoServizio = {
        descrizione: document.getElementById("serviceDescription").value,
        nome: document.getElementById("serviceTitle").value,
        prezzo: document.getElementById("servicePrice").value,
        categoria: document.querySelector(".active").textContent
    }

    console.log(nuovoServizio)
    fetch(`http://localhost:8080/servizi/${id}`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(nuovoServizio)
    })
    .then(response=>{
        if (!response.ok) {
            throw new Error('Non e stato possibile aggiungere servizio, riprovare');
        }
        return response.json()})
    .then(json=>{
        window.alert("Servizio aggiunto con successo");
        window.location.href = 'imieiservizi.html';
    }
    )
    .catch(error => {
        console.error('Errore nell\'aggiunta dell\'servizio:', error);
        printOutput({ error: error.message });
    });

}

console.log(document.querySelector(".aggiungi"));

document.querySelector("#editServiceForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    addService()});