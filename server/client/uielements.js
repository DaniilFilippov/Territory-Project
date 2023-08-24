function showPopupOnMap(evt) {
    const popupOnMap = document.getElementById('popupOnMap');
    popupOnMap.innerHTML = '';
    let head = document.createElement('h3');
    head.textContent = this.id;
    popupOnMap.id = this.id;
    popupOnMap.appendChild(head);
      
    fetchData(this.id);
    
    console.log(this.id);
  
    // Show popup
    if (window.getComputedStyle(popupOnMap, null).getPropertyValue('visibility') !== 'hidden') {
      // Calculate popup position
      const x = evt.clientX;
      const y = evt.clientY;
      popupOnMap.style.visibility = 'visible';
      popupOnMap.style.left = x + 20 + 'px';
      popupOnMap.style.top = window.scrollY + y - 60 + 'px';
    }
}

function hidePopupOnMap(evt) {
    const popupOnMap = document.getElementById('popupOnMap');
    if (!popupOnMap.contains(evt.target)) {
      // Hide the popup
      popupOnMap.style.visibility = 'hidden';
      popupOnMap.innerHTML = '';
      console.log('Triggered');
    }
}

export {showPopupOnMap, hidePopupOnMap} 

