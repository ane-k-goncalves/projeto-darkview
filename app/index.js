import { User } from '../app/user.js';

(function () {
    document.querySelector('#reset-button')
    .addEventListener('click',function() {
        let formInputs = document.querySelectorAll('input');
        for (let element of formInputs){
            element.value = '';
        }
    });

    document.getElementById('submit').onsubmit = function (event) {
        event.preventDefault();

        let name = document.getElementById('form-box').elements['name'].value;
        let email = document.getElementById('#email').value;
        let idade = document.getElementById('#idade').value;

        let user = new User(name, email, idade);

        document.querySelector('#span-name').innerHTML = <strong>{ user.name } </strong>;
        document.querySelector('#span-email').textContent =  <strong>{ user.email } </strong>;
        document.querySelector('#span-idade').textContent =  <strong>{ user.idade } </strong>;

    }


})();

