
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

function getAuthHeaders() {
    const token = localStorage.getItem("authToken");
    return token ? { 'Authorization': 'Bearer ' + token } : {};
  }

const fetchUserDetails = async ()=>{
    const authUser = await fetchAuthUser();

    // console.log(authUser)
    fetch("http://localhost:8080/utenti/getlogged",
        {   method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(authUser.email)
            
        }
    )
    .then(response=>response.json())
    .then(user=>{
        // console.log(user)
        loadDashboard(user)})
    // const userDetails = (await res).json()
    // loadDashboard(userDetails);
    // return await userDetails;
}



const fetchOrdini = ()=>{
    fetch("http://localhost:8080/ordini/dettagliOrdini",{
                method: "GET",
                headers: getAuthHeaders()
            })
            .then(res=>res.json())
            .then(ordini=>{
                // console.log(ordine[0])
                // const ord = JSON.parse(ordine);
                // console.log(ord)
                ordini.forEach(ordine=>{
                    let btn;
                    switch (ordine.stato) {
                        case "in corso":
                            btn = `<td><span class="badge bg-warning">${ordine.stato}</span></td>`
                            break;

                            case "rifiutato":
                            btn = `<td><span class="badge bg-danger">${ordine.stato}</span></td>`
                            break;
                            case "accettato":
                                btn = `<td><span class="badge bg-success">${ordine.stato}</span></td>`
                                break;
                        default:
                            break;
                    }



                    const tr = document.createElement('tr');
                        tr.innerHTML = `
                        <td>${ordine.titolo_servizio}</td>
                        <td>${ordine.data}</td>
                        <td>€${ordine.prezzo}</td>
                        ${btn}
                        `
                        document.querySelector(".table-body").appendChild(tr);


                    })
                })

            }

          

const loadDashboard = (user)=>{
    // console.log(user)
 document.querySelector("#customer-name").textContent = user.nome + " " + user.cognome;
 getMyReviews(user)

}

fetchUserDetails()
fetchOrdini()
// loadDashboard()



const getMyReviews = (user)=>{
    // console.log(user.id)
    fetch(`http://localhost:8080/recensioni/myreviews/${user.id}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res=>res.json())
    .then(reviews=>

        loadReviews(reviews)
    )
}


function loadReviews(reviews) {
    console.log(reviews)
    const reviewsList = document.getElementById("reviews-list");
    reviews.forEach(review => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<strong>${review.titolo}</strong> <br>
                        <span class="text-warning">${'★'.repeat(review.voto)}${'☆'.repeat(5 - review.voto)}</span><br>
                        <small>${review.commento}</small>`;
        reviewsList.appendChild(li);
    });
}

