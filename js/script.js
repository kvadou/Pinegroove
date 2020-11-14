// create fan page button
let celebSearch = document.querySelector("#celebSearch");
// celeb input field
let celebNameInput = document.querySelector("#celebName");

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
  }
});


// trigger button click on enter 
document.getElementById("celebNameInput");
if (celebNameInput) {
  celebNameInput.addEventListener("keyup", function (event) {
    event.preventDefault();

    if (event.keyCode === 13) {
      document.getElementById("celebSearch").click();
    }
  });
};


function theMovieDBSearch(keyword) {
  $.ajax({
    url:
      "https://api.themoviedb.org/3/search/person?api_key=15078abc7623d4a65b34fe0d5335ffad&query=" +
      keyword,
    method: "GET",
    error: function () {

      // another error msg popup saying there was an error with the api call
      let errorMsg = $("#error-notification");
      errorMsg.css("display", "block");

    },

  }).then(function (response) {

    // create celeb object from submission 
    if (response.Error || response.results.length === 0) {
      let errorMsg = $("#error-notification");
      errorMsg.css("display", "block");
    } else {
      let celeb = {
        celebSearch: celebNameInput.value.trim(),
      };

      // write celeb name to localstorage
      localStorage.setItem("celeb", JSON.stringify(celeb));

      // write response to localstorage
      localStorage.setItem("response", JSON.stringify(response));

      // forward to titlepage.html page
      window.open("./title_page/titlepage.html", "_self");

    }
  });
};


function populateIndex() {

  // grab data from localStorage
  let celebObj = JSON.parse(localStorage.getItem("response"));

  initColorPicker();

  // populate celeb's headshot & name 
  $("#celebPic").attr("src", tmdbImgUrl + celebObj.results[0].profile_path);
  $("#celeb_name").text(celebObj.results[0].name);

  // send known_for array in repsonse object to new function
  knownForDisplay(celebObj.results[0].known_for);

  initFavMovieList();

  // generate our first random animated gif of celeb
  document.querySelector("#giphyButton").click();

};


function initFavMovieList() {

  let favMoviesList = JSON.parse(localStorage.getItem("favMovies"));

  document.querySelector("#text1").value = favMoviesList.input1;
  document.querySelector("#text2").value = favMoviesList.input2;
  document.querySelector("#text3").value = favMoviesList.input3;
  document.querySelector("#text4").value = favMoviesList.input4;
  document.querySelector("#text5").value = favMoviesList.input5;

};


function initColorPicker() {

  let colorPicker = document.querySelector("#color-picker");
  colorPicker.addEventListener("input", watchColorPicker, false);
  colorPicker.addEventListener("change", watchColorPicker, false);

  function watchColorPicker(event) {

    let theBody = document.querySelector(".hero.is-info");
    theBody.style.backgroundColor = event.target.value;

  };

};


// display "known-for" movie information 
function knownForDisplay(movie_list) {
  movie_list.forEach(function (movie, index) {
    let tempIndex = index + 1;
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


// save list of favorite movies 
if (document.querySelector("#save-favs-list")) {
  document
    .querySelector("#save-favs-list")
    .addEventListener("click", function () {
      let savedFavs = {
        input1: document.querySelector("#text1").value.trim(),
        input2: document.querySelector("#text2").value.trim(),
        input3: document.querySelector("#text3").value.trim(),
        input4: document.querySelector("#text4").value.trim(),
        input5: document.querySelector("#text5").value.trim(),
      };

      localStorage.setItem("favMovies", JSON.stringify(savedFavs));
    });
};


// closes notification window when user clicks "x"
$(".delete").on("click", function () {

  let errorMsg = $("#error-notification");
  errorMsg.css("display", "none");

});
