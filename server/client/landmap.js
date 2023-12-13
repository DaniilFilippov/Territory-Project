

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const landId = urlParams.get('id');
let popupOnMap = document.querySelector('.popupOnMap');
const nameTitle = document.querySelector('.nameOfLand');
const svgMapDisplay = document.querySelector('.svgMapLand');
document.title = "Земельный участок: " + landId;
nameTitle.textContent = "Земельный участок - " + landId;
let popupTimeout;
let SVGPATH;

// Add event listener to adjust SVG map size on browser zoom
window.addEventListener('resize', function() {
  var svgMap = document.getElementById('svgMap1');
  var svgMapContainer = document.getElementById('svgMapLand');
  var containerWidth = svgMapContainer.clientWidth/2;
  var containerHeight = svgMapContainer.clientHeight/2;
  svgMap.setAttribute('width', containerWidth);
  svgMap.setAttribute('height', containerHeight);
});

fetch('/api/lands/' + landId)
.then(response => response.json()).then(data => {
    data.forEach(element => {
        const SVGMAP = element.SVGMAP;
        if(SVGMAP != null)
        {
            svgMapDisplay.insertAdjacentHTML('beforeend', SVGMAP);
        }
    });
    SVGPATH = document.querySelectorAll("path"); 
    for (let i = 0; i < SVGPATH.length; i++) {
        SVGPATH[i].classList.add("mark");
        SVGPATH[i].addEventListener('mouseover', showPopupOnMap);
        SVGPATH[i].addEventListener('mouseout', hidePopupOnMap);
        SVGPATH[i].addEventListener('click', showLandMapEvt);
        SVGPATH[i].style.opacity ='1';
        SVGPATH[i].classList.add('animated-map-fill');
      }
});

fetch('/api/lands/buildings/' + landId)
.then(response => response.json()).then(data => {
    const ul = document.createElement('ul');
    data.forEach(element => {
        const name = element.NOTE; 
          const li = document.createElement('li');
          li.textContent = `${name}`;
          li.setAttribute('id',  element.ID);
          ul.appendChild(li);     
          li.addEventListener('mouseover', showBuildOnMap);
          li.addEventListener('mouseout', hideBuildOnMap);
          li.addEventListener('click', showLandMapEvt);
    });
    const container = document.getElementById('mapContainer'); 
    container.appendChild(ul);
});

function fetchData (id) {
  fetch('/api/territories/lands/' + id)
 .then(response => response.json())
 .then(data => {
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
    fetch('/api/buildings/' + this.id)
    .then(response => response.json()).then(data => {
        data.forEach(element => {
            head.textContent = element.NOTE;     
        });        
    });
    popupOnMap.id = this.id;
    popupOnMap.appendChild(head);
    fetchData(this.id);
    // Show popup
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
      hidePopupOnMap(event);
    }
  });

  function showBuildings(sender) {
    window.location.href = `/buildings?id=${sender.id}`
  }
  
  function showLandMapEvt(evt) {
    window.location.href = `/buildings?id=${evt.target.id}`
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
  function showBuildOnMap(evt) {
    SVGPATH.forEach(svgElement => {
        if (svgElement.id.trim() === this.id.trim()) {
            svgElement.classList.add('highlighted-svg-element');
        }  
    });
}

function hideBuildOnMap(evt) {
    SVGPATH.forEach(svgElement => {
        if (svgElement.id.trim() === this.id.trim()) {
            svgElement.classList.remove('highlighted-svg-element');
        }
    });
}
