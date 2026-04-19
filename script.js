const API = "https://ghibliapi.vercel.app/films";
const movieGrid = document.getElementById("movie-grid");
const director = document.getElementById("directors");
const year = document.getElementById("year");
let allMovies = []; 

async function fetchMovies() {
    try {
        const response = await fetch(API);
        const movies = await response.json();  
        allMovies = movies;
        selectDirectors(movies);  
        selectYear(movies);
        showMovies(movies);
    } catch(error) {
        console.error("Error fetching data:", error);
    };
};

function selectDirectors(movies) {
    const uniqueDirectors = new Set();
    movies.forEach(movie => {
        uniqueDirectors.add(movie.director);
    });
    director.innerHTML = '<option value="all">All Directors</option>';
    uniqueDirectors.forEach((dir) => {
        const option = document.createElement("option");
        option.value = dir;
        option.textContent = dir;
        director.appendChild(option);
    });
};

function showMovies(movies) {
    movieGrid.innerHTML = "";
    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Director: ${movie.director}</p>
            <p>Year: ${movie.release_date}</p>
        `;
        movieGrid.appendChild(movieCard);
    });
};

function selectYear(movies){
    const uniqueYears = new Set();
    movies.forEach((movie) => {
        uniqueYears.add(movie.release_date)
    });
    year.innerHTML = '<option value="all">All Years</option>';
    uniqueYears.forEach((y)=>{
        const option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        year.appendChild(option);
    });

};

function filterMovies() {
    const selectedDirector = director.value;
    const selectedYear = year.value;
    const filteredMovies = allMovies.filter(movie => {
        const matchesDirector = selectedDirector === "all" || movie.director === selectedDirector;
        const matchesYear = selectedYear === "all" || movie.release_date === selectedYear;
        return matchesDirector && matchesYear;
    });
    showMovies(filteredMovies);
};

director.addEventListener("change", filterMovies);
year.addEventListener("change", filterMovies);
fetchMovies();
