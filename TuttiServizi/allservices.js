function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search); 
    return params.get(param);
}



const fetchFiltered = ()=>{
    const cat = getQueryParam('cat');
    
    const filters = getFilters();
    const budgetId = filters.budget ? filters.budget : 0;
    const minReviewScore = filters.recensione ? filters.recensione : 0;
    const categoria = filters.categoria ? filters.categoria : cat;
    console.log(categoria)
    
    let priceMin = 0, priceMax = 0;
    let score;
    let category;


    switch (parseFloat(budgetId)) {
            case 0:
                priceMin = 0;
                priceMax = Infinity;
                break;
            case 1:
                priceMin = 0;
                priceMax = 150;
                break;
            case 2:
                priceMin = 151;
                priceMax = 300;
                break;
            case 3:
                priceMin = 301
                priceMax = Infinity;
                break
        default:
            break;
    }

    switch (parseFloat(minReviewScore)) {
        case 0:
            score = 0;
            break;
        case 1:
            score = 4.5;
            break;
        case 2:
            score = 3.5;
            break;
        case 3:
            score = 2.5;
            break
        default:
            break;
    }


    switch (parseFloat(categoria)) {
        case 1:
            category = "Sviluppo Web";
            break;
        case 2:
            category = "Grafica & Design";
            break;
        case 3:
            category = "Marketing Digitale";
            break;
        case 4:
            category = "Scrittura & Traduzione";
            break
        case 0:
            category = null;
            break;
        default:
            break;
    }

console.log(category)
        let serviceArray = [];
        fetch('http://localhost:8080/utenti',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(service => { 




            service.map(u=>{
                if(u.servizi.length==0) return
                else u.servizi.map(s=>{
                    s.freelancer_nome = u.nome;
                    s.freelancer_id = u.id;
                    s.freelancer_cognome = u.cognome;
                    s.u_id = u.id;
                    serviceArray.push(s);

                }
            )
            })

                    // console.log(priceMin)
                    // console.log(priceMax)
                    const filteredByPrice = serviceArray.filter((data)=> parseFloat(data.prezzo)>=priceMin && parseFloat(data.prezzo)<=priceMax);
                    const filteredByScore = filteredByPrice.filter((data)=>getAverageRating(data.recensioni)>=score);
                    const filteredByCategory = filteredByScore.filter((data)=> category==null || data.categoria == category);

                    // console.log(filteredByPrice)
                    // console.log(filteredByScore)
                    // console.log(filteredByCategory)
                    
                    const cards = filteredByCategory.map(service=>{

                    return `
                    <div class="col-lg-4 mb-4">
                      <div class="card">
                        <img src="${getCategoryImg(service.categoria)}" alt="" class="card-img-top">
                        <div class="card-body">
                            <div class="freelancer-name-container">
                                <i class="fa-regular fa-user fa-lg" style="color: #3D52D5;"></i>
                                <h5 class="card-title">${service.freelancer_nome} ${service.freelancer_cognome}</h5>
                            </div>
                            <div class="description-container">
                                <p class="card-text">${service.descrizione}</p>
                            </div>
                            <div class="rating-container">
                                <div class="stars">
                                    <i class="fa-solid fa-star"></i>
                                    <p class="number-rating">${getAverageRating(service.recensioni)}</p>
                                    <p class="review-number">(${service.recensioni.length})</p>
            
                                </div>
                            </div>
                            <div class="price-container">
                                <p class="before-price">A partire da <span class="price-amount">${service.prezzo}</span> €</p>
                            </div>
            
                         <a href="../Servizio/service.html?s_id=${service.id}&u_id=${service.freelancer_id}" class="btn btn-outline-success btn-sm">Dettagli</a>
                        </div>
                       </div>
                      </div>
            
                    `
                }).join("")
                    
                        document.querySelector(".row").innerHTML = cards;
                
                });
    
    
        };
    

// CHANGES THE ACTIVE FIELD OF THE FILTER
const changeActive = ()=>{
    document.querySelectorAll(".filter-parameter").forEach((element)=>element.addEventListener("click", (e)=>{
        e.preventDefault();
        const actives = element.parentElement.parentElement.querySelectorAll(".active");
        actives ? actives.forEach((elem)=>elem.classList.remove("active")): null;
        element.classList.toggle("active");
    }))
}


function getFilters (){
    const arr = [];
    const filters = {
        budget: null,
        recensione: null,
        categoria: null
    };
    document.querySelectorAll(".filter-parameter").forEach((e=>arr.push(e.classList.contains("active")? e.getAttribute("data-value"):null)))

    for (let index = 0; index < arr.length; index++) {
        if(index <=2 && arr[index]!=null) filters.budget = arr[index] 
        if(index <=5 && index>=3 && arr[index]!=null) filters.recensione = arr[index]
        if(index <=9 && index>=6 && arr[index]!=null) filters.categoria = arr[index]  
    }
    console.log(filters)
    return filters;

}


changeActive();

const fetchAllServices = ()=>{
    let cards = "";
    fetch('http://localhost:8080/utenti',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(service => { 
        service.map(u=>{
            if(u.servizi.length==0) return
            else cards += u.servizi.map(s=>{
                return `
                <div class="col-lg-4 mb-4">
                  <div class="card">
                    <img src="${getCategoryImg(s.categoria)}" alt="" class="card-img-top">
                    <div class="card-body">
                        <div class="freelancer-name-container">
                            <i class="fa-regular fa-user fa-lg" style="color: #3D52D5;"></i>
                            <h5 class="card-title">${u.nome} ${u.cognome}</h5>
                        </div>
                        <div class="description-container">
                            <p class="card-text">${s.descrizione}</p>
                        </div>
                        <div class="rating-container">
                            <div class="stars">
                                <i class="fa-solid fa-star"></i>
                                <p class="number-rating">${getAverageRating(s.recensioni)}</p>
                                <p class="review-number">(${s.recensioni.length})</p>
        
                            </div>
                        </div>
                        <div class="price-container">
                            <p class="before-price">A partire da <span class="price-amount">${s.prezzo}</span> €</p>
                        </div>
        
                     <a href="../Servizio/service.html?s_id=${s.id}&u_id=${u.id}" class="btn btn-outline-success btn-sm">Dettagli</a>
                    </div>
                   </div>
                  </div>
        
                `
            }
            ).join("")
            })
            
        document.querySelector(".row").innerHTML = cards;


    });

}


const getAverageRating = (array)=>{
    let average = 0;
    array.forEach((e)=>average+=parseInt(e.voto))
    return array.length==0 ? 0 : average/array.length;
}

const getCategoryImg = (category)=>{
    if(category == "Sviluppo Web") return "../img/web-dev.jpg"
    if(category == "Grafica & Design") return "../img/graphic_design.jpg"
    if(category == "Marketing Digitale") return "../img/digital-marketing.jpg"
    if(category == "Scrittura & Traduzione") return "../img/traduzione.jpg"
}



document.addEventListener("DOMContentLoaded", fetchFiltered);



document.querySelector(".btn-filter").addEventListener("click", (e)=>{
    e.preventDefault();
    fetchFiltered()})

document.querySelector(".btn-reset").addEventListener("click",(e)=>{
    e.preventDefault()
    window.location.href = "allservices.html"})