const apiKey = "&api_key=ZZMVzE78mVVCOYcbnGuHdsZrKPcFpH0A";
const gifURL = "http://api.giphy.com/v1/gifs/search?";
const stickerURL = "http://api.giphy.com/v1/stickers/search";


$.ajax({
    url: gifURL + "q=cheeseburgers" + apiKey,
    method: "GET"


}).then(function(response){

    console.log(response);





});
