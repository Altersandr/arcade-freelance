const fetchAllServices = ()=>{
const xhr = new XMLHttpRequest();

xhr.open("GET", "https://reqres.in/api/users", true);
xhr.onload = function(){
    const parsedData = JSON.parse(xhr.response).data;

    const cards = parsedData.map(service=>{
        return `
        <div class="col-lg-4 mb-4">
          <div class="card">
            <img src="${service.img}" alt="" class="card-img-top">
            <div class="card-body">
                <div class="freelancer-name-container">
                    <i class="fa-regular fa-user fa-lg" style="color: #3D52D5;"></i>
                    <h5 class="card-title">${service.first_name} ${service.last_name}</h5>
                </div>
                <div class="description-container">
                    <p class="card-text">${service.description}</p>
                </div>
                <div class="rating-container">
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <p class="number-rating">${service.rating}</p>
                        <p class="review-number">(${service.reviews})</p>

                    </div>
                </div>


             <a href="service.html" class="btn btn-outline-success btn-sm">Dettagli</a>
            </div>
           </div>
          </div>

        `
    }
    ).join("")

    document.querySelector(".row").innerHTML = cards;
};
xhr.send();

}

const fetchFiltered = (category)=>{


    // when i press the filter button i call this function that makes a fetch request to our backend
    // 
    const filters = getFilters();
    const budgetId = filters.budget ? filters.budget : 0;
    const minReviewScore = filters.recensione ? filters.recensione : 0;
    const deliveryTime = filters.tempo ? filters.tempo : 0;
    let priceMin = 0, priceMax = 0;
    let score;

    switch (parseFloat(budgetId)) {
            case 0:
                priceMin = 0;
                priceMax = Infinity;
                break;
            case 1:
                priceMin = 0;
                priceMax = 50;
                break;
            case 2:
                priceMin = 50;
                priceMax = 100;
                break;
            case 3:
                priceMin = 100
                priceMax = Infinity;
                break
        default:
            break;
    }

    switch (parseFloat(minReviewScore)) {
        case 0:
            score = 1;
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

        fetch('https://fakestoreapi.com/products/') //change with our endpoint
            .then(res => res.json())
            .then(service => { 
                const filteredByPrice = service.filter((data)=> parseFloat(data.price)>=priceMin && parseFloat(data.price)<=priceMax);
                const filteredByScore = filteredByPrice.filter((data)=>parseFloat(data.rating.rate)>=score)
                // console.log(filteredByPrice)
                // console.log(filteredByScore)
                const cards = filteredByScore.map(service=>{
                    return `
                    <div class="col-lg-4 mb-4">
                      <div class="card">
                        <img src="${service.img}" alt="" class="card-img-top">
                        <div class="card-body">
                            <div class="freelancer-name-container">
                                <i class="fa-regular fa-user fa-lg" style="color: #3D52D5;"></i>
                                <h5 class="card-title">${service.first_name} ${service.last_name}</h5>
                            </div>
                            <div class="description-container">
                                <p class="card-text">${service.description}</p>
                            </div>
                            <div class="rating-container">
                                <div class="stars">
                                    <i class="fa-solid fa-star"></i>
                                    <p class="number-rating">${service.rating}</p>
                                    <p class="review-number">(${service.reviews})</p>
            
                                </div>
                            </div>
            
            
                         <a href="service.html" class="btn btn-outline-success btn-sm">Dettagli</a>
                        </div>
                       </div>
                      </div>
            
                    `
                }
                ).join("")
            
                document.querySelector(".row").innerHTML = cards;
        
        });
};

    


// const getFiltered = (category)=>{


//     // when i press the filter button i call this function that makes a fetch request to our backend
//     // 
//     const filters = getFilters();
//     const xhr = new XMLHttpRequest();
//     const budgetId = filters.budget ? filters.budget : 0;
//     const minReviewScore = filters.recensione ? filters.recensione : 0;
    
//     const deliveryTime = filters.tempo ? filters.tempo : 0;
//     let priceMin = 0, priceMax = 0;
//     let score;

//     switch (parseFloat(budgetId)) {
//             case 0:
//                 priceMin = 0;
//                 priceMax = Infinity;
//                 break;
//             case 1:
//                 priceMin = 0;
//                 priceMax = 50;
//                 break;
//             case 2:
//                 priceMin = 50;
//                 priceMax = 100;
//                 break;
//             case 3:
//                 priceMin = 100
//                 priceMax = Infinity;
//                 break
//         default:
//             break;
//     }

//     switch (parseFloat(minReviewScore)) {
//         case 0:
//             score = 1;
//             break;
//         case 1:
//             score = 4.5;
//             break;
//         case 2:
//             score = 3.5;
//             break;
//         case 3:
//             score = 2.5;
//             break
//     default:
//         break;
// }

    
//     // xhr.open("GET", "localhost/" + category, true); // change to our api    
//     fetch('https://fakestoreapi.com/products/')
//     .then(res => res.json())
//     .then(service => { 
//         const filteredByPrice = service.filter((data)=> parseFloat(data.price)>=priceMin && parseFloat(data.price)<=priceMax);
//         const filteredByScore = filteredByPrice.filter((data)=>parseFloat(data.rating.rate)>=score)
//         console.log(filteredByPrice)
//         console.log(filteredByScore)

//     });

// }




// CHANGES THE ACTIVE FIELD OF THE FILTER
const changeActive = ()=>{
    document.querySelectorAll(".dropdown-item").forEach((element)=>element.addEventListener("click", (e)=>{
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
        tempo: null
    };
    document.querySelectorAll(".dropdown-item").forEach((e=>arr.push(e.classList.contains("active")? e.getAttribute("data-value"):null)))

    for (let index = 0; index < arr.length; index++) {
        if(index <=2 && arr[index]!=null) filters.budget = arr[index] 
        if(index <=5 && index>=3 && arr[index]!=null) filters.recensione = arr[index]
        if(index <=8 && index>=6 && arr[index]!=null) filters.tempo = arr[index]  
    }
    return filters;

}

changeActive();
// fetchFiltered();
// console.log(document.querySelectorAll(".dropdown").forEach((element)=>console.log(element.querySelector(".active"))))

// console.log(document.querySelector(".active").getAttribute("data-value"))



// fetchAllServices();