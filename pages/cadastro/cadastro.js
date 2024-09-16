import User from "../../model/user.js";
import UserService from "../../service/user.service.js";

function submitHandler(event) {
   
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const idade = document.getElementById('age').value;
        const senha = document.getElementById('password').value;
      
        let user = new User(name, email, idade, senha);

        UserService.insertUser(user)
        .then((response) => response.json())
        .then((data) => {
            console.log('Sucesso', data);
            alertity.sucess('Usuário cadastrado!')
        }).catch((error) =>{
            console.error('Error', error);
            alertity.error('Usuário não cadastrado!')
        })
    }
