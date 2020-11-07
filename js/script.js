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









