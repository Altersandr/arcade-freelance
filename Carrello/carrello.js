const getCartItem = () => {
            let cartElements = document.querySelector("#cart-elements");
            cartElements.innerHTML = ""; // Svuota il contenitore prima di aggiungere gli elementi
            const service = JSON.parse(localStorage.getItem("service"));


                const element = document.createElement("tr");
                element.innerHTML = `
                    <td>${service.nome}</td>
                    <td>${service.prezzo} €</td>`;



                document.querySelector(".total-amount").textContent = service.prezzo;
                document.querySelector(".totale-paga").textContent = service.prezzo;
                cartElements.appendChild(element);
                document.querySelector(".checkout-btn").addEventListener("click", ()=>addOrdine(service))
      


}

var utente;






const fetchAuthUser = async ()=>{
    const token = localStorage.getItem("authToken");

    const res = fetch("http://localhost:8080/api/profile",
        {   method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(token)
            
        }
    )
    const authUser = (await res).json();

    // console.log(await authUser)
    return await authUser;
}

const fetchUserDetails = async ()=>{
    const authUser = await fetchAuthUser();

    // console.log(authUser)
    const res =  fetch("http://localhost:8080/utenti/getlogged",
        {   method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(authUser.email)
            
        }
    )
    const userDetails = (await res).json()
    // console.log(await userDetails)
    return await userDetails;
}

const addOrdine = async (service)=>{
    const utente = await fetchUserDetails();
    fetch("http://localhost:8080/ordini", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            stato: "in corso",
            titolo_servizio: service.nome,
            prezzo: service.prezzo,
            data: new Date().toLocaleDateString(),
            nome_utente: utente.nome,
            email_utente: utente.email,
            servizio: service,
            utente:  utente
        })
    })

    alert("Ordine effettuato con successo");
    localStorage.removeItem("service");
    window.location.href = "../Homepage/homepage.html"

}

// const d = new Date();
// let text = d.toLocaleDateString();

// console.log(text)


// const authUser = fetchAuthUser();
// const userDetails = fetchUserProfile();

getCartItem();