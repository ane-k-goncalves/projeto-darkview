document.addEventListener('DOMContentLoaded', function () {
    event.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('age');
    const passwordInput = document.getElementById('password');
    
    const successMessage = document.getElementById('successMessage');

    document.addEventListener('submit', function (event) {
        event.preventDefault();
        let valid = true;

        if (valid) {
            const name = nameInput.value;
            const email = emailInput.value;
            const idade = ageInput.value;
            const password = passwordInput.value;

            const user = {
                nome: name,
                email: email,
                idade: idade,
                senha: password
            };

            localStorage.setItem('user', JSON.stringify(user));

            saveToServer(user);

            successMessage.textContent = 'Dados salvos com sucesso!';
            successMessage.style.display = 'block';
        }
    });

    function getErrorMessage(input) {
        if (input.validity.valueMissing) {
            return 'Este campo é obrigatório.';
        }
        if (input.validity.typeMismatch) {
            return 'Por favor, insira um valor válido.';
        }
        if (input.validity.tooShort) {
            return `Deve ter pelo menos ${input.minLength} caracteres.`;
        }
        if (input.validity.tooLong) {
            return `Deve ter no máximo ${input.maxLength} caracteres.`;
        }
        if (input.validity.rangeUnderflow) {
            return `O valor deve ser no mínimo ${input.min}.`;
        }
        if (input.validity.rangeOverflow) {
            return `O valor deve ser no máximo ${input.max}.`;
        }
        return 'Valor inválido.';
    }

    function saveToServer(user) {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (response.ok) {
                console.log('Dados salvos no servidor!');
            } else {
                console.error('Erro ao salvar dados no servidor.');
            }
        })
        .catch(error => {
            console.error('Erro ao salvar dados no servidor:', error);
        });
    }
});


email.addEventListener('invalid', function (event) {
    if(email.validity.typeMismatch) {
        email.setCustomValidity("O email não é válido!")
    }else {
        email.setCustomValidity("")
    }
});