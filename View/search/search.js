 document.querySelector('form').addEventListener('submit', async function (event) {
        event.preventDefault();
    
        const query = document.getElementById('pesquisa').value;
        const apiKey = '674b6081f99f69c9f78db42b04a1f987';
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;


        document.body.classList.add('pesquisa-feita');
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Erro ao buscar dados da API');
    
            const data = await response.json();
            const resultadosContainer = document.getElementById('resultados');
            resultadosContainer.innerHTML = '';  // Limpa os resultados anteriores
    
            // Itera sobre os resultados e cria cards para cada filme
            data.results.forEach(movie => {
                const card = document.createElement('div');
                card.classList.add('card', 'm-2');
                card.style.width = '18rem';
                card.style.height = '26rem';
                card.style.margin = '10px';
                // Exemplo de conteúdo do card
                card.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                           
                            <a class="btn btn-danger"  style="position: absolute;  bottom: 10px;" href="https://www.themoviedb.org/movie/${movie.id}" role="button">Ver mais</a>
                    </div>
                `;
                resultadosContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    });
    