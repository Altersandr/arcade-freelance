document.addEventListener('DOMContentLoaded', function() {
    const deletePortfolioButtons = document.querySelectorAll('.delete-portfolio-btn');

    deletePortfolioButtons.forEach(button => {
        button.addEventListener('click', function() {
            const portfolioItem = this.closest('.portfolio-item');
            portfolioItem.remove();
        });
    });
});


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
            console.log(profile)
            document.querySelector(".personal-email").textContent = profile.email;
            document.querySelector(".h2-freelance-name").textContent = profile.nome + " " +profile.cognome;
            document.querySelector(".freelance-overall-rating").textContent = getRecensioni(profile.servizi);
            
        })

    })
}

const getRecensioni = (servizi)=>{
    let averageScore = 0;
    let quant = 0;
    servizi.forEach((servizio)=>{
        document.querySelector(".services-category").textContent = servizio.categoria;
        let recensioni = servizio.recensioni;
        recensioni.forEach((recensione)=>{

            averageScore +=recensione.voto;
            quant++;

            if(quant<4){
                document.querySelector(`.review-para-${quant}`).textContent = recensione.commento;
            }
        })
    })
    return averageScore >0?averageScore/quant :0;
}

fetchProfile();