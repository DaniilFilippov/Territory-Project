const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mapId = urlParams.get('id');


let popupOnMap = document.querySelector('.popupOnMap');

document.title = mapId;

fetch('../svgmaps/' + mapId + '.svg')
      .then(response => response.text())
      .then(svgData => {
        // Append the SVG data to the SVG element
        const svgContainer = document.getElementById('svgMap');
        svgContainer.innerHTML = svgData;
        let marks = document.getElementsByClassName('mark');
        // Attach event listeners to svg map elements
        for (let i = 0; i < marks.length; i++) {
            marks[i].addEventListener('mouseover', showPopupOnMap);
            marks[i].addEventListener('dblclick', showPopupOnMap);
}
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
            let link = document.createElement('a');
            link.href = `/territories?id=${data[i].ID}`; // Set the href based on the data from the database
            link.textContent = `- ${data[i].CODE}`;
    
            let elem = document.createElement('div');
            elem.appendChild(link);
            
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

  function hidePopupOnMap(evt) {
    if (!popupOnMap.contains(evt.target)) {
      // Hide the popup
      popupOnMap.style.visibility = 'hidden';
      popupOnMap.innerHTML = '';
      console.log('Triggered');
    }
  }