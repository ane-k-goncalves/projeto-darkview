document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-login');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('age');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const ageError = document.getElementById('ageError');
    const passwordError = document.getElementById('passwordError');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let valid = true;

        // // Validar nome
        // if (!nameInput.validity.valid) {
        //     nameError.textContent = getErrorMessage(nameInput);
        //     nameError.style.display = 'block';
        //     valid = false;
        // } else {
        //     nameError.textContent = '';
        //     nameError.style.display = 'none';
        // }

        // // Validar email
        // if (!emailInput.validity.valid) {
        //     emailError.textContent = getErrorMessage(emailInput);
        //     emailError.style.display = 'block';
        //     valid = false;
        // } else {
        //     emailError.textContent = '';
        //     emailError.style.display = 'none';
        // }

        // // Validar idade
        // if (!ageInput.validity.valid) {
        //     ageError.textContent = getErrorMessage(ageInput);
        //     ageError.style.display = 'block';
        //     valid = false;
        // } else {
        //     ageError.textContent = '';
        //     ageError.style.display = 'none';
        // }

        // // Validar senha
        // if (!passwordInput.validity.valid) {
        //   //  passwordError.textContent = getErrorMessage(passwordInput);
        //     passwordError.style.display = 'block';
        //     valid = false;
        // } else {
        //     passwordError.textContent = '';
        //     passwordError.style.display = 'none';
        // }

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
