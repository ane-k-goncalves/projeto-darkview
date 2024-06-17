const API_KEY = 'api_key=674b6081f99f69c9f78db42b04a1f987';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_URL = BASE_URL + '/discover/movie?sort_by=ppopularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/w500';

getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(res => res.json).then(data => {
       showMovies(data.results);
    })
}

function showMovies(data) {
    data.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('col');
        movieEl.innerHTML = `
                         <div class="card mb-3 h-100 ">
                            <div class="row g-0">
                                <div class="col-md-4 ">
                                    <img src="..." class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                    <h5 class="card-title">Nome do Filme</h5>
                                        <p class="card-text">Data Lançamento: <br>
                                            Genero:<br>
                                            Duração:<br>
                                            Direção:<br>
                                        
                                        </p>
                                        <a class="btn btn-danger" href="#" role="button">Ver mais</a>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-suit-heart" viewBox="0 0 16 16">
                                            <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                                        </svg>
                                    </div>
                                </div> 
                            </div> 
                            </div>
        `
    })
}