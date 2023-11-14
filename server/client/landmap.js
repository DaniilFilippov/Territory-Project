

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const landId = urlParams.get('id');
let popupOnMap = document.querySelector('.popupOnMap');
const nameTitle = document.querySelector('.nameOfLand');
const svgMapDisplay = document.querySelector('.svgMap');

document.title = "Земельный участок: " + landId;
nameTitle.textContent = "Земельный участок - " + landId;

// Add event listener to adjust SVG map size on browser zoom
window.addEventListener('resize', function() {
  var svgMap = document.getElementById('svgMap1');
  var svgMapContainer = document.getElementById('svgMap');
  var containerWidth = svgMapContainer.clientWidth/2;
  var containerHeight = svgMapContainer.clientHeight/2;
  svgMap.setAttribute('width', containerWidth);
  svgMap.setAttribute('height', containerHeight);
});

fetch('/api/lands/' + landId)
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

  function showBuildings(sender) {
  
    console.log("Show " + sender.id);
    window.location.href = `/buildings?id=${sender.id}`
  }
  
  function showLandMapEvt(evt) {
    
    console.log("Show " + evt.target.id);
    window.location.href = `/buildings?id=${evt.target.id}`
  }


  function hidePopupOnMap(evt) {
    if (!popupOnMap.contains(evt.target)) {
      // Hide the popup
      popupOnMap.style.visibility = 'hidden';
      popupOnMap.innerHTML = '';
      console.log('Triggered');
    }
  }