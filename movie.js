// DOM ELEMENTS
const movie = document.getElementById('movie');

// CONSTANTS
const API_KEY = 'api_key=e7d1086de2e9cd16ee3122a05b4683a3';
const BASE_URL = 'https://api.themoviedb.org/3/';
const ID = window.location.search; 
const MOVIE_ID = ID.substring(1);
const MOVIE_URL = BASE_URL + 'movie/' + MOVIE_ID  + '?' + API_KEY + '&language=en-US'; 
const IMG_URL = 'https://image.tmdb.org/t/p/original';

// FUNCTIONS
function getMovie(url){
    fetch(url).then(response => response.json()).then(data => {
        showMovie(data);
    });
}

function showMovie(data){
    document.title = data.title;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <img src="${IMG_URL}${data.backdrop_path}" alt="${data.title} poster">`;
    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie-info');
    movieInfo.innerHTML = `
        <h2 class="title">${data.title}</h2>
        <p class="overview">${data.overview}</p>
        <p class="budget">Budget: $${data.budget}</p>
        <p class="revenue">Revenue: $${data.revenue}</p>
        <p class="release-date">Release date: ${data.release_date}</p>
        <p>Vote avarage: <span class="vote">${data.vote_average}</span></p>
    `;
    const vote = movieInfo.querySelector('.vote');
    if(data.vote_average >= 7){
        vote.style.color = '#288f40';
    } else {
        vote.style.color = '#a62120';
    }
    movie.appendChild(movieEl);
    movie.appendChild(movieInfo);
}

function updateTitle(){
    document.title = movie.title;
}

// APP START
window.addEventListener('load', () => {
    getMovie(MOVIE_URL);
});