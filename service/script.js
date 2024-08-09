document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '674b6081f99f69c9f78db42b04a1f987';
    const baseUrl = 'https://api.themoviedb.org/3';

    const container = document.getElementById('movies-container');

    async function getPopularMovies() {
        const url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=pt-BR`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Erro ao buscar filmes populares:', error);
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
            <div class="col-sm-4">
                <div class="card mb-3 h-100">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img-fluid rounded-start" alt="${movie.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${movie.title}</h5>
                                <p class="card-text">
                                    Data Lançamento: ${movie.release_date} <br>
                                    Gênero: ${genres} <br>
                                    Duração: ${duration} <br>
                                    Direção: ${directors} <br>
                                </p>
                                <a class="btn btn-danger" href="https://www.themoviedb.org/movie/${movie.id}" role="button">Ver mais</a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-suit-heart" viewBox="0 0 16 16">
                                    <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const cardElement = document.createElement('div');
        cardElement.innerHTML = cardHTML;
        container.appendChild(cardElement);
    }

    async function populateCards() {
        const movies = await getPopularMovies();
        for (const movie of movies) {
            const movieDetails = await getMovieDetails(movie.id);
            const credits = await getMovieCredits(movie.id);
            createCard(movieDetails, credits);
        }
    }

    populateCards();
});
