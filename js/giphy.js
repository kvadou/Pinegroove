const giphyApiKey = `ZZMVzE78mVVCOYcbnGuHdsZrKPcFpH0A`;
const giphyApi = `https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}`;
let giphyBtn = document.getElementById("giphyButton")
let renderedGif = document.getElementById("rendered-gif")

giphyBtn.addEventListener("click", function () {
    // Hit the Giphy API to get a random GIF
    // TODO: Should we allow users to specify what GIF they want returned
    fetch(giphyApi)
        .then(response => response.json()).then(response => { 
            console.log(response) 
            renderGif(response)
        })
})

function renderGif(response) {
    clearGif()
    let gifElement = document.createElement("IMG")
    gifElement.setAttribute("src", `${response.data.image_url}`)
    console.log(gifElement)

    renderedGif.append(gifElement)

}

// Clears previously rendered GIF before appending a new one
function clearGif() {
    while (renderedGif.firstChild) {
        renderedGif.removeChild(renderedGif.firstChild);
    }
  }