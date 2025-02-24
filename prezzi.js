function addPrice() {
    const serviceNameInput = document.getElementById('serviceName');
    const servicePriceInput = document.getElementById('servicePrice');
    const serviceName = serviceNameInput.value.trim();
    const servicePrice = servicePriceInput.value.trim();

    if (serviceName && servicePrice) {
        const pricesList = document.getElementById('pricesList');
        const li = document.createElement('li');
        li.innerHTML = `<span>${serviceName}</span><span>${servicePrice} €</span>`;
        pricesList.appendChild(li);
        serviceNameInput.value = '';
        servicePriceInput.value = '';
    }
}

document.getElementById('pricesForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    alert('Modifiche salvate!');
});
