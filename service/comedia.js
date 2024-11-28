document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '674b6081f99f69c9f78db42b04a1f987';
    const baseUrl = 'https://api.themoviedb.org/3';
    const genreId = 35;
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
                  <div class="card md-3 h-100">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top img-fluid rounded-start" style=" object-fit: cover; heigh: 50% " alt="${movie.title}">
                        <div class="card-body">
                            <h5 class="card-title" style="color: white">${movie.title}</h5>
                            <p class="card-text" style="overflow: hidden; height: 10rem;">
                                Data Lançamento: ${movie.release_date} <br>
                                Gênero: ${genres} <br>
                                Duração: ${duration} <br>
                                Direção: ${directors} <br>
                            </p>
                            <a class="btn btn-danger" style="position: absolute;  bottom: 10px;" href="https://www.themoviedb.org/movie/${movie.id}" role="button">Ver mais</a>
                        </div>
                    </div>
            
        `;

        const cardElement = document.createElement('movies');
        cardElement.innerHTML = cardHTML;
        cardElement.className =  'col-lg-3 col-md-6 col-sm-12 mb-3 mt-3';
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

