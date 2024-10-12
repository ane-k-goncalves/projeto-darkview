document.getElementById('form-box').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;




    fetch(`http://localhost:3000/users?email=${email}&password=${senha}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
      
    })
    .then(response => {
        if (response.ok) {
            console.log('Login bem-sucedido!');
            alert('Login realizado com sucesso!');
            window.location.href = 'main.html';
        } else {
            alert('Usuário ou senha inválidos!');
        }
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login');
    });

});