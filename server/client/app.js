let terrTableName = ['Identifier', 'Name', 'Note'];
let tableNames = {
  id: 'Identifier',
  name: 'Name',
  note: 'Note',
};
const terrDisplay = document.querySelector('#globalMap');


let popupOnMap = document.querySelector('.popupOnMap');

fetch('../svgmaps/Россия.svg')
      .then(response => response.text())
      .then(svgData => {
        // Append the SVG data to the SVG element
        const svgContainer = document.getElementById('globalMap');
        svgContainer.innerHTML = svgData;
        let icons = document.getElementsByClassName('icon');
        
        console.log(icons.length);
        // Attach event listeners to svg map elements
        for (let i = 0; i < icons.length; i++) {
          icons[i].addEventListener('mouseover', showPopupOnMap);
          icons[i].addEventListener('mouseout', hidePopupOnMap);
          icons[i].addEventListener('click', showMapEvt);
        }
      })
      .catch(err => {
        console.error('Error fetching SVG file:', err);
      });

function fetchData() {
  fetch('/api/territories')
    .then(response => response.json())
    .then(data => {
      console.log(data)

      for (let i = 0; i < data.length; i++) {
        let link = document.createElement('a');
        link.href = `/territories?id=${data[i].ID}`; // Set the href based on the data from the database
        link.textContent = `- ${data[i].NAME}`;

        let elem = document.createElement('div');
        elem.appendChild(link);
        
        // Append element to popupOnMap div before the first child
        popupOnMap.appendChild(elem);
      }
    });
}


      


// Display popup window
function showPopupOnMap(evt) {
  let flag = true;
  popupOnMap.innerHTML = '';
  let head = document.createElement('h3');
  head.textContent = this.id;
  popupOnMap.id = this.id;
  popupOnMap.appendChild(head);
   

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
    if (!event.target.matches('.icon')) {
      // target element is clicked
      console.log(123);
      hidePopupOnMap(event);
    }
  });

function hidePopupOnMap(evt) {
  if (!popupOnMap.contains(evt.target)) {
    // Hide the popup
    popupOnMap.style.visibility = 'hidden';
    popupOnMap.innerHTML = '';
    console.log('Triggered');
  }
}

function showMap(sender) {
  
  console.log("Show " + sender.id);
  window.location.href = `/map?id=${sender.id}`
}

function showMapEvt(evt) {
  
  console.log("Show " + evt.target.id);
  window.location.href = `/map?id=${evt.target.id}`
}

function showInfo(sender) {
    console.log(sender.id);
   
   //localStorage.setItem("flag", true);
   //localStorage.setItem("id", sender.id);
   //window.location = "territories";

   /* fetch('http://localhost:8081/globalmap')
    .then(response => response.json()).then(data => {
        let table = document.querySelector('#table');
        const keys = Object.keys(data);
        keys.forEach(key => {
            const keys2 = Object.keys(data[key]);
            keys2.forEach(key2 => {
                if(key2 == "ID" || key2 == "NAME" || key2 == "NOTE")
                {
                    console.log(data[key][key2])    
                    table.insertAdjacentHTML('beforeend', data[key][key2]);
                }
            });
        });
    });
    fetch('http://localhost:8081/globalmap')
    .then(response => response.json()).then(data => {
        data.forEach(element => {
            const SVGMAP = element.SVGMAP;
            if(SVGMAP != null)
            {
                terrDisplay.insertAdjacentHTML('beforeend', SVGMAP);
            }
    });
});*/
}

/////////////////////////////////////////////
