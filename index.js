// DOM ELEMENTS
const container = document.getElementById('container');
const movies = document.getElementById('movies');
const form = document.getElementById('form');
const search = document.getElementById('search');

// CONSTANTS
const API_KEY = 'api_key=e7d1086de2e9cd16ee3122a05b4683a3';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + 'discover/movie?' + API_KEY + '&language=en-US&sort_by=popularity.desc&'; 
const IMG_URL = 'https://image.tmdb.org/t/p/original';
const SEARCH_URL = BASE_URL + 'search/movie?' + API_KEY + '&language=en-US&query=';

// FUNCTIONS
function getMovies(url){ 
    fetch(url).then(response => response.json()).then(data => {
        showMovies(data.results);
    });
}

function showMovies(data){
    data.forEach(movie => {
        const {title, id, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.setAttribute('id', id);
        movieEl.innerHTML = `
            <a href="movie.html?${id}">
                <img src="${IMG_URL}${poster_path}" alt="${title} poster">
                <h2 class="title">${title}</h2>
                <p class="overview">${overview}</p>
                <span class="vote">${vote_average}</span>
            </a>
        `;
        const vote = movieEl.querySelector('.vote');
        if(vote_average >= 7){
            vote.style.color = '#288f40';
        } else {
            vote.style.color = '#a62120';
        }
        movies.appendChild(movieEl);
    });
}

// EVENT LISTENERS
form.addEventListener('submit', (e) => {
    while(movies.firstChild){ // remove previous movies
        movies.removeChild(movies.firstChild);
    }
    e.preventDefault(); // prevent form from submitting
    if(search.value !== ''){
        const searchValue = search.value;
        getMovies(SEARCH_URL + searchValue);
        e.target.reset();
    }else{
        getMovies(API_URL);
    }

});

// APP START
window.addEventListener('load', () => {
    getMovies(API_URL);
});