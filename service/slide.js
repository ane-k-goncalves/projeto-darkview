document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '674b6081f99f69c9f78db42b04a1f987';
    const baseUrl = 'https://api.themoviedb.org/3';
    const carouselInner = document.getElementById('movies-container');

    async function getPopularMovies() {
        const url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;

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

    function createSlide(movie, credits, isFirstSlide) {
        const genres = movie.genres.map(genre => genre.name).join(', ');
        const duration = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
        const directors = credits.crew.filter(member => member.job === 'Director').map(director => director.name).join(', ');

        const slideClass = isFirstSlide ? 'carousel-item active' : 'carousel-item';
        const slideHTML = `
            <div class="${slideClass}">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="d-block w-100" alt="${movie.title}">
                <div class="carousel-caption">
                   
                    <a class="btn btn-dark " href="https://www.themoviedb.org/movie/${movie.id}" role="button">Ver mais</a>
                </div>
            </div>
        `;
        carouselInner.insertAdjacentHTML('beforeend', slideHTML);
    }

    async function populateCarousel() {
        const movies = await getPopularMovies();
        let isFirstSlide = true;
        for (const movie of movies) {
            const movieDetails = await getMovieDetails(movie.id);
            const credits = await getMovieCredits(movie.id);
            createSlide(movieDetails, credits, isFirstSlide);
            isFirstSlide = false;
        }
    }

    populateCarousel();
});