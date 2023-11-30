const domenDictionary = {
  "EnonActiv": "ClassifEconActiv",
  "VPOSPO": "ClassifReporting"
};


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const buildingId = urlParams.get('id');
let popupOnMap = document.querySelector('.popupOnMap');
const nameTitle = document.querySelector('.nameOfBuildings');
const svgMapDisplay = document.querySelector('.svgMap');
const buildingsFloors = document.getElementById('buildingFloors');
let activeFloor = '';
let tab = document.getElementById('tab-room');;
let lastSvgEltm;
let svgColor;
let activeRoomsInfo = '';
let SVGElements = '';
let amountOfVPOElem = '';


fetchFloors(buildingId);

fetch('/api/buildings/' + buildingId)
.then(response => response.json()).then(data => {
    data.forEach(element => {
        const SVGMAP = element.SVGMAP;
        document.title = element.NOTE;
        nameTitle.textContent = element.NOTE;

        if(SVGMAP != null)
        {
            svgMapDisplay.insertAdjacentHTML('beforeend', SVGMAP);
        }
        
    });
});

console.log(domenDictionary.EnonActiv);

// Заполнение select'ов значениями
for (let key in domenDictionary) {
  if (domenDictionary.hasOwnProperty(key)) {
      console.log(key + ": " + domenDictionary[key]);
      fetch('/api/floors/info/domen/' + domenDictionary[key])
      .then(response => response.json()).then(data => {
        data.forEach(element => {
          // Добавляем опции в select
          var select = document.getElementById(domenDictionary[key]);
          var el = document.createElement("option");
          el.textContent = element.NAME;
          el.value = element.NAME;
          select.appendChild(el);
      });
    });
  }
}


//Отображение комнат по ВПО СПО
function showInfoOfDom(sender) {
  amountOfVPOElem =  document.querySelector(sender.value + 'txt');
  amountOfVPOElem.innerHTML = '';
  let amountVpoSpo = 0;
  let typeVpoSpo = sender.value;
  tab.style.display = 'none';
  svgColor = '';
  lastSvgEltm = '';

  if (typeVpoSpo === 'default') {
    SVGElements.forEach(async (svgElement) => {
      for(let i = 0; i < activeRoomsInfo.length; i++) {
        
        let id = `${activeRoomsInfo[i].NUMBOFPLACEMENT}-r${activeRoomsInfo[i].NUMBOFROOM}`;
        if(svgElement.id === id){
          svgElement.style.fill = activeRoomsInfo[i].STR_VALUE;
          console.log(activeRoomsInfo[i].STR_VALUE);
        }
      }
    });
  }
  else {
    SVGElements.forEach(async (svgElement) => {
  
      for(let i = 0; i < activeRoomsInfo.length; i++) {
        
        let id = `${activeRoomsInfo[i].NUMBOFPLACEMENT}-r${activeRoomsInfo[i].NUMBOFROOM}`;
  
        if(svgElement.id == id && activeRoomsInfo[i].VPOSPO == typeVpoSpo){
          svgElement.style.fill = '#00FF00';
          amountVpoSpo +=1;
          break;
        } 
        else {
          svgElement.style.fill = '#808080';
        }
       
      }
    });
    var textNode = document.createTextNode(`Кол-во комнат типа "${typeVpoSpo}": ${amountVpoSpo}`);
    amountOfVPOElem.appendChild(textNode);  
  }

}


//Отображение комнат по ВПО СПО
function showVPOSPO(sender) {
  amountOfVPOElem =  document.querySelector('.amountOfVPO');
  amountOfVPOElem.innerHTML = '';
  let amountVpoSpo = 0;
  let typeVpoSpo = sender.value;
  tab.style.display = 'none';
  svgColor = '';
  lastSvgEltm = '';

  if (typeVpoSpo === 'default') {
    SVGElements.forEach(async (svgElement) => {
      for(let i = 0; i < activeRoomsInfo.length; i++) {
        
        let id = `${activeRoomsInfo[i].NUMBOFPLACEMENT}-r${activeRoomsInfo[i].NUMBOFROOM}`;
        if(svgElement.id === id){
          svgElement.style.fill = activeRoomsInfo[i].STR_VALUE;
          console.log(activeRoomsInfo[i].STR_VALUE);
        }
      }
    });
  }
  else {
    SVGElements.forEach(async (svgElement) => {
  
      for(let i = 0; i < activeRoomsInfo.length; i++) {
        
        let id = `${activeRoomsInfo[i].NUMBOFPLACEMENT}-r${activeRoomsInfo[i].NUMBOFROOM}`;
  
        if(svgElement.id == id && activeRoomsInfo[i].VPOSPO == typeVpoSpo){
          svgElement.style.fill = '#00FF00';
          amountVpoSpo +=1;
          break;
        } 
        else {
          svgElement.style.fill = '#808080';
        }
       
      }
    });
    var textNode = document.createTextNode(`Кол-во комнат типа "${typeVpoSpo}": ${amountVpoSpo}`);
    amountOfVPOElem.appendChild(textNode);  
  }

}

