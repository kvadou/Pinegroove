// variables for the celebrity name fields new comment blah blah blah //
let celebSearch = document.querySelector("#celebSearch");
let celebNameButton = document.querySelector("#celebName");


function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

// event listener for the celeb name button //

celebNameButton.addEventListener("click", function(event) {
  event.preventDefault();
  
// create celeb object from submission //
  let celeb = {
    celebSearch: celebSearchInput.value.trim(),
  };

  console.log(celeb);
  
 // validate the field to make sure its not empty //
 if (celeb.celebSearch === "") {
  displayMessage("error", "Field cannot be blank");
} else {
  displayMessage("success", "Bingo!");

  // set new celeb submission //
  localStorage.setItem("celeb", JSON.stringify(celeb));
    
  // get most recent celeb submission //
  let lastCeleb = JSON.parse(localStorage.getItem("celeb"));
  
  }
});
const giphyKey = "&api_key=ZZMVzE78mVVCOYcbnGuHdsZrKPcFpH0A";
const gifURL = "http://api.giphy.com/v1/gifs/search?";


// omdb example url: http://www.omdbapi.com/?apikey=[yourkey]&

const omdbKey = "apikey=76490f50";
const omdbDataURL = "http://www.omdbapi.com/?";
const omdbImgURL = "http://img.omdbapi.com/?";

function giphySearch(keyword) {

    $.ajax({
        url: gifURL + "q=" + keyword + giphyKey,
        method: "GET"

    }).then(function (response) {

        console.log(response);

    });

}


function omdbDataSearch(keyword) {

    $.ajax({
        url: omdbDataURL + "&" + omdbKey + "&t=" + keyword,
        method: "GET"


    }).then(function (response) {



        console.log(response);
    });

};









