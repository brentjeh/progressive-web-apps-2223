const paintings = document.querySelectorAll(".painting-container");

const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const closeButton = document.getElementById("close");

const endpoint = 'https://www.rijksmuseum.nl/api/en/collection';
const apiKey = 'RCZaMbZZ';

function openPopup(id){
    const paintingId = id
    fetch(`${endpoint}/${paintingId}/?key=${apiKey}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            popupImg.src = data.artObject.webImage.url;
            popupImg.alt = data.artObject.title;
            popupTitle.textContent = data.artObject.title;
            popupDescription.textContent = `Artist: ${data.artObject.principalOrFirstMaker}`;
        
            popup.style.display = "block";
        })
}

for (let index = 0; index < paintings.length; index++) {
    paintings[index].addEventListener("click", () => {
        const paintingId = paintings[index].id;
        openPopup(paintingId);
    })
}

function closePopup() {
    popup.style.display = "none";
}
  
closeButton.addEventListener("click", () => {
    closePopup();
});
