
    document.addEventListener('submit', function (event) {
        event.preventDefault();
        const loginMessage = document.getElementById('login-message');
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        //tenho que criar listar users e chamar aqui para ver se o user existe
       // UserService
        const storedUser = localStorage.getItem('user');
        console.log(storedUser)
        
            const user = JSON.parse(storedUser);
            if (email === user.email && password === user.password) {
                //logica para verificar dados
                console.log("sucesso")
                //  loginMessage.textContent = "Login bem-sucedido!";
              
                //loginMessage.classList.remove('bg-light', 'text-danger');
               // loginMessage.classList.add('text-success');
            } else {
                console.log("error")
                //loginMessage.textContent = "Email ou senha incorretos.";
               // loginMessage.classList.remove('bg-light', 'text-success');
                //loginMessage.classList.add('text-danger');
            }
       
});