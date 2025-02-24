document.getElementById("freelanceForm").addEventListener("submit", function(event) {
    event.preventDefault();


    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const email = document.getElementById("email").value;
    const partitaIva = document.getElementById("partitaIva").value;


    const usernameValid = /[A-Z]/.test(username);
    const usernameErrorDiv = document.getElementById("username-error");


    const passwordValid = /[A-Z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const passwordErrorDiv = document.getElementById("password-error");


    const confirmPasswordValid = password === confirmPassword;
    const confirmPasswordErrorDiv = document.getElementById("confirmPassword-error");


    const emailValid =  /[!@#$%^&*(),.?":{}/<>]/.test(email);
    const emailErrorDiv = document.getElementById("email-error");

    const partitaIvaValid = /[0-9]/.test(partitaIva);
    const partitaIvaErrorDiv = document.getElementById("partitaIva-error");

   
//controlliamo se i campi sono vuoti


    if (username === "" || password === "" || confirmPassword === "" || email === "" || partitaIva === ""){
        alert("Tutti i campi sono obbligatori");
        return;
     } if (username === "Davide" && password === "1234Ad<>" && email === "dav@gmail.com" && partitaIva === "12345678901") {
            alert("Registrazione riuscita!");
      

    } else {
        alert("Username, password, email o partitaIva errati!");
      }

      if (!usernameValid) {
        usernameErrorDiv.textContent = "Il nome utente deve contenere almeno una lettera maiuscola.";
        return;}

        if(!emailValid){
          emailErrorDiv.textContent = "L'email deve contenere un carattere speciale";
          return;}


        if (!passwordValid) {
          passwordErrorDiv.textContent = "La password deve contenere una Maiuscola e un carattere speciale";
          return;}

          if (!confirmPasswordValid) {
            confirmPasswordErrorDiv.textContent = "Le password non corrispondono.";
            return;
        }
        if (!partitaIvaValid) {
            partitaIvaErrorDiv.textContent = "La partita IVA deve contenere esattamente 11 numeri.";
            return;
        }

         
          
});