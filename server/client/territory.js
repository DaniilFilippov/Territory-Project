const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const territoryId = urlParams.get('id');
const svgMapDisplay = document.querySelector('.svgMap');

document.title = "Территория: " + territoryId;

fetch('/api/territories/' + territoryId)
.then(response => response.json()).then(data => {
    let pageElem = document.querySelector('.territory');
    const keys = Object.keys(data);
    
   /* keys.forEach(key => {
        const keys2 = Object.keys(data[key]);
        keys2.forEach(key2 => {
            if(key2 == "ID" || key2 == "NAME" || key2 == "NOTE")
            {
                console.log(data[key][key2])    
                pageElem.insertAdjacentHTML('beforeend', data[key][key2]);
            }
        });
    });*/
});


fetch('/api/territories/' + territoryId)
.then(response => response.json()).then(data => {
    data.forEach(element => {
        const SVGMAP = element.SVGMAP;
        if(SVGMAP != null)
        {
            svgMapDisplay.insertAdjacentHTML('beforeend', SVGMAP);
        }
    });
});

console.log(territoryId);
