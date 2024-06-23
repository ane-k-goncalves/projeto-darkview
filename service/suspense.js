document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '674b6081f99f69c9f78db42b04a1f987';
    const baseUrl = 'https://api.themoviedb.org/3';
    const genreId = 27;
    const container = document.getElementById('movies');

    async function getMoviesByGenre(genreId) {
        const url = `${baseUrl}/discover/movie?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc&with_genres=${genreId}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Erro ao buscar filmes por gênero:', error);
        }
    }

    async function getMovieDetails(movieId) {
        const url = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar detalhes do filme:', error);
        }
    }

    async function getMovieCredits(movieId) {
        const url = `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar créditos do filme:', error);
        }
    }

    function createCard(movie, credits) {
        const genres = movie.genres.map(genre => genre.name).join(', ');
        const duration = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
        const directors = credits.crew.filter(member => member.job === 'Director').map(director => director.name).join(', ');

        const cardHTML = `
    
                    <div class="card md-3 h-100" style="width: 25rem; margin: 20px;">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top img-fluid rounded-start" alt="${movie.title}">
                        <div class="card-body">
                            <h5 class="card-title" style="color: white">${movie.title}</h5>
                            <p class="card-text">
                                Data Lançamento: ${movie.release_date} <br>
                                Gênero: ${genres} <br>
                                Duração: ${duration} <br>
                                Direção: ${directors} <br>
                            </p>
                            <a class="btn btn-danger" href="https://www.themoviedb.org/movie/${movie.id}" role="button">Ver mais</a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                            </svg>
                        </div>
                    </div>
            
        `;

        const cardElement = document.createElement('movies');
        cardElement.innerHTML = cardHTML;
        cardElement.className =  'col-lg-4 col-md-6 col-sm-12 mb-3';
        container.appendChild(cardElement);
    }

    async function populateCards() {
        const movies = await getMoviesByGenre(genreId);
        for (const movie of movies) {
            const movieDetails = await getMovieDetails(movie.id);
            const credits = await getMovieCredits(movie.id);
            createCard(movieDetails, credits);
        }
    }

    populateCards();
});