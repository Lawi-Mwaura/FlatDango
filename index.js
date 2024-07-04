// Initialization of the DOM
document.addEventListener('DOMContentLoaded', () => {

  // URL of the films data
  const url = 'http://localhost:3000/films';

  // Fetch JSON data from the provided URL
  async function fetchData(url) {
      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error('Network response is faulty');
          }
          return await response.json();
      } catch (error) {
          console.error(error);
          displayErrorMessage('Failed to load data. Please try again later.');
          return null;
      }
  }

  // Fetch and show results based on the URL
  async function fetchAndShowResults(url) {
      const data = await fetchData(url);
      if (data && data.length) {
          showResults(data);
      } else {
          displayErrorMessage('No movies found.');
      }
  }

  // Display movie results
  function showResults(movies) {
      const cardContainer = document.querySelector('.card-container');
      cardContainer.innerHTML = '';

      const rowSize = 4; // Number of cards per row
      let currentRow;

      movies.forEach((movie, index) => {
          const { id, title, runtime, capacity, showtime, ticketsSold, description, poster } = movie;

          // Check if a new row needs to be created
          if (index % rowSize === 0) {
              currentRow = document.createElement('div');
              currentRow.classList.add('row');
              cardContainer.appendChild(currentRow);
          }

          // Create a new card element
          const cardElement = document.createElement('div');
          cardElement.classList.add('card');

          // Construct the card content
          const cardContent = `
              <h2 class="card-title">${title || ''}</h2>
              <p class="card-runtime">Runtime: ${runtime || ''} minutes</p>
              <p class="card-capacity">Capacity: ${capacity || ''}</p>
              <p class="card-showtime">Showtime: ${showtime || ''}</p>
              <p class="card-tickets-sold">Tickets Sold: ${ticketsSold || 0}</p>
              <p class="card-description">${description || ''}</p>
              <div class="card-media">
                  <img src="${poster || ''}" alt="Movie Poster">
              </div>
              <button class="buy-ticket-btn" data-movie-id="${id}">Buy Ticket</button>
          `;

          // Set the card content
          cardElement.innerHTML = cardContent;

          // Append the card to the current row
          currentRow.appendChild(cardElement);
      });

      // Add event listeners to the buy ticket buttons
      addBuyTicketListeners();
  }

  // Display error message
  function displayErrorMessage(message) {
      const cardContainer = document.querySelector('.card-container');
      cardContainer.innerHTML = `<p class="error-message">${message}</p>`;
  }

  // Initializing the submit event listener
  const form = document.querySelector('#search-form');
  form.addEventListener('submit', handleSearch);

  // Implementing a search function for searching available movies
  async function handleSearch(event) {
      event.preventDefault(); // Prevent the form from submitting and reloading the page
      const searchInput = document.querySelector('#search-input');
      const searchTerm = searchInput.value.trim(); // Get the search term from the input field

      if (searchTerm) {
          const searchUrl = `http://localhost:3000/films?title_like=${searchTerm}`;
          await fetchAndShowResults(searchUrl);
      } else {
          // If search term is empty, show all results
          await fetchAndShowResults(url);
      }
  }

  // Add event listeners to the buy ticket buttons
  function addBuyTicketListeners() {
      const buttons = document.querySelectorAll('.buy-ticket-btn');
      buttons.forEach(button => {
          button.addEventListener('click', handleBuyTicket);
      });
  }

  // Event handler for buying a ticket
  function handleBuyTicket(event) {
      const movieId = event.target.dataset.movieId;
      // Perform the necessary action to buy a ticket for the movie with the given movieId
      console.log(`Buying ticket for movie with ID: ${movieId}`);
  }

  // Initialize the page
  async function init() {
      await fetchAndShowResults(url);
  }

  init();
});
