function getTMDB() {
    return '1db' + 'a2d' + '2c4' + '6f0' + 'f76' + 'ce1' + 'a6d' + '8d1' + '3c1' + 'bd9' + '50';
  }
  
const tmdb = getTMDB();
  
function searchMovies(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdb}&query=${query}`;

    axios.get(url)
        .then(response => {
            const movies = response.data.results;
            displayMovies(movies);
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = '';

    if (movies.length === 0) {
        const messageElement = document.createElement('p');
        messageElement.textContent = 'No movies found.';
        moviesContainer.appendChild(messageElement);
        return;
    }

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const title = movie.title;
        const releaseDate = movie.release_date;
        const overview = movie.overview;
        const posterPath = movie.poster_path;
        const movieId = movie.id;
        const rating = movie.vote_average;

        const titleElement = document.createElement('h2');
        const linkElement = document.createElement('a');
        linkElement.textContent = title;
        linkElement.href = `https://www.themoviedb.org/movie/${movieId}`;
        linkElement.target = '_blank';
        titleElement.appendChild(linkElement);

        const ratingElement = document.createElement('span');
        ratingElement.classList.add('movie-rating');
        ratingElement.textContent = rating ? ` Rating: ${rating}` : ' Rating: N/A';

        titleElement.appendChild(ratingElement);

        const releaseDateElement = document.createElement('p');
        releaseDateElement.textContent = `Release Date: ${releaseDate}`;

        const posterElement = document.createElement('img');
        if (posterPath) {
            posterElement.src = `https://image.tmdb.org/t/p/w300/${posterPath}`;
        } else {
            posterElement.src = 'placeholder.jpg';
        }
        posterElement.alt = title;

        movieElement.appendChild(titleElement);
        movieElement.appendChild(releaseDateElement);
        movieElement.appendChild(posterElement);

        moviesContainer.appendChild(movieElement);
    });
}

let createdByElement;

document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();

    if (query !== '') {
        searchMovies(query);

        if (createdByElement) {
            createdByElement.remove();
        }

        createdByElement = document.createElement('p');
        createdByElement.textContent = 'Page created by ';
        const createdByLink = document.createElement('a');
        createdByLink.textContent = 'Blijonas';
        createdByLink.href = 'https://github.com/Balionelis';
        createdByLink.target = '_blank';
        createdByLink.style.textDecoration = 'none';
        createdByLink.style.color = '#5EF1CF';
        createdByElement.appendChild(createdByLink);
        createdByElement.style.textAlign = 'center';
        createdByElement.style.fontWeight = 'bold';
        createdByElement.style.fontFamily = 'sfmono-regular';
        createdByElement.style.color = 'white'

        const bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.appendChild(createdByElement);

        console.log(`Searched movie: ${query}`);
    }
});


document.getElementById('search-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('search-button').click();
    }
});