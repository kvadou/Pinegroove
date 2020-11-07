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
