
const watchlistContainer = document.getElementById('watchlist-container')
// Initialise myWatchlist from local storage or as an empty array
const myWatchlist = JSON.parse(localStorage.getItem("movieObject")) || [];

document.addEventListener('click', (e) => {
    const removeIcon = e.target.dataset.remove
    if (removeIcon) {
        handleDeleteClick(removeIcon)
    }
})

/* Swapped forEach() with map() to render the HTML from localStorage,
It is more reliable to update the UI with dynamic content */
function renderWatchlist() {
    const movieListHtml = myWatchlist.map(movie => `
        <div class="movie-card">
            <img class="movie-poster" src="${movie.Poster !== 'N/A' ? movie.Poster : 'images/no_image_placeholder.png'}">
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
    `).join('');

    watchlistContainer.innerHTML = movieListHtml;
}

    renderWatchlist()

    function handleDeleteClick(movieID) {
        const movieIndex = myWatchlist.findIndex(movie => movie.imdbID === movieID);
        if (movieIndex !== -1) {
            myWatchlist.splice(movieIndex,1);
            localStorage.setItem('movieObject', JSON.stringify(myWatchlist)); // Update the local storage
            renderWatchlist();
        }
    }