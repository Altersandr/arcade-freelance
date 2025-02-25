document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();


    const username = document.getElementById("register").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const email = document.getElementById("email").value;


    const usernameValid = /[A-Z]/.test(username);
    const usernameErrorDiv = document.getElementById("register-error");


    const passwordValid = /[A-Z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const passwordErrorDiv = document.getElementById("password-error");


    const confirmPasswordValid = password === confirmPassword;
    const confirmPasswordErrorDiv = document.getElementById("confirmPassword-error");


    const emailValid =  /[!@#$%^&*(),.?":{}/<>]/.test(email);
    const emailErrorDiv = document.getElementById("email-error");

   
//controlliamo se i campi sono vuoti


    if (username === "" || password === "" || confirmPassword === "" || email === ""){
        alert("Tutti i campi sono obbligatori");
        return;
     } if (username === "Davide" && password === "1234Ad<>" && email === "dav@gmail.com") {
            alert("Registrazione riuscita!");
      

    } else {
        alert("Username, password o email errati!");
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

         
          
});