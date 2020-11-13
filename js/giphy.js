let giphyBtn = document.getElementById("giphyButton");
let renderedGif = document.getElementById("rendered-gif");
let celebObj = JSON.parse(localStorage.getItem("response"));
let searchedCeleb = celebObj.results[0].name;

giphyBtn.addEventListener("click", function () {
    let giphyApi = `https://api.giphy.com/v1/gifs/random?tag=${searchedCeleb}&api_key=ZZMVzE78mVVCOYcbnGuHdsZrKPcFpH0A`;
    fetch(giphyApi)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            renderGif(response);
        });
});

function renderGif(response) {
    clearGif();
    let gifElement = document.createElement("IMG");
    gifElement.setAttribute("src", `${response.data.image_url}`);
    renderedGif.append(gifElement);
}

// Clears previously rendered GIF before appending a new one
function clearGif() {
    while (renderedGif.firstChild) {
        renderedGif.removeChild(renderedGif.firstChild);
    }
}