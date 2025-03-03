

const fetchRichieste = async ()=>{
    const res =  fetch("http://localhost:8080/ordini/richieste",
        {   method: "GET",
            headers: getAuthHeaders()
        }
    )
    const userRichieste = (await res).json()
    console.log(await userRichieste)
    return await userRichieste;
}



function getAuthHeaders() {
    const token = localStorage.getItem("authToken");
    return token ? { 'Authorization': 'Bearer ' + token } : {};
  }

  const changeStatus = async (id, action)=>{

    const res =  fetch("http://localhost:8080/ordini/status",
        {   method: "PUT",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                id: id,
                stato: action

            })
        }
    )
    return location.reload();
    // const userRichieste = (await res).json()
    // console.log(await userRichieste)
    // return await userRichieste;
}


const displayRichieste = async ()=>{
    const richieste = await fetchRichieste();
    console.log(await richieste)
    const table = document.querySelector(".table-body");
    table.innerHTML = "";

    const ctx = document.getElementById('myChart');
    const ctx2 = document.getElementById('myOtherChart');

    let totalRichieste = 0;
    let rifiutate = 0;
    let accettate = 0;

    let settembre = 0;
    let ottobre = 0;
    let novembre = 0;
    let dicembre = 0;
    let gennaio = 0;
    let febbraio = 0;
    let marzo = 0;




    const ric = await richieste.map((r)=>{

        const parsedPrice = parseFloat(r.prezzo)
        totalRichieste++;

        if(r.stato =="accettato") accettate++;
        if(r.stato =="rifiutato") rifiutate++;


        // console.log(r.data.charAt(0))
        if(r.stato == "accettato"){
            switch(parseInt(r.data.charAt(0))){
                case 9:
                    settembre+=parsedPrice;
                    break;
                case 10:
                    ottobre+=parsedPrice;
                    break;
                case 11: 
                    novembre += parsedPrice;
                    break;
                case 12:
                    dicembre +=parsedPrice;
                    break;
                case 1:
                    gennaio+=parsedPrice;
                    break;
                case 2:
                    febbraio+=parsedPrice;
                    break;
                case 3:
                    marzo+=parsedPrice;
                    break;
            }

        }
        

        const actionAccept = {
            id: r.id,
            stato: "accettato"
        }

        const actionDeclined = {
            id: r.id,
            stato: "rifiutato"
        }

        return `
            <tr>
                    <th scope="row">1</th>
                    <td>${r.nome_utente}</td>
                    <td>${r.titolo_servizio}</td>
                    <td>${r.email_utente}</td>
                    <td>${r.prezzo} euro</td>
                    <td>${r.stato}</td>
                    <td>${r.data}</td>
                     <td>
                     ${r.stato!="in corso"? r.stato: `<button class="btn btn-success" onclick="changeStatus(${actionAccept.id}, '${actionAccept.stato}')">Accetta</button>
                      <button class="btn btn-danger" onclick="changeStatus(${actionDeclined.id}, '${actionDeclined.stato}')">Declina</button>`}
                      
                    </td>
                  </tr> 
        `
    }).join(" ")

    new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [
                  'Richieste Rifiutate',
                  'Richieste Accettate',
                  'Totale Richieste'
                  ],
                  datasets: [{
                  label: 'Richieste',
                  data: [rifiutate, accettate, totalRichieste],
                  backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                  ],
                  hoverOffset: 4
                  }]
                  }
      });

      new Chart(ctx2, {
        type: 'line', 
        data: {
            labels:   [
                'Settembre',
                'Ottobre',
                'Novembre',
                'Dicembre',
                'Gennaio',
                'Febbraio',
                'Marzo',
              ],
            datasets: [{
                label: 'Guadagno Mensile',
                data: [settembre, ottobre, novembre, dicembre, gennaio, febbraio, marzo],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }]
        }
      })
      

    table.innerHTML = ric;

}


displayRichieste();