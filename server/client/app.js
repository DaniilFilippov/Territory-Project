let styleDir = __dirname + 'style.css';
let appDir = __dirname + 'app.js';
const terrDisplay = document.querySelector('#main');



fetch('http://localhost:8081/globalmap')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            const SVGMAP = element.SVGMAP;
            terrDisplay.insertAdjacentHTML('beforeend', SVGMAP);
        });
    })
    