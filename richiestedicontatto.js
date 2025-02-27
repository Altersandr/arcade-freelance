document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('.table tbody');

    table.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-success')) {
            handleAccept(event.target);
        } else if (event.target.classList.contains('btn-danger')) {
            handleDecline(event.target);
        }
    });
    $(document).ready(function() {
        function updateChart() {
            $.ajax({
                url: '/api/requests/accepted',
                method: 'GET',
                success: function(acceptedData) {
                    $.ajax({
                        url: '/api/requests/pending',
                        method: 'GET',
                        success: function(pendingData) {
                            var labels = acceptedData.map(function(request) {
                                return request.nome;
                            }).concat(pendingData.map(function(request) {
                                return request.nome;
                            }));
    
                            var acceptedValues = acceptedData.map(function(request) {
                                return request.prezzo;
                            });
    
                            var pendingValues = pendingData.map(function(request) {
                                return request.prezzo;
                            });
    
                            var ctx = document.getElementById('myChart').getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: labels,
                                    datasets: [{
                                        label: 'Richieste Accettate',
                                        data: acceptedValues,
                                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                        borderColor: 'rgba(75, 192, 192, 1)',
                                        borderWidth: 1
                                    }, {
                                        label: 'Richieste in Sospeso',
                                        data: pendingValues,
                                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                                        borderColor: 'rgba(255, 159, 64, 1)',
                                        borderWidth: 1
                                    }]
                                },
                                options: {
                                    scales: {
                                        y: {
                                            beginAtZero: true
                                        }
                                    }
                                }
                            });
                        },
                        error: function(error) {
                            console.error('Errore nel recupero dei dati delle richieste in sospeso:', error);
                        }
                    });
                },
                error: function(error) {
                    console.error('Errore nel recupero dei dati delle richieste accettate:', error);
                }
            });
        }
    
        updateChart();
    });
// Funzione per aggiornare un servizio con PUT
const updateServizio = async (id) => {
    const updatedServizio = {
        nome: "Servizio A aggiornato",
        descrizione: "Nuova descrizione",
        prezzo: 150
    };

    try {
        const response = await fetch(`http://localhost:8080/servizi/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedServizio)
        });
        if (!response.ok) {
            throw new Error('Errore nell\'aggiornamento del servizio');
        }
        const data = await response.json();
        console.log('Servizio aggiornato:', data); // Stampa i dati del servizio aggiornato
    } catch (error) {
        console.error('Errore nell\'aggiornamento del servizio', error);
    }
};
    function handleAccept(button) {
        const row = button.closest('tr');
        row.style.backgroundColor = 'green';
        const name = row.querySelector('td:nth-child(2)').textContent;
        alert(`Richiesta di ${name} accettata! Buon lavoro, torna nella dashboard ordini per caricare il progetto.`);
        
        
        button.textContent = 'In Corso';
        button.classList.remove('btn-success');
        button.classList.add('btn-secondary');
        button.disabled = true; 
    }
    document.addEventListener('DOMContentLoaded', function() {
        const redirectButton = document.getElementById('redirectButton');
        redirectButton.addEventListener('click', function() {
            window.location.href = 'http://127.0.0.1:3000/profilofreelance.html'; 
        });
    });
    function handleDecline(button) {
        const row = button.closest('tr');
        row.style.backgroundColor = 'red';
        const name = row.querySelector('td:nth-child(2)').textContent;
        alert(`Richiesta di ${name} declinata!`);
        setTimeout(() => {
            row.remove();
        }, 1000); 
    }
});

  // Funzione per ottenere i dati dal backend
  function getDataForChart() {
    fetch('http://localhost:8080/api/data/grafico')  // Cambia con il tuo endpoint API
      .then(response => response.json())
      .then(data => {
        // Chiamata alla funzione per creare il grafico con i dati ricevuti
        updateChart(data);
      })
      .catch(error => {
        console.error('Errore nel recupero dei dati:', error);
      });
  }

  // Funzione per aggiornare il grafico con i dati ricevuti
  function updateChart(data) {
    var ctx = document.getElementById('myBarChart').getContext('2d');
    var myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Giorno 1', 'Giorno 2', 'Giorno 3', 'Giorno 4'], // Puoi farli dinamici se il backend li restituisce
        datasets: [{
          label: 'Numero di richieste',
          data: data, // I dati ricevuti dal backend
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Chiamata alla funzione per caricare i dati appena la pagina viene caricata
  window.onload = function() {
    getDataForChart();
  };


var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar', // Cambia il tipo di grafico a seconda delle tue necessità
    data: {
        labels: ['Mario', 'Francesco', 'Alessandro', 'Daniele'], // Sostituisci con i dati reali
        datasets: [{
            label: 'Richieste di Contatto',
            data: [5, 3, 8, 6], // Sostituisci con i dati reali
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
$(document).ready(function() {
    function updateChart() {
        $.ajax({
            url: '/api/requests/accepted',
            method: 'GET',
            success: function(acceptedData) {
                $.ajax({
                    url: '/api/requests/pending',
                    method: 'GET',
                    success: function(pendingData) {
                        
                        var labels = acceptedData.map(function(request) {
                            return request.nome;
                        }).concat(pendingData.map(function(request) {
                            return request.nome;
                        }));

                        var acceptedValues = acceptedData.map(function(request) {
                            return request.prezzo;
                        });

                        var pendingValues = pendingData.map(function(request) {
                            return request.prezzo;
                        });

                       
                        var ctx = document.getElementById('myChart').getContext('2d');

                        
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: labels,
                                datasets: [{
                                    label: 'Richieste Accettate',
                                    data: acceptedValues,
                                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    borderWidth: 1
                                }, {
                                    label: 'Richieste in Sospeso',
                                    data: pendingValues,
                                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                                    borderColor: 'rgba(255, 159, 64, 1)',
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }
                        });

                     
                        if (myChart) {
                            myChart.update();  
                        }

                    },
                    error: function(error) {
                        console.error('Errore nel recupero dei dati delle richieste in sospeso:', error);
                    }
                });
            },
            error: function(error) {
                console.error('Errore nel recupero dei dati delle richieste accettate:', error);
            }
        });
    }

    // Esegui il primo aggiornamento del grafico
    updateChart();
});
