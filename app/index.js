const inputEl = document.getElementById("input-el");
const searchBtn = document.getElementById("search-btn");
const moviesContainer = document.getElementById("search-results");

let researchArr = []

let storageKey = "movieObject"

const movieDetailsArr = {}

// Load existing watchlist from local storage or initialize as an empty array
const myWatchlist = JSON.parse(localStorage.getItem(storageKey)) || [];

searchBtn.addEventListener("click", (e) => {
    const apiKey = "4fc3a442";
    const searchKeyword = inputEl.value;
    e.preventDefault();
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchKeyword}`)
        .then(res => res.json())
        .then(data => {
            researchArr = data.Search; // array holding a collection of movies related to the keyword research    
            
            let movieListHtml = ""
            
            researchArr.forEach(movie => {
                const movieID = movie.imdbID;
                fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieID}`)
                    .then(res => res.json())
                    .then(movie => {
                        console.log(movie)
                        movieDetailsArr[movieID] = movie
                        /* In the researchArr.forEach(), the iteration receives the block of data for each movie and stores it in movieDetailsArr using the imdbID as the key. For example, if a movie has an imdbID of "tt12345", the code stores its detailed data under movieDetailsArr["tt12345"]. */
                        /* console.log(movie) */
                        movieListHtml += `
                        <div class="movie-card">
                            <img class="movie-poster" src="${movie.Poster !== 'N/A' ? movie.Poster : 'images/no_image_placeholder.png'}"">
                            <section>
                                <div class="film-set">
                                    <h3 class="film-title">${movie.Title}</h3>
                                    <span class="rating"><i class="fa-solid fa-star" style="color: #ffcb15;"></i>${movie.imdbRating}</span>
                                </div>
                                <div class="film-data">
                                    <p>${movie.Runtime}</p>
                                    <p>${movie.Genre}</p>
                                    <span class="add-to-watchlist"><i class="fa-solid fa-circle-plus" data-add="${movie.imdbID}" style="color: #ffff;"></i>Watchlist</span>
                                </div>
                                <p class="plot">${movie.Plot}</p>
                            </section>
                        </div>
                        `;

                        moviesContainer.innerHTML = movieListHtml;                        
                    })                                            
            })
        })
})

// - take one movie by ID listening for the "add icon" click
// - store it into local Storage
moviesContainer.addEventListener("click", (e) => {
    if (e.target.dataset.add) {
        const movieID = e.target.dataset.add;
        handleAddClick(movieID);
    }
})


function handleAddClick(movieID){
    const movie =movieDetailsArr[movieID]
    /* console.log(movie) */
    if (movie) {
        // Add the new movie to the existing watchlist
        myWatchlist.push(movie);
        // Save the updated watchlist back to local storage
        localStorage.setItem(storageKey, JSON.stringify(myWatchlist));
        /* console.log(myWatchlist); */ // Log the updated watchlist
    }
}
