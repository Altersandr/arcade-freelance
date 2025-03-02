const fetchProfile = ()=>{
    const token = localStorage.getItem("authToken");
    // console.log(token)

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
            updateProfileDom(profile)
        })

    })
}

const updateProfileDom = (profile)=>{
    document.querySelector(".personal-email").textContent = profile.email;
    document.querySelector(".personal-name").textContent = profile.nome;
    document.querySelector(".personal-surname").textContent = profile.cognome;
    document.querySelector(".modifica-profilo").setAttribute("href", `modificaprofiloCliente.html?id=${profile.id}`)
}

fetchProfile()