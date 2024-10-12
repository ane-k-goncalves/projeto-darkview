document.getElementById('form-login').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
    const ageInput = document.getElementById('age').value;
    const passwordInput = document.getElementById('password').value;
    
    const successMessage = document.getElementById('successMessage');


    const user  = {
        nome: nameInput,
        email: emailInput,
        idade: ageInput,
        senha: passwordInput
    };


    fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                console.log('Dados salvos no servidor!');
                successMessage.textContent = 'Dados salvos com sucesso!';
            } else {
                alert('Erro ao cadastrar!');
                console.error('Erro ao salvar dados no servidor.');
            }
        })
        .catch(error => {
            console.error('Erro ao salvar dados no servidor:', error);
        });
});
