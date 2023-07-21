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
let mypopup1 = document.getElementById("mypopup1");

let popupOnMap = document.getElementById("popupOnMap");

// Вешаем события на элементы карты svg
for(let i = 0; i < icons.length; i++) {

   //icons[0].addEventListener("mouseover", showPopup);
   //icons[0].addEventListener("mouseout", hidePopup);
   //icons[1].addEventListener("mouseover", showPopup1);
   // icons[1].addEventListener("mouseout", hidePopup1);

   icons[i].addEventListener("mouseover", showPopupOnMap);
   icons[i].addEventListener("mouseout", hidePopupOnMap);
}

//Отображение всплывающего окна
function showPopupOnMap(evt)
{
    let head = document.createElement("h3");
    head.textContent = this.id;
    popupOnMap.appendChild(head);
   
    for (let i = 0; i < 5; i++) {
        let elem = document.createElement('div');
        elem.textContent = `Тестовая запись ${i}`

        // добавляем элемент в блок div перед первым узлом
        popupOnMap.appendChild(elem);
    }
  
    console.log(this.id);
    
    if (window.getComputedStyle(popupOnMap, null).getPropertyValue('visibility'))
    {
        let x = evt.clientX;
        let y = evt.clientY;
        popupOnMap.style.left = (x + 20) + "px";
        popupOnMap.style.top = (window.scrollY + y - 60) + "px";
        popupOnMap.style.display = "block";
        popupOnMap.style.visibility = 'visible';
    }
}

function hidePopupOnMap(evt) {

    popupOnMap.style.visibility = 'hidden';
    popupOnMap.innerHTML = '';
}


function showPopup(evt) {

    if (window.getComputedStyle(mypopup, null).getPropertyValue('visibility'))
    {
        let x = evt.clientX;
        let y = evt.clientY;
        mypopup.style.left = (x + 20) + "px";
        mypopup.style.top = (window.scrollY + y - 60) + "px";
        mypopup.style.display = "block";
        mypopup.style.visibility = 'visible';
    }
        
}

function hidePopup(evt) {

    mypopup.style.visibility = 'hidden';
}

function showPopup1(evt) {

    if (window.getComputedStyle(mypopup1, null).getPropertyValue('visibility'))
    {
        let x = evt.clientX;
        let y = evt.clientY;
        mypopup1.style.left = (x + 20) + "px";
        mypopup1.style.top = (window.scrollY + y - 60) + "px";
        mypopup1.style.display = "block";
        mypopup1.style.visibility = 'visible';
    }
        
}

function hidePopup1(evt) {

    mypopup1.style.visibility = 'hidden';
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