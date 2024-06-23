document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (email === user.email && password === user.password) {
                loginMessage.textContent = "Login bem-sucedido!";
                loginMessage.classList.remove('bg-light', 'text-danger');
                loginMessage.classList.add('text-success');
            } else {
                loginMessage.textContent = "Email ou senha incorretos.";
                loginMessage.classList.remove('bg-light', 'text-success');
                loginMessage.classList.add('text-danger');
            }
        } else {
            loginMessage.textContent = "Nenhum usuário encontrado. Por favor, cadastre-se.";
            loginMessage.classList.remove('bg-light', 'text-success');
            loginMessage.classList.add('text-danger');
        }
    });
});