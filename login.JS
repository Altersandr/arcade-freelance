document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const usernameValid = /[A-Z]/.test(username);
    const usernameErrorDiv = document.getElementById("username-error");


    const passwordValid = /[A-Z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password); 
    const passwordErrorDiv = document.getElementById("password-error");
   

    // Controlliamo se i campi sono vuoti
    if (username === "" || password === "") {
      alert("Entrambi i campi sono obbligatori!");
      return;
    }
    if (username === "Admin" && password === "1234Ad<>") {
      alert("Login riuscito!");

    } else {
      alert("Username o password errati!");
    }

    if (!usernameValid) {
      usernameErrorDiv.textContent = "Il nome utente deve contenere almeno una lettera maiuscola.";
      return;}
      if (!passwordValid) {
        passwordErrorDiv.textContent = "La password deve contenere una Maiuscola e un carattere speciale";
        return;}
  });
  