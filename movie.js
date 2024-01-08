const apiKey = 'b79f303cbfd929bc901d81c353cf82db';
        const apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

        async function getMovies() {
            try {
                const response = await fetch(`${apiUrl}&api_key=${apiKey}`);
                const data = await response.json();
                displayMovies(data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        function displayMovies(movies) {
            const moviesList = document.getElementById('cards');
            moviesList.innerHTML = '';

            movies.forEach((movie) => {
                const movieElement = document.createElement('div');
                movieElement.innerHTML = `
                <div class="card">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="...">
                <hr>
                <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.overview}</p>
                <p class="card-text">평점: ${movie.vote_average}</p>
                </div>
                </div>`;
                movieElement.addEventListener('click', function(){
                    alert(`영화 제목: ${movie.title}\nID: ${movie.id}`);
                });
                moviesList.appendChild(movieElement);
            });
        }

        function searchMovies() {
            const searchKeyword = document.getElementById('search-movie').value;
            if(!searchKeyword){
            }
            const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchKeyword}&api_key=${apiKey}`;
            console.log(searchKeyword);

            fetch(searchUrl)
                .then(response => response.json())
                .then(data => {
                    if(data.results.length === 0){
                        alert("검색 결과가 없습니다.");
                    } else{
                        displayMovies(data.results)
                    }
                })
                .catch(err => console.error(err));
        }

        document.addEventListener('DOMContentLoaded', () => {
            getMovies();
        });

        function enterKey(){
            if(window.event.keyCode == 13){
                searchMovies();
            } else if(!document.getElementById('search-movie').value){
                getMovies();
            }
        }