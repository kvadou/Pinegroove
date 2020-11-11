
let celebSearch = document.querySelector("#celebSearch");
let celebNameInput = document.querySelector("#celebName");

const giphyKey = "&api_key=ZZMVzE78mVVCOYcbnGuHdsZrKPcFpH0A";
const gifURL = "http://api.giphy.com/v1/gifs/search?";

const omdbKey = "apikey=76490f50";
const omdbDataURL = "http://www.omdbapi.com/?";






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







function giphySearch(keyword) {

return  $.ajax({
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

  $('#celebPic').attr("src", "http://image.tmdb.org/t/p/w500" + celebObj.results[0].profile_path);
  $("#celeb_name").text(celebObj.results[0].name);




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
$("#giphyButton").on("click", async function(){
  console.log("you clicked the button! great");
  
  let lastCeleb = JSON.parse(localStorage.getItem("celeb"));
  console.log(lastCeleb);

  let response= await giphySearch(lastCeleb.celebSearch);

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







