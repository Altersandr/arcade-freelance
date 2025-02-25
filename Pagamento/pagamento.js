document.getElementById("creaOrdineForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let servizioId = document.getElementById("servizioId").value;
  let utenteId = document.getElementById("utenteId").value;

  fetch("/ordini/crea", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          servizio: { id: servizioId },
          utente: { id: utenteId },
          stato: "in attesa"
      })
  })
  .then(response => response.json())
  .then(data => alert("Ordine creato con successo!"))
  .catch(error => console.error(error));
});

document.getElementById("pagaOrdineForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let ordineId = document.getElementById("ordineId").value;
  let metodo = document.getElementById("metodo").value;
  let importo = document.getElementById("importo").value;

  fetch("/pagamenti/crea/" + ordineId, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          metodo: metodo,
          importo: importo,
          stato: "completato"
      })
  })
  .then(response => response.json())
  .then(data => alert("Pagamento completato!"))
  .catch(error => console.error(error));
});

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