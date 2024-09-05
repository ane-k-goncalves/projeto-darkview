export default class UserService {
    async insertUser(data) {
        const url = `http://localhost:3000/users`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(url, options);
            if(!response.ok) {
                throw new Error (`ERRO HTTP!, ${response.status} `);
            }
            return response;

        }catch(error) {
            console.error(error);
            return null;
        }
    }

    //alterar senha;
}