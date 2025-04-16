const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";

const IMG_URL = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    showMovie(data.results);
  } catch (err) {
    alert("Something is Wrong!!!");
  }
}

// Call the function after defining it
getMovies(API_URL);


function showMovie(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");

    movieEl.classList.add("movie");

    movieEl.innerHTML = `<div class="movie">
           <img src="${IMG_URL + poster_path}" alt="${title}">
           <div class="movie-info">
             <h3>${title}</h3>
             <span class="${getClassByRate(
               vote_average
             )}">${vote_average}</span>
           </div>
           <div class="overview">
             <h3>Overview</h3>
            ${overview}
           </div> 
         </div>`;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    searchTerm = "";
  } else {
    window.location.reload();
  }
});
