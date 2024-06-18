

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-box');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('idade');
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

document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '674b6081f99f69c9f78db42b04a1f987';
    const baseUrl = 'https://api.themoviedb.org/3';
    const movieId = 550; // ID do filme (Clube da Luta)

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

    function populateCard(movie) {
        document.getElementById('movie-poster').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        document.getElementById('movie-poster').alt = movie.title;
        document.getElementById('movie-title').textContent = movie.title;

        const genres = movie.genres.map(genre => genre.name).join(', ');
        const duration = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
        const directors = movie.credits.crew.filter(member => member.job === 'Director').map(director => director.name).join(', ');

        document.getElementById('movie-details').innerHTML = `
            Data Lançamento: ${movie.release_date} <br>
            Gênero: ${genres} <br>
            Duração: ${duration} <br>
            Direção: ${directors} <br>
        `;

        document.getElementById('movie-link').href = `https://www.themoviedb.org/movie/${movie.id}`;
    }

    getMovieDetails(movieId).then(movie => {
        // Requisição para obter os créditos do filme (diretor, elenco, etc.)
        const creditsUrl = `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`;
        fetch(creditsUrl)
            .then(response => response.json())
            .then(credits => {
                movie.credits = credits;
                populateCard(movie);
            });
    });
});
