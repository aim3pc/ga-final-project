//get mocies
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c43fa4b6aamshd9361be1e5bc9a7p1e6720jsn0efb0b95dd1f',
		'X-RapidAPI-Host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
	}
};

const movieSearchURL = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=';
const latestURL = 'https://api.themoviedb.org/3/movie/popular?api_key=0d33a1df54c8b2be9634e106a4020e28&language=en-US';

let movieQuery = document.getElementById('movieTitle');

const movieButton = document.getElementById('search');
let movieSearchImage = document.getElementById('moveImg');
let movieSearchTitle = document.getElementById('heading');
let movieDescription = document.getElementById('movDesc');
const movieContainer = document.getElementById('results');
const lastestContainer = document.getElementById('latest');
const lastestRow = document.getElementById('row');
const reviewContainer = document.getElementById('review');
const reviewButton = document.getElementById('sendReview');
let reviewScore = document.getElementById('reviewScore');

async function getLatest(){
    const response = await fetch(latestURL);
    const data = await response.json();
    console.log(data);
    for(i=0; i < data.results.length; i++){
        latestFilmCard(data.results[i].original_title, data.results[i].overview, "C:/Users/aaqil/OneDrive/Desktop/No_Image_Available.jpg");

    }
}

getLatest();

async function searchMovie(name){
    try{
    lastestContainer.classList.add('hidden');
    const response = await fetch(movieSearchURL + name, options);
    const data = await response.json();
    console.log(data);
    displayMovie(data.results[0].picture, data.results[0].name, data.results[0].external_ids.imdb.url);
    reviewButton.onclick = function() {
        addReview(data.results[0].name, reviewScore.value, data.results[0].external_ids.imdb.url);
        reviewScore.value = '';
        reviewContainer.classList.remove('hidden');
        movieContainer.classList.add('hidden');
    } }catch(error){
        alert(error)
    }
}

movieButton.onclick = function (){
    searchMovie(movieQuery.value);
    movieQuery.value = " ";
}

 function displayMovie(img, title, description){
    lastestContainer.classList.add('hidden');
    movieContainer.classList.remove('hidden');
    movieSearchImage.src = img;
    movieSearchTitle.innerText = title;
    movieDescription.href = description;
 }

 function addReview(title, review, url){
    const singleReview = document.createElement('div');
    singleReview.classList.add('card');
    singleReview.style.width = '18rem';
    singleReview.style.marginLeft ='10px';
    singleReview.style.marginTop = '10px';

    const singleRevBody = document.createElement('div');
    singleRevBody.classList.add('card-body');

    const movieTitle = document.createElement('h5');
    movieTitle.classList.add('card-title');
    movieTitle.innerText = title;

    const reviewAdd = document.createElement('p');
    reviewAdd.classList.add('card-text');
    reviewAdd.innerText = ('Review: ' + review);

    const imdbLink = document.createElement('a');
    imdbLink.href = url;
    imdbLink.innerText = 'Click to view IMDB';
    imdbLink.target = "_blank";
    imdbLink.classList.add('btn', 'btn-primary');
    
    

    reviewContainer.appendChild(singleReview);
    singleReview.appendChild(singleRevBody);
    singleRevBody.appendChild(movieTitle);
    singleRevBody.appendChild(reviewAdd)
    singleRevBody.appendChild(imdbLink);
 }

 function latestFilmCard(title, synopsis, img){
    const singleReview = document.createElement('div');
    singleReview.classList.add('card');
    singleReview.style.width = '18rem';
    singleReview.style.marginLeft ='10px';
    singleReview.style.marginTop = '10px';

    const singleRevBody = document.createElement('div');
    singleRevBody.classList.add('card-body');

    const movieTitle = document.createElement('h5');
    movieTitle.classList.add('card-title');
    movieTitle.innerText = title;


    const reviewAdd = document.createElement('p');
    reviewAdd.classList.add('card-text');
    reviewAdd.innerText = synopsis;

    const movieImage = document.createElement('img');
    movieImage.src = img;
    movieImage.classList.add('card-img-top');
    

    lastestContainer.appendChild(singleReview);
    singleRevBody.appendChild(movieImage);
    singleReview.appendChild(singleRevBody);
    singleRevBody.appendChild(movieTitle);
    singleRevBody.appendChild(reviewAdd)
    
 }
