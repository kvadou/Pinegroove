// create fan page button //
let celebSearch = document.querySelector("#celebSearch");
// celeb input field //
let celebNameInput = document.querySelector("#celebName");

const giphyKey = "&api_key=ZZMVzE78mVVCOYcbnGuHdsZrKPcFpH0A";
const gifURL = "https://api.giphy.com/v1/gifs/search?";

const omdbKey = "apikey=76490f50";
const omdbDataURL = "https://www.omdbapi.com/?";

const tmdbImgUrl = "https://image.tmdb.org/t/p/w500";




$(document).ready(function () {

  if ($("#celebSearch").length) {

    // event listener for the celeb name button 
    celebSearch.addEventListener("click", function (event) {
      event.preventDefault();

      // searches the movie database
      theMovieDBSearch(celebNameInput.value);

    });

  };


});

// trigger button click on enter //
document.getElementById("celebNameInput")
  
  celebNameInput.addEventListener("keyup", function(event) {

    event.preventDefault();

    if (event.keyCode === 13) {

      document.getElementById("celebSearch").click();
    
    }
  
  });




function giphySearch(keyword) {

  return $.ajax({
    url: gifURL + "q=" + keyword + giphyKey,
    method: "GET"

  });


};



function theMovieDBSearch(keyword) {

  $.ajax({
    url: "https://api.themoviedb.org/3/search/person?api_key=15078abc7623d4a65b34fe0d5335ffad&query=" + keyword,
    method: "GET"

  }).then(function (response) {
    // create celeb object from submission //
    let celeb = {
      celebSearch: celebNameInput.value.trim(),
    };

    // write celeb name to localstorage
    localStorage.setItem("celeb", JSON.stringify(celeb));

    // write response to localstorage
    localStorage.setItem("response", JSON.stringify(response));

    // get most recent celeb submission //
    /* console.log(response); */


    // forward to titlepage.html page
    window.open("./title_page/titlepage.html");



  });

}

function populateIndex() {

  let lastCeleb = JSON.parse(localStorage.getItem("celeb"));
  let celebObj = JSON.parse(localStorage.getItem("response"));

  console.log(celebObj);

  $('#celebPic').attr("src", tmdbImgUrl + celebObj.results[0].profile_path);
  $("#celeb_name").text(celebObj.results[0].name);

  // send known_for array in repsonse object to new function
  console.log("dookicky", celebObj.results[0].known_for);
  knownForDisplay(celebObj.results[0].known_for);




};

function knownForDisplay(movie_list) {

  movie_list.forEach(function (movie, index) {
    let tempIndex = index + 1;
    console.log("index: " + index, "movie: ", movie);
    let knownForPic = "#known-for-pic-" + tempIndex;
    $(knownForPic).attr("src", tmdbImgUrl + movie.poster_path);
    let knownForName = "#known-for-name-" + tempIndex;
    $(knownForName).text(movie.original_title);
    let releaseDate = "#release-date-" + tempIndex;
    $(releaseDate).text("Release date: " + movie.release_date);
    let rating = "#rating-" + tempIndex;
    $(rating).text(movie.vote_average + " / 10 user rating");
    let plot = "#overview-" + tempIndex;
    $(plot).text(movie.overview);



  });


};





function omdbDataSearch(keyword) {

  $.ajax({
    url: omdbDataURL + "&" + omdbKey + "&t=" + keyword,
    method: "GET",

    error: function () {

      // another error msg popup saying there was an error with the api call
      let errorMsg = $("#error-notification");

      errorMsg.css("display", "block");



    }


  }).then(function (response) {

    if (response.Error) {

      let errorMsg = $("#error-notification");
      errorMsg.css("display", "block");

    }

    console.log(response);
  });

};


// giphyButton on-click event & data defining
$("#giphyButton").on("click", async function () {
  console.log("you clicked the button! great");

  let lastCeleb = JSON.parse(localStorage.getItem("celeb"));
  console.log(lastCeleb);

  let response = await giphySearch(lastCeleb.celebSearch);

  console.log(response.data);

  // Want to add customizable # of gifs the user wants returned

  $("body").append(`<img src="${response.data[0].images.original.url}">`)
});




// closes notification window when user clicks "x"
$(".delete").on("click", function () {
  console.log((this));
  let errorMsg = $("#error-notification");
  errorMsg.css("display", "none");

});


// script for the slider below

let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.innerHTML = this.value;
}





