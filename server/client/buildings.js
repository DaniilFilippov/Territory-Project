
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const buildingId = urlParams.get('id');
let popupOnMap = document.querySelector('.popupOnMap');
const nameTitle = document.querySelector('.nameOfBuildings');
const svgMapDisplay = document.querySelector('.svgMap');
const buildingsFloors = document.getElementById('buildingFloors');
let data = ['Option 1', 'Option 2', 'Option 3'];

document.title = "Здание: " + buildingId;
nameTitle.textContent = "Здание - " + buildingId;


// 3. Loop through the data and create options
data.forEach(function(item) {
    let option = document.createElement('option');
    option.value = item.toLowerCase().replace(/\s+/g, '-');
    option.textContent = item;
    buildingsFloors.appendChild(option);
  });

fetch('/api/buildings/' + buildingId)
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
        SVGPATH[i].addEventListener('dblclick', showLandMapEvt);
      }
});


function fetchData (id) {
  fetch('/api/lands/buildings/' + id)
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
    popupOnMap.innerHTML = '';
    let head = document.createElement('h3');
    head.textContent = this.id;
    popupOnMap.id = this.id;
    popupOnMap.appendChild(head);
      
    fetchData(this.id);
    
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
    window.location.href = `/map?id=${sender.id}`
  }
  
  function showLandMapEvt(evt) {
    
    console.log("Show " + evt.target.id);
    window.location.href = `/map?id=${evt.target.id}`
  }

 