//Запись этажей в выпадающий список
function fetchFloors(id) {
  fetch('/api/floors/' + id)
  .then(response => {
      if (!response.ok) {
          throw new Error('Ошибка интернет соединения');
      }
      return response.json();
  })
  .then(data => {
    data.sort((a, b) => a.ID.localeCompare(b.ID));

    data.forEach(function(item) {
      let option = document.createElement('option');
      let parts = item.ID.split('/');
      let result = parts[1].trim();
      
      option.value = item.ID;
      option.textContent = result;
      buildingsFloors.appendChild(option);
    });
  })
  .catch(error => {
      console.error('Ошибка при получении данных:', error);
  });
};

//Функция смены этажа пользователем
async function changeFloor(sender) {   
  lastSvgEltm = null;
  svgColor = null;  
  tab.style.display = 'none';
  
  let str = sender.value;
  let parts = str.split('/');
  activeFloor = parts[0].trim() + ' ' + parts[1].trim();
  document.getElementById('ClassifReporting').value = 'default';
  try {
    const response = await fetch('/api/buildings/floors/' + activeFloor);
    if (!response.ok) {
        throw new Error('Ошибка интернет соединения');
    }
    const data = await response.json();

    svgMapDisplay.innerHTML = '';
    data.forEach(element => {
        svgMapDisplay.insertAdjacentHTML('beforeend', element.SVGMAP);
    });


    activeRoomsInfo = await fullInfo(activeFloor);
    SVGElements = document.querySelectorAll("path, polygon, polyline");

    SVGElements.forEach(async (svgElement) => {
      svgElement.classList.add("mark");
      svgElement.addEventListener('mouseover', showPopupOnMap);
      svgElement.addEventListener('mouseout', hidePopupOnMap);
      svgElement.addEventListener('click', function() {
            showBuildings(this);
        });
      for(let i = 0; i < activeRoomsInfo.length; i++) {
        
        let id = `${activeRoomsInfo[i].NUMBOFPLACEMENT}-r${activeRoomsInfo[i].NUMBOFROOM}`;

        if(svgElement.id == id){
          svgElement.style.fill = activeRoomsInfo[i].STR_VALUE;
        }
      }
    });
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
}

function fetchData (id) {
  fetch('/api/lands/buildings/' + id)
 .then(response => response.json())
 .then(data => {
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

// Отображение всплывающего окна
function showPopupOnMap(evt) {
    popupOnMap.innerHTML = '';
    let head = document.createElement('h3');
    head.textContent = this.id;
    popupOnMap.id = this.id;
    popupOnMap.appendChild(head);
      
    fetchData(this.id);
    
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
// Скрыть всплывающее окно
function hidePopupOnMap(evt) {
  if (!popupOnMap.contains(evt.target)) {
    // Hide the popup
    popupOnMap.style.visibility = 'hidden';
    popupOnMap.innerHTML = '';
    
  }
}


  document.addEventListener('click', function(event) {
    // Check if the clicked element is the target element or its descendant
    if (!event.target.matches('.mark')) {
      // target element is clicked
      hidePopupOnMap(event);
    }
  });


  function showBuildings(sender) {
      roomsInfo(activeFloor, sender.id);
  }
  
  
 
  function roomsInfo(floor, room) {
    if (lastSvgEltm)
    {
      lastSvgEltm.style.fill = svgColor;
    }
    fetch(`/api/floors/rooms/${floor}/${room}`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-container');
            container.innerHTML = ''; // Очищаем контейнер перед добавлением новых данных

            //Отображение таблицы с характеристиками комнаты
            if(tab.style.display == 'none') tab.style.display = "";

            
            // Проходимся по каждой записи и добавляем их в таблицу
            data.forEach(entry => {
                // Создаем строку для каждой характеристики
                Object.keys(entry).forEach(key => {
                    if (entry[key] == '2019_Федеральное государственное автономное образовательное учреждение высшего образования "Российский университет транспорта"')
                    {
                      entry[key] = 'РУТ (МИИТ)';
                    }
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${key}</td>
                        <td>${entry[key]}</td>
                    `;
                    container.appendChild(row);
                });
            });
        })
        .catch(error => console.error('Ошибка при получении данных:', error));

        lastSvgEltm = document.getElementById(room);
        svgColor = lastSvgEltm.style.fill; // записыаем цвет элемента. 
        lastSvgEltm.style.fill = 'red'; // задаем цвет выбранного элемента. 
} 

function insInfo1(floor, svgElement) {

  fetch(`/api/floors/rooms/${floor}/${svgElement.id}`)
      .then(response => response.json())
      .then(data => {

        data.forEach(element => {
            let instDept = element.CODE;
            
            fetch('/api/InsDep/' + instDept)
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                  svgElement.style.fill = element.STR_VALUE;
                });
            });
       });
      })
      .catch(error => console.error('Ошибка при получении данных:', error));
}


/*function insInfo(floor, svgElement) {

  fetch(`/api/rooms/${floor}`)
      .then(response => response.json())
      .then(data => {
       
          svgElement.style.fill = '#ff0000';
      })
      .catch(error => console.error('Ошибка при получении данных:', error));
}*/

async function insInfo(floor, svgElement) {
  try {
    const response = await fetch(`/api/rooms/${floor}`);
    const data = await response.json();
    return data; // Возвращаем данные
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
}
//
async function fullInfo(floor, svgElement) {
  try {
    const response = await fetch(`/api/floors/info/${floor}`);
    const data = await response.json();
    return data; // Возвращаем данные
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
}