const container = document.querySelector(".row");

const fetchProfile = ()=>{
    const token = localStorage.getItem("authToken");
    let servizi = "";
    fetch("http://localhost:8080/api/profile",
        {   method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(token)
            
        }
    )
    .then(response=> response.json())
    .then(authProfile=>{
        fetch("http://localhost:8080/utenti/getlogged",
            {   method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(authProfile.email)
                
            }
        ).then(response=> response.json())
        .then(profile=>{
            document.querySelector(".add-service-btn").innerHTML = `<a href="aggiungiservizi.html?id=${profile.id}" class="btn btn-success" id="add-service-btn"><i class="fas fa-plus"></i> Aggiungi Servizio</a>`;
            const serviziArr = profile.servizi;
            servizi =  serviziArr.map(ser=>{
                return `
                 <div class="col-md-4">
                <div class="card service-card mb-4">
                    <img src="/freelance/web.jpg" class="card-img-top" alt="Design Grafico">
                    <div class="card-body">
                        <h5 class="card-title">${ser.nome} <span style="font-weight: 700">${ser.prezzo}€</span></h5>
                        <p class="card-text">${ser.descrizione}</p>
                        <button class="btn btn-primary" onclick="window.location.href='modificaservizi.html?id=${ser.id}'">Modifica</button>
                        <button class="btn btn-danger" onclick ="deleteServizio(${ser.id})">Cancella</button>
                    </div>
                </div>
            </div>
                `
            }
            ).join("")
            document.querySelector(".row").innerHTML = servizi;
        })
            console.log(servizi)
        
            
        })

    }


const deleteServizio = (s_id)=>{
    fetch(`http://localhost:8080/servizi/${s_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(response)
        return response.json(); // Converte la risposta in formato JSON
    })
    .then(data => {
        console.log(data)
        alert('Servizio eliminato con successo!');
        
    })
    alert('Servizio eliminato con successo!');
    location.reload();
}


fetchProfile();