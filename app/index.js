// OMDb API: https://www.omdbapi.com/?i=tt3896198&apikey=4fc3a442
// Send data requests to: http://www.omdbapi.com/?apikey=4fc3a442&
// Poster API requests: http://img.omdbapi.com/?apikey=4fc3a442&

/* index.html = search page. 
Calls to OMDB API with the title searched for and displays searched results */

/* the icon add to watchlist saves data to local storage */

const inputEl = document.getElementById("input-el");
const searchBtn = document.getElementById("search-btn");
const moviesContainer = document.getElementById("search-results");
// Initialise myWatchlist from local storage or as an empty array
let myWatchlist = JSON.parse(localStorage.getItem("movieObject")) ?? [];
let searchData = null; /* used to store search results from the OMDb */

const apiKey = "4fc3a442";

/* listen for click to the data attribute icon, take the object by its ID, push it into a watchlistArray */

document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("fa-circle-plus")) {
        const addIcon = e.target.dataset.add;

        if (searchData && searchData.Response === "True") {
            const movieObject = searchData.Search.find(movie => movie.imdbID === addIcon)
    
            if (movieObject) {
                myWatchlist.push(movieObject)
                localStorage.setItem("movieObject", JSON.stringify(myWatchlist));
                e.target.style.color = "green";
            }
        }
    }
})

searchBtn.addEventListener("click", async () => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${inputEl.value}`);
        const data = await response.json();

        if (data.Response === "True") {
            searchData = data; // Assign the fetched data to searchData
            let searchResult = data.Search;
            let movieListHtml = "";

            // Iterate over the searchResult array and fetch details for each movie by its imdbID
            await Promise.all(searchResult.map(async (movie) => {
                const movieResponse = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
                const movieDetails = await movieResponse.json()

            // Create a movie card for each movie
            movieListHtml += `
            <div class="movie-card">
                <img src="${movieDetails.Poster}" width="auto">
                <section>
                    <div class="film-set">
                        <h3>${movieDetails.Title}</h3>
                        <span class="rating"><i class="fa-solid fa-star" style="color: #ffcb15;"></i>${movieDetails.imdbRating}</span>
                    </div>
                    <div class="film-data">
                        <p>${movieDetails.Runtime}</p>
                        <p>${movieDetails.Genre}</p>
                        <span class="add-to-watchlist"><i class="fa-solid fa-circle-plus" data-add="${movieDetails.imdbID}" style="color: #000000;"></i>Watchlist</span>
                    </div>
                    <p class="plot">${movieDetails.Plot}</p>
                </section>
            </div>
            `;

            moviesContainer.innerHTML = movieListHtml;
            }))
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        moviesContainer.innerHTML = "<p>An error occurred while fetching data.</p>";
    }                        
})