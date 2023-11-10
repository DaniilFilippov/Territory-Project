function fetchData (id, path) {
  fetch(path + id)
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


export function showPopupOnMap(evt, path) {
  let popupOnMap = document.querySelector('.popupOnMap');
  popupOnMap.innerHTML = '';
  let head = document.createElement('h3');
  head.textContent = this.id;
  popupOnMap.id = this.id;
  popupOnMap.appendChild(head);
  
  fetchData(this.id, path);
  
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
  function hidePopupOnMap(evt) {
    if (!popupOnMap.contains(evt.target)) {
      // Hide the popup
      popupOnMap.style.visibility = 'hidden';
      popupOnMap.innerHTML = '';
      console.log('Triggered');
    }
  }