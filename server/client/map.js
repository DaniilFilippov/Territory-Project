const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mapId = urlParams.get('id');

let popupOnMap = document.querySelector('.popupOnMap');
const nameTitle = document.querySelector('.nameOfMap');
document.title = mapId;
nameTitle.textContent = mapId;

let SVGElements;


let words = mapId.split(','); // Разбиваем строку на массив

let firstWord =  words[0].trim(); 
let secondWord = words[1].trim(); 

function containsMapId(text) {

  if(text != null) {
    const lowerCaseText = text.toLowerCase();
    return lowerCaseText.includes(firstWord.toLowerCase()) || lowerCaseText.includes(secondWord.toLowerCase());
  }
  return false;
}

function createAndAddElement(name, svgmap) {
  // Создаем элементы
  const elementItem = document.createElement('div');
  elementItem.setAttribute('id', name);
  elementItem.className = 'element-item container';
  elementItem.addEventListener('click', showLandMapEvt);
  const header = document.createElement('h4');
  header.textContent = name;

  const mapContainer = document.createElement('div');
  mapContainer.className = 'map-container';
  mapContainer.insertAdjacentHTML('beforeend', svgmap);

  // Собираем структуру элементов
  elementItem.appendChild(header);
  elementItem.appendChild(mapContainer);

  // Добавляем элемент в массив, а не непосредственно в контейнер
  allElements.push(elementItem);
}

fetch('../svgmaps/' + mapId + '.svg')
      .then(response => response.text())
      .then(svgData => {
        // Append the SVG data to the SVG element
        const svgContainer = document.getElementById('svgMapCity');
        svgContainer.innerHTML = svgData;
        let marks = document.getElementsByClassName('mark');

        SVGElements = document.querySelectorAll("path, polygon, polyline, rect");

        SVGElements = document.querySelectorAll("path, polygon, polyline, rect");

        SVGElements.forEach(async (svgElement) => {
          svgElement.classList.add('animated-map-fill-map');
          svgElement.classList.add("mark");
          svgElement.addEventListener('mouseover', showPopupOnMap);
          svgElement.addEventListener('mouseout', hidePopupOnMap);
          svgElement.addEventListener('click', showLandMapEvt);
          svgElement.style.opacity = '1';
          svgElement.style.fill = '#0000ff';
        });

    })
      .catch(err => {
        console.error('Error fetching SVG file:', err);

    });

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


    fetch('/api/territories')
    .then(response => response.json()).then(data => {
        const ul = document.createElement('ul');
        data.forEach(element => {
            const name = element.NAME;
            if (containsMapId(element.NOTE)) {
              
              const li = document.createElement('li');
              li.textContent = `${name}`;
              li.setAttribute('id', name);
              ul.appendChild(li);     
    
              li.addEventListener('mouseover', showTerrOnMap);
              li.addEventListener('mouseout', hideTerrOnMap);
              li.addEventListener('click', showLandMapEvt);
            }
        });
    
        const container = document.getElementById('mapContainer'); 
        container.appendChild(ul);
     
        const SVGPATH = document.querySelectorAll("path");
    });
// Display popup window
function showPopupOnMap(evt) {
    popupOnMap.innerHTML = '';
    let head = document.createElement('h3');
    head.textContent = this.id;
    popupOnMap.id = this.id;
    popupOnMap.appendChild(head);
      
    //fetchData(this.id);
    
    console.log(this.id);
  
    // Show popup
    if (window.getComputedStyle(popupOnMap, null).getPropertyValue('visibility')) {
      // Calculate popup position
      const x = evt.clientX;
      const y = evt.clientY;
      popupOnMap.style.visibility = 'visible';
      popupOnMap.style.left = x + 20 + 'px';
      popupOnMap.style.top = window.scrollY + y - 60 + 'px';
    }
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

    window.location.href = `/territories?id=${sender.id}`

  }

  function showTerrOnMap(evt) {


    SVGElements.forEach(async (svgElement) => {
      if (svgElement.id == this.id) {
        svgElement.style.fill = '#ff0000';
        svgElement.classList.add('highlighted-svg-elementMap');
      } 
    });
  }


  function hideTerrOnMap(evt) {
    SVGElements.forEach(async (svgElement) => {
      if (svgElement.id == this.id) {
        svgElement.style.fill = '#0000ff';
        svgElement.classList.remove('highlighted-svg-elementMap');       
      } 
    });
  }

  function showLandMapEvt(evt) {
    
    console.log("Show " + evt.target.id);
    window.location.href = `/territories?id=${evt.target.id.trim()}`
  }


  function hidePopupOnMap(evt) {
    if (!popupOnMap.contains(evt.target)) {
      // Hide the popup
      popupOnMap.style.visibility = 'hidden';
      popupOnMap.innerHTML = '';
      console.log('Triggered');
    }
  }