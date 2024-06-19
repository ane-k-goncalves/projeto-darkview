

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-box');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('age');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const ageError = document.getElementById('ageError');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function (event) {
        let valid = true;
        
        // Validar nome
        if (!nameInput.validity.valid) {
            nameError.textContent = getErrorMessage(nameInput);
            nameError.style.display = 'block';
            valid = false;
        } else {
            nameError.textContent = '';
            nameError.style.display = 'none';
        }

        // Validar email
        if (!emailInput.validity.valid) {
            emailError.textContent = getErrorMessage(emailInput);
            emailError.style.display = 'block';
            valid = false;
        } else {
            emailError.textContent = '';
            emailError.style.display = 'none';
        }

        // Validar idade
        if (!ageInput.validity.valid) {
            ageError.textContent = getErrorMessage(ageInput);
            ageError.style.display = 'block';
            valid = false;
        } else {
            ageError.textContent = '';
            ageError.style.display = 'none';
        }

        if (!valid) {
            event.preventDefault();
        } else {
            successMessage.textContent = 'Formulário enviado com sucesso!';
            successMessage.style.display = 'block';
            event.preventDefault(); // Remova esta linha quando quiser enviar o formulário para o servidor
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
});


class User {
    constructor(name, email, idade, password) {
        this.name = name;
        this.email = email;
        this.idade = idade;
        this.password = password;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-box');
    const resetButton = document.getElementById('reset-button');
    const spanName = document.getElementById('name');
    const spanEmail = document.getElementById('email');
    const spanIdade = document.getElementById('age');

    // Recuperar e exibir dados do localStorage ao carregar a página
    function displayUserData() {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            spanName.textContent = user.name;
            spanEmail.textContent = user.email;
            spanIdade.textContent = user.idade;
        }
    }
    displayUserData();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const idade = document.getElementById('age').value;
        const password = document.getElementById('password').value;

        const user = new User(name, email, idade, password);

        // Armazenar dados no localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // Exibir dados
        spanName.textContent = user.nome;
        spanEmail.textContent = user.email;
        spanIdade.textContent = user.idade;
    });

});