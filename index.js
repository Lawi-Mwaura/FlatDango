document.addEventListener('DOMContentLoaded',() =
})


//Fetch JSON data from url
let url= ` http://localhost:3000/films`
async function fetchData(url){
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Network response is faulty");
        }
        return await response.json();
    } catch (error){
        return null;
    }
}

// Fetch and show results based on url
async function fetchAndShowResults(url){
    const data = await fetchData(url)
    if(data && data.results) {
        showResults(data.results);
    }
}

//Posters for the movie 
function displayMoviePosters(movie){
    const {title, runtime, capacity, showtime, ticketsSold, Description, poster} = movie;

}




//Adding Event listeners
form.addEventListener('submit', handleSearch);
window.addEventListener('scroll', detected);
window.addEventListener('resize',detectEnd);

//Initialization of the page
async function init(){
    clearResults();
    const url= `http://localhost:3000/films`;
    isSearching = false;
    await fetchAndShowResults(url);

}