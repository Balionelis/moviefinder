const tmdb = '1dba2d2c46f0f76ce1a6d8d13c1bd950';

function searchMovies(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdb}&query=${query}`;

    axios.get(url)
        .then(response => {
            const movies = response.data.results;
            displayMovies(movies);
        })
        .catch(error => {
            console.error('Error fetching movies:, error');
        });
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = '';
  
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
      ratingElement.textContent = rating !== 0 ? ` Rating: ${rating}` : ' Rating: N/A';
  
      titleElement.appendChild(ratingElement);
  
      const releaseDateElement = document.createElement('p');
      releaseDateElement.textContent = `Release Date: ${releaseDate}`;
  
      const overviewElement = document.createElement('p');
      overviewElement.textContent = overview;
  
      const posterElement = document.createElement('img');
      posterElement.src = `https://image.tmdb.org/t/p/w300/${posterPath}`;
      posterElement.alt = title;
  
      movieElement.appendChild(titleElement);
      movieElement.appendChild(releaseDateElement);
      movieElement.appendChild(overviewElement);
      movieElement.appendChild(posterElement);
  
      moviesContainer.appendChild(movieElement);
    });
  }
  

document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();

    if (query !== '') {
        searchMovies(query);
    }
});

document.getElementById('search-input').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        const query = event.target.value.trim();

        if (query !== '') {
            searchMovies(query);
            
            // Display created by element when the search button is clicked
            const createdByElement = document.createElement('p');
            createdByElement.textContent = 'Page created by ';
            const createdByLink = document.createElement('a');
            createdByLink.textContent = 'Blijonas';
            createdByLink.href = 'https://github.com/Balionelis';
            createdByLink.target = '_blank';
            createdByLink.style.textDecoration = 'none';
            createdByLink.style.color = '#3474eb';
            createdByElement.appendChild(createdByLink);
            createdByElement.style.textAlign = 'center';
            createdByElement.style.fontWeight = 'bold';
            document.body.appendChild(createdByElement);

            console.log(`Searched movie: ${query}`);
        }
    }
});