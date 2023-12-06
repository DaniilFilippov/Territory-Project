const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const territoryId = urlParams.get('id');
const svgMapDisplay = document.querySelector('.svgMapTer');
const nameTitle = document.querySelector('.NameOfTerritory');
let popupOnMap = document.querySelector('.popupOnMap');

document.title = "Территория: " + territoryId;
nameTitle.textContent = "Территория - " + territoryId;
let popupTimeout;

fetch('/api/territories/' + territoryId)
.then(response => response.json()).then(data => {
    data.forEach(element => {
        const SVGMAP = element.SVGMAP;
        console.log('eleSVGMAPment.');
        if(SVGMAP != null)
        {
            svgMapDisplay.insertAdjacentHTML('beforeend', SVGMAP);
        }
    });
    const SVGPATH = document.querySelectorAll("path");
    for (let i = 0; i < SVGPATH.length; i++) {
        SVGPATH[i].classList.add("mark");
        SVGPATH[i].addEventListener('mouseover', showPopupOnMap);
        SVGPATH[i].addEventListener('mouseout', hidePopupOnMap);
        SVGPATH[i].addEventListener('click', showLandMapEvt);
      }
});

console.log(territoryId);

function fetchData (id) {
   fetch('/api/territories/lands/' + id)
  .then(response => response.json())
  .then(data => {
    console.log(data)

    for (let i = 0; i < data.length; i++) {
        //let link = document.createElement('a');
        //link.href = `/territories?id=${data[i].ID}`; // Set the href based on the data from the database
        //link.textContent = `- ${data[i].CODE}`;
        let text = document.createElement('p');
        text.textContent = `- ${data[i].CODE}`;
        let elem = document.createElement('div');
        elem.appendChild(text);
        
        // Append element to popupOnMap div before the first child
        popupOnMap.appendChild(elem);
      }
  });
}

// Display popup window
function showPopupOnMap(evt) {
    clearTimeout(popupTimeout); // Очищаем предыдущий таймер, если он был установлен
    popupTimeout = setTimeout(() => {
      popupOnMap.innerHTML = '';
      let head = document.createElement('h3');
      head.textContent = this.id;
      popupOnMap.id = this.id;
      popupOnMap.appendChild(head);
        
      //fetchData(this.id);
   
        // Calculate popup position
        const x = evt.clientX;
        const y = evt.clientY;
        popupOnMap.style.visibility = 'visible';
        popupOnMap.style.left = x + 20 + 'px';
        popupOnMap.style.top = window.scrollY + y - 60 + 'px';
      
      popupOnMap.style.background = convertRgbToRgba(this.style.fill, 0.4) 
    }, 100); // Задержка в 50 миллисекунд
  }


  document.addEventListener('click', function(event) {
    // Check if the clicked element is the target element or its descendant
    if (!event.target.matches('.mark')) {
      // target element is clicked
      console.log(123);
      hidePopupOnMap(event);
    }
  });

  function showLandMap(sender) {
  
    console.log("Show " + sender.id);

    window.location.href = `/lands?id=${sender.id}`
  }
  
  function showLandMapEvt(evt) {
    
    console.log("Show " + evt.target.id);
    window.location.href = `/lands?id=${evt.target.id}`
  }


  function hidePopupOnMap(evt) {
    clearTimeout(popupTimeout); // Очищаем таймер, чтобы предотвратить появление popup
    if (!popupOnMap.contains(evt.target)) {
       // Hide the popup
       popupOnMap.style.visibility = 'hidden';
       popupOnMap.innerHTML = '';
    }
  }

  function convertRgbToRgba(rgbString, alpha) {
    // Заменяем 'rgb' на 'rgba' и добавляем альфа-канал
    return rgbString.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
  }