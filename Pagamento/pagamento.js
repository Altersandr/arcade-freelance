
const updateOrderSummary = () => {
  const orderSummary = document.querySelector("#order-summary");
  const totalSummary = document.querySelector(".total-summary");
  const token = localStorage.getItem("token");

//recupera gli ordini (su postman funziona)
  fetch('http://localhost:8080/ordini/dettagliOrdini', {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
  })
  .then(response => response.json()) 
  .then(data => {
      if (!data.length) {
          orderSummary.innerHTML = "<p>Nessun ordine trovato.</p>";
          totalSummary.textContent = "$0.00";
          return;
      }

      let total = 0;
      let summaryHTML = data.map(order => {
          total += order.prezzo;
          return `<p><strong>Ordine #${order.id}:</strong> ${order.descrizione} - $${order.prezzo}</p>`;
      }).join("");

      orderSummary.innerHTML = summaryHTML;
      totalSummary.textContent = `$${total.toFixed(2)}`;
  })
  .catch(error => {
      console.error("Errore:", error);
      orderSummary.innerHTML = "<p>Errore nel caricamento ordini.</p>";
      totalSummary.textContent = "$0.00";
  });
};

updateOrderSummary();

//DA TESTARE
document.getElementById('payment-form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  // Raccoglie i dati dal modulo
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address1 = document.getElementById('address1').value;
  const address2 = document.getElementById('address2').value;
  const city = document.getElementById('city').value;
  const region = document.getElementById('region').value;
  const zip = document.getElementById('zip').value;
  const paymentMethod = document.getElementById('payment-method').value;
  
  //servirebbe un campo nascosto con 'order-id'
  const ordineId = document.getElementById('order-id').value; 

  // Crea l'oggetto Pagamento
  const pagamento = {
      metodo: paymentMethod,       
      importo: 100.00,             // dovrebbe essere dinamico
      stato: 'Pagato',              // Stato predefinito
      nome: firstName,
      cognome: lastName,
      email: email,
      telefono: phone,
      indirizzo: {
          indirizzo1: address1,
          indirizzo2: address2,
          città: city,
          regione: region,
          cap: zip
      },
      ordine: {
          id: ordineId   // ID dell'ordine che deve essere passato dinamicamente :l
      }
  };

//fetch testata su postman, funziona se si ha un ordine effettuato 
  fetch('http://localhost:8080/pagamenti/add', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('authToken') 
      },
      body: JSON.stringify(pagamento)  
  })
  .then(response => {
      if (response.ok) {
          return response.json(); 
      } else {
          throw new Error('Errore nel pagamento');
      }
  })
  .then(data => {
      console.log('Pagamento aggiunto con successo:', data);
      window.location.href = '/success';  // 
  })
  .catch(error => {
      console.error('Errore durante la richiesta:', error);
      alert('Si è verificato un errore durante il pagamento');
  });
});

//prova con Stripe
/*const stripe = Stripe("pk_test_51QuwxGCz4neh1ydflvFDAM7yBEFpaioKS46LQede3oiYeuzsxdrJtOzySt5j9Ibelup9oNq8D25otlj02wmuA2Rt00xkU9O9cw"); // Sostituisci con la tua chiave pubblica Stripe

document.getElementById("pagaBtn").addEventListener("click", async () => {
  try {
      const ordineId = 123; // Sostituisci con l'ID reale dell'ordine

      // Chiamata al backend per creare la sessione di pagamento
      const response = await fetch("http://localhost:8080/payment/create-checkout-session", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ ordineId }) // Passa l'ordine al backend
      });

      const data = await response.json();

      if (data.redirectUrl) {
          window.location.href = data.redirectUrl; // Reindirizza l'utente a Stripe
      } else {
          console.error("Errore nella creazione della sessione di pagamento");
      }
  } catch (error) {
      console.error("Errore:", error);
  }
});*/

//funzione per creare un nuovo ordine test
/*document.getElementById("creaOrdineForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
    fetch('http://localhost:8080/ordini/crea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
    });
  
  // Gestione del form per aggiungere un nuovo ordine 
  document.getElementById('creaOrdineForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newOrder = {
      servizioId: document.getElementById('servizioId').value,
      utenteId: document.getElementById('utenteId').value
    };
    addOrder(newOrder);
  });*/