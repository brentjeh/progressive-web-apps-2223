const paintings=document.querySelectorAll(".painting-container"),popup=document.getElementById("popup"),popupImg=document.getElementById("popup-img"),popupTitle=document.getElementById("popup-title"),popupDescription=document.getElementById("popup-description"),closeButton=document.getElementById("close"),endpoint="https://www.rijksmuseum.nl/api/en/collection",apiKey="RCZaMbZZ";function openPopup(t){fetch(`${endpoint}/${t}/?key=${apiKey}`).then(t=>t.json()).then(t=>{popupImg.src=t.artObject.webImage.url,popupImg.alt=t.artObject.title,popupTitle.textContent=t.artObject.title,popupDescription.textContent=`Artist: ${t.artObject.principalOrFirstMaker}`,popup.style.display="block"})}for(let t=0;t<paintings.length;t++)paintings[t].addEventListener("click",()=>{openPopup(paintings[t].id)});function closePopup(){popup.style.display="none"}closeButton.addEventListener("click",()=>{closePopup()});