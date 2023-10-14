
const watchlistContainer = document.getElementById('watchlist-container')
// Initialise myWatchlist from local storage or as an empty array
const myWatchlist = JSON.parse(localStorage.getItem("movieObject")) || [];
console.log(myWatchlist)
function renderWatchlist() {
    if (myWatchlist.length > 0) {
        let movieListHtml = "";
        myWatchlist.forEach(movie => {
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
                        <span class="add-to-watchlist"><i class="fa-solid fa-circle-minus" data-remove="${movie.imdbID}" style="color: #ffff;"></i>Remove</span>
                    </div>
                    <p class="plot">${movie.Plot}</p>
                </section>
            </div>
            `;

            watchlistContainer.innerHTML = movieListHtml;
            })
        }
    }

    renderWatchlist()