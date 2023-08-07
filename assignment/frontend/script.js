// ... (previous code)

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginButton = document.getElementById('loginButton');
const signupButton = document.getElementById('signupButton');

const BASE_URL = 'http://localhost:8080/user';

loginButton.addEventListener('click', () => {
    const loginMail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;
    

    // Make a request to the backend API for user login
    fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: loginMail, password: loginPassword })
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log("data", data)
        if (data.success) {
            // User successfully logged in, you may want to store the user token in a session or local storage
            console.log('Login successful');
            // Display the user's profile, playlists, or other content here
        } else {
            console.error('Login failed:', data.msg);
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
    });
});

signupButton.addEventListener('click', () => {
    const signupUsername = document.getElementById('signupUsername').value;
    const signupPassword = document.getElementById('signupPassword').value;
    const signupAge = document.getElementById('signupAge').value;
    const signupEmail = document.getElementById('signupEmail').value;

    // Make a request to the backend API for user signup
    fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { name: signupUsername, password: signupPassword , age:signupAge, email:signupEmail })
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        if (data.success) {
            console.log('Signup successful');
            // You may want to redirect the user to the login page or handle the UI accordingly
        } else {
            console.error('Signup failed:', data.msg);
        }
    })
    .catch(error => {
        console.error('Error during signup:', error);
    });
});






const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const movieList = document.getElementById('movieList');

const API_KEY = 'ceef94c8'; // Get your API key from https://www.omdbapi.com/

const apiKey = 'ceef94c8';
let favoriteMovies = [];

        // Function to add a movie to the favorites playlist
        function addToFavorites(movie) {
            // favoriteMovies.push(movie);
            console.log('Added to favorites:', movie);
            
            
            // Make a POST request to the backend here
            // const backendUrl = 'https://example.com/api/favorites'; // Replace with your backend API URL
            // fetch(backendUrl, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(movie)
            // })
            // .then(response => {
            //     if (response.ok) {
            //         console.log('Movie added to favorites on the backend.');
            //     } else {
            //         console.error('Failed to add movie to favorites on the backend.');
            //     }
            // })
            // .catch(error => {
            //     console.error('Error making POST request:', error);
            // });
        }


        // Function to fetch and render movies
        function fetchAndRenderMovies(title) {
            const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.Response === 'True') {
                        const movies = data.Search;
                        const moviesContainer = document.getElementById('movieList');
                        movieList.innerHTML = ''; // Clear previous search results

                        movies.forEach((movie) => {
                            const movieInfo = `
                                <div>
                                    <h3>${movie.Title}</h3>
                                    <p>Year: ${movie.Year}</p>
                                    <p>Type: ${movie.Type}</p>
                                    <img src="${movie.Poster}" alt="${movie.Title}">
                                    
                                    <button onclick="addToFavorites(movie)">Add to Favorites</button>
                                    

                                </div>
                            `;
                            movieList.innerHTML += movieInfo;
                        });
                    } else {
                        alert('No movies found for the given search.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    alert('Error fetching data. Please try again later.');
                });
        }

        // Function to fetch and render movies when the page loads
        document.addEventListener('DOMContentLoaded', function () {
            const defaultMovieTitle = 'Avatar'; // Replace with the movie title you want to show on page load
            fetchAndRenderMovies(defaultMovieTitle);
        });

        // Event listener for the search button
        document.getElementById('searchButton').addEventListener('click', function () {
            const searchInput = document.getElementById('searchInput').value;
            fetchAndRenderMovies(searchInput);
        });