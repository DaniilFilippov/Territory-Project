//const { shutdown } = require("oracledb");


let terrTableName = ['Идентификатор', 'Наименование', 'Примечание'];
let tableNames = {
    id: 'Идентификатор',
    name: 'Наименование',
    note: 'Примечание'
};
const terrDisplay = document.querySelector('#globalMap');


let icons = document.getElementsByClassName("icon")
let mypopup = document.getElementById("mypopup");




for(let i = 0; i < icons.length; i++) {

    icons[i].addEventListener("mouseover", showPopup);
    icons[i].addEventListener("mouseout", hidePopup);

}

function showPopup() {
  console.log(icons);
  let iconPos = icons[1].getBoundingClientRect();
  mypopup.style.left = (iconPos.right + 20) + "px";
  mypopup.style.top = (window.scrollY + iconPos.top - 60) + "px";
  mypopup.style.display = "block";
}

function hidePopup(evt) {
  mypopup.style.display = "none";
}

fetch('http://localhost:8081/globalmap')
    .then(response => response.json()).then(data => {
        data.forEach(element => {
            const SVGMAP = element.SVGMAP;
            if(SVGMAP != null)
            {
                terrDisplay.insertAdjacentHTML('beforeend', SVGMAP);
            }
        });
});

    function showInfo() {
        console.log("Считали нажатие");
        fetch('http://localhost:8081/globalmap')
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
}