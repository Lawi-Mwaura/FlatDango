document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://localhost:3000/films';
  
    async function fetchData(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response is faulty');
        }
        return await response.json();
      } catch (error) {
        return null;
      }
    }
  
    async function fetchAndShowResults(url) {
      const data = await fetchData(url);
      if (data && data.length) {
        showResults(data);
      }
    }
  
    function showResults(movies) {
      const cardContainer = document.querySelector('.card-container');
      cardContainer.innerHTML = '';
  
      const rowSize = 4; // Number of cards per row
      let currentRow;
  
      movies.forEach((movie, index) => {
        const { id, title, runtime, capacity, showtime, ticketsSold, Description, poster } = movie;
  
        if (index % rowSize === 0) {
          currentRow = document.createElement('div');
          currentRow.classList.add('row');
          cardContainer.appendChild(currentRow);
        }
  
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
  
        const cardContent = `
          <h2 class="card-title">${title || ''}</h2>
          <p class="card-runtime">Runtime: ${runtime || ''} minutes</p>
          <p class="card-capacity">Capacity: ${capacity || ''}</p>
          <p class="card-showtime">Showtime: ${showtime || ''}</p>
          <p class="card-tickets-sold">Tickets Sold: ${ticketsSold || 0}</p>
          <p class="card-description">${Description || ''}</p>
          <div class="card-media">
            <img src="${poster || ''}" alt="Movie Poster" width="100%">
          </div>
          <button class="buy-ticket-btn" data-movie-id="${id}">Buy Ticket</button>
        `;
  
        cardElement.innerHTML = cardContent;
        currentRow.appendChild(cardElement);
      });
  
      addBuyTicketListeners();
    }
  
    function addBuyTicketListeners() {
      const buyTicketButtons = document.querySelectorAll('.buy-ticket-btn');
      buyTicketButtons.forEach(button => {
        button.addEventListener('click', handleBuyTicket);
      });
    }
  
    function handleBuyTicket(event) {
      const movieId = event.target.dataset.movieId;
      // Perform the necessary action to buy a ticket for the movie with the given movieId
      console.log(`Buying ticket for movie with ID: ${movieId}`);
    }
  
    async function init() {
      await fetchAndShowResults(url);
    }
  
    init();
  });
  