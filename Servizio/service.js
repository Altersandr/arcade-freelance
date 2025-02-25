
// HALF STAR
/* <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" 
 class="bi bi-star-half text-warning" viewBox="0 0 16 16">
    <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"/>
</svg> */

// HOLLOW STAR
/* <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" 
    class="bi bi-star text-warning" viewBox="0 0 16 16">
    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg> */

//FULL STAR
/* <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
    class="bi bi-star-fill text-warning" viewBox="0 0 16 16">
    <path
    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg> */

// HOLLOW STAR WITH LIGHT TEXT
/* <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
    class="bi bi-star-fill text-light" viewBox="0 0 16 16">
    <path
    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg> */



const createReviewElement = (review)=>{

    const fullStar = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
        class="bi bi-star-fill text-warning" viewBox="0 0 16 16">
        <path
        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg> `
    const hollowStar = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" 
        class="bi bi-star text-warning" viewBox="0 0 16 16">
        <path 
        d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
    </svg>`;

    const voto = review ? review.voto: 5;
    return `
    <div class="d-flex align-items-start border-bottom pb-4 mb-4">
                            <img src="${review ? review.img : "http://www.placehold.co/100" }" alt=""
                              class="rounded-circle avatar-lg">
                            <div class="ms-3">
                              <h4 class="mb-1">
                                ${review ? review.name: "Oleksandr Tsurkan"}
                                <span class="ms-1 fs-6 ">${Math.floor(Math.random()*30+1)} Days  //DA CAMBIARE
                                  ago</span>
                              </h4>
                              <div class=" mb-2">
                                <span class="fs-6">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
                                    class="bi bi-star-fill text-warning" viewBox="0 0 16 16">
                                    <path
                                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                  </svg>
                                  ${voto>1? fullStar: hollowStar}
                                  ${voto>2? fullStar: hollowStar}
                                  ${voto>3? fullStar: hollowStar}
                                  ${voto>4? fullStar: hollowStar}
                                </span>
                              </div>
                              <p>${review?review.commento: "Fa schifo"}</p>
                              <div class="d-lg-flex">
                                <p class="mb-0">Questa recensione è stata utile?</p>
                                <a href="#" class="btn btn-xs btn-primary ms-lg-3">Yes</a>
                                <a href="#" class="btn btn-xs btn-outline-secondary ms-1">No</a>
                              </div>
                            </div>
                          </div>`


}


const getReviews = ()=>{
    const averageReviewScore= document.querySelector(".average-review-score"); //give this a textcontent with average value
    const averageReviewStars = document.querySelector(".average-review-stars"); //give this innerhtml with the stars svg
    const totalReviewQuantity = document.querySelector(".total-review-quantity"); //calculate the amount of reviews and assign textcontent
    const fiveStarPercentage = document.querySelector(".five-star-percentage"); // style= width: calculated number percentage followed by %
    const fourStarPercentage = document.querySelector(".four-star-percentage"); // style= width: calculated number percentage followed by %
    const threeStarPercentage = document.querySelector(".three-star-percentage"); // style= width: calculated number percentage followed by %
    const twoStarPercentage = document.querySelector(".two-star-percentage"); // style= width: calculated number percentage followed by %
    const oneStarPercentage = document.querySelector(".one-star-percentage"); // style= width: calculated number percentage followed by %
    const firstPercentageValue = document.querySelector(".first-percentage-value"); //textcontent is a percentage value of 5 star ratings amount followed by %
    const secondPercentageValue = document.querySelector(".second-percentage-value"); //textcontent is a percentage value of 5 star ratings amount followed by %
    const thirdPercentageValue = document.querySelector(".third-percentage-value"); //textcontent is a percentage value of 5 star ratings amount followed by %
    const fourthPercentageValue = document.querySelector(".fourth-percentage-value"); //textcontent is a percentage value of 5 star ratings amount followed by %
    const fifthPercentageValue = document.querySelector(".fifth-percentage-value"); //textcontent is a percentage value of 5 star ratings amount followed by %
    const reviewContainer = document.querySelector(".review-container"); // append child review


    const review = createReviewElement();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = review;
    reviewContainer.appendChild(wrapper);
}

function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search); 
    return params.get(param);
}


/* <i class="fa-solid fa-star"></i> //Full
<i class="fa-solid fa-star-half-stroke"></i> //Half
<i class="fa-regular fa-star"></i> */ //Hollow

const getService = ()=>{


    const serviceId = getQueryParam('id');
    const url = `https://fakestoreapi.com/products/${serviceId}`; // CHANGE TO OUR ENDPOINT


    fetch(url)
    .then(response => response.json())
    .then(service => {
        const serviceTitle = document.querySelector(".service-title");
        const personPicture = document.querySelectorAll(".about-img"); // 2 ELEMENTS
        const personName = document.querySelectorAll(".person-name"); // 2 ELEMENTS
        const personNumberRequests = document.querySelector(".person-number-requests"); //(numero di ordini in corso, si puo fare una query per vedere quanti ordini hanno lo stato "non completato")
        const starRatingContainer = document.querySelector(".stars"); // add as many stars as needed based on the overall score
        const overallScore = document.querySelector(".overall-score"); // 2  ELEMENTS 
        const numberOfReviews = document.querySelecetor(".number-of-reviews"); // 2 ELEMENTS
        const carouselContainer = document.querySelector(".carousel-inner"); // many pics
        const serviceSlogan = document.querySelector(".service-slogan");
        const serviceDescription = document.querySelector(".service-description");
        const contattaBtn = document.querySelector(".btn-sm"); // link anchor to the contact form
        const priceNumber = document.querySelector(".price-number");
        const goToPayment = document.querySelector(".btn-success"); // 2 things happen when you click, you add the service to your cart and you go to the page of the cart(need to change the href attribute)

        getSimilar(product.category);
    })
    .catch(error => console.error('Errore nel recupero del prodotto:', error));

    
}

const getSimilar = (category)=>{
        const xhr = new XMLHttpRequest();
        
        xhr.open("GET", "localhost/" + category, true); // change to our api
        xhr.onload = function(){
            const parsedData = JSON.parse(xhr.response).data;
        
            const cards = parsedData.map(service=>{
                const voto = service.voto;
                return `
                <div class="col-lg-4 mb-4">
                  <div class="card">
                    <img src="${service.img}" alt="" class="card-img-top">
                    <div class="card-body">
                        <div class="freelancer-name-container">
                            <i class="fa-regular fa-user fa-lg" style="color: #3D52D5;"></i>
                            <h5 class="card-title">${service.person_name} </h5>
                        </div>
                        <div class="description-container">
                            <p class="card-text">${service.description}</p>
                        </div>
                        <div class="rating-container">
                            <div class="stars">
                                <i class="fa-solid fa-star"></i>
                                <p class="number-rating">${votoAverageDellaPersona}</p> // DA MODIFICARE
                                <p class="review-number">(${quantitaRecensioni})</p> // DA MODIFICARE
        
                            </div>
                        </div>
        
        
                     <a href="http://127.0.0.1:5500/pages/service.html?id=${service.id}" class="btn btn-outline-success btn-sm">Dettagli</a>
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
        





// console.log(document.querySelector(".box1").firstElementChild.src)



getReviews();
