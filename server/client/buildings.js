const domenDictionary = {
  "EnonActiv": "ClassifEconActiv",
  "VPOSPO": "ClassifReporting",
  "PurposeOfRoom": "PurposeOfRoom",
  "TypeOfRoom":"TypeOfRoom"
};


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const buildingId = urlParams.get('id');
let popupOnMap = document.querySelector('.popupOnMap');
const nameTitle = document.querySelector('.nameOfBuildings');
const svgMapDisplay = document.querySelector('.svgMap');
const buildingsFloors = document.getElementById('buildingFloors');
let tabContainer = document.querySelector('.tabContainer'); 
let activeFloor = '';
let tab = document.getElementById('tab-room');;
let lastSvgEltm;
let svgColor;
let activeRoomsInfo = '';
let SVGElements = '';
let amountOfVPOElem = '';
let amountOfDom = '';
let lastDom = '';
let amountOfEcAcElem= '';
let currentRequest = null;
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


//Отображение комнат по характеристикам(домен)
function showDom(sender) {
  amountOfDom =  document.querySelector(`.${sender.id}txt`);
  amountOfDom.innerHTML = '';
  let amount = 0;
  let type = sender.value;
  tab.style.display = 'none';
  svgColor = '';
  lastSvgEltm = '';


  tabContainer.style.border = '1px solid rgba(179, 171, 171, 0)';
  tabContainer.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.0)'; 
  tabContainer.style.background = 'rgba(255, 255, 255, 0.0)'; 

  if (type === 'default') {
    SVGElements.forEach(async (svgElement) => {
      for(let i = 0; i < activeRoomsInfo.length; i++) {
        
        let id = `${activeRoomsInfo[i].NUMBOFPLACEMENT}-r${activeRoomsInfo[i].NUMBOFROOM}`;
        if(svgElement.id === id){
          svgElement.style.fill = activeRoomsInfo[i].STR_VALUE;
        }
      }
    });
  }
  else {
    SVGElements.forEach(async (svgElement) => {
  
      for(let i = 0; i < activeRoomsInfo.length; i++) {
        
        let id = `${activeRoomsInfo[i].NUMBOFPLACEMENT}-r${activeRoomsInfo[i].NUMBOFROOM}`;
  
        if(svgElement.id == id && activeRoomsInfo[i][sender.id] == type){
          
          switch (sender.id) {
            case 'ClassifReporting':
              svgElement.classList.add('animated-svg');
              animateSvg(svgElement, '#00ff00');
              break;
            
            case 'ClassifEconActiv':
              svgElement.classList.add('animated-svg');
              animateSvg(svgElement, '#0000FF');
                break;
            case 'PurposeOfRoom':
              svgElement.classList.add('animated-svg');
              animateSvg(svgElement, '#FF6600');
                break;
            case 'TypeOfRoom':
              svgElement.classList.add('animated-svg');
              animateSvg(svgElement, '#fb00ff');
              break;
            default:
              svgElement.style.fill = '#000000';
              break;
          }
          amount +=1;
          break;
        } 
        else {
          
          svgElement.style.fill = '#808080';
        }
       
      }
    });
    var textNode = document.createTextNode(`Кол-во комнат типа "${type}": ${amount}`);
    amountOfDom.appendChild(textNode);  
  }

  for (let key in domenDictionary) {
    if (domenDictionary.hasOwnProperty(key) && domenDictionary[key] != sender.id) {

      var select = document.getElementById(domenDictionary[key]);
      select.value = 'default';
    }
}

}
function animateSvg(svgElement, color) {
  svgElement.classList.add('animated-svg'); // Добавляем класс для анимации
  
  svgElement.addEventListener('animationend', function() {
    svgElement.classList.remove('animated-svg'); // Удаляем класс после завершения анимации
  }, { once: true }); // Обработчик события будет вызван только один раз

  svgElement.style.fill = color;
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
  document.getElementById('ClassifEconActiv').value = 'default';
  document.getElementById('PurposeOfRoom').value = 'default';

  tabContainer.style.border = '1px solid rgba(179, 171, 171, 0)';
  tabContainer.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0)'; 
  tabContainer.style.background = 'rgba(255, 255, 255, 0)';

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
      svgElement.classList.add('animated-fill');
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

function fetchData(activeFloor, id) {
  // Отменяем предыдущий запрос, если он существует
  if (currentRequest) {
    currentRequest.abort();
  }

  // Создаем новый контроллер AbortController для нового запроса
  currentRequest = new AbortController();
  const { signal } = currentRequest;

  fetch(`/api/floors/rooms/${activeFloor}/${id}`, { signal })
    .then(response => response.json())
    .then(data => {
      popupOnMap.innerHTML = ''; // Очищаем предыдущее содержимое
      data.forEach(function(item) {
        let head = document.createElement('h3');
        let room = item.namesOfRoom;
        head.textContent = room;
        console.log(room);
        popupOnMap.id = room;
        popupOnMap.appendChild(head);
      });
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error('Ошибка при получении данных:', error);
      }
    });
}


// Отображение всплывающего окна
function showPopupOnMap(evt) {
  popupOnMap.innerHTML = '';
  fetchData(activeFloor, this.id);
  
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
  
  
 // Выведение информации по комнате
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

            tabContainer.style.border = '1px solid rgba(179, 171, 171, 0.553)';
            tabContainer.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)'; 
            tabContainer.style.background = 'rgba(255, 255, 255, 0.50)';        

              
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
                    console.log(key);
                    const row = document.createElement('tr');
                    
                 
                    switch (key) 
                    {
                        case 'namesOfRoom':
                          row.innerHTML = `
                          <td>Наименование комнаты</td>
                          <td>${entry[key]}</td>
                        `;
                        break;
                    default: 
                      if (key != 'CODE')
                      {
                    
                        row.innerHTML = `
                            <td>${key}</td>
                            <td>${entry[key]}</td>
                        `;
                      }  
                    }
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

///////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', (event) => {
  const containers = document.querySelectorAll('.drag');

  containers.forEach(container => {
    container.addEventListener('dragstart', handleDragStart, false);
    container.addEventListener('dragover', handleDragOver, false);
    container.addEventListener('drop', handleDrop, false);
    container.addEventListener('dragend', handleDragEnd, false);
  });
});

let dragSrcEl = null;

function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
  this.style.backgroundColor = 'rgba(227, 230, 230, 0.8)';
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Необходимо для разрешения перетаскивания
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); // Останавливает распространение события
  }

  if (dragSrcEl !== this) {
    // Обмен содержимым между перетаскиваемым и целевым элементами
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }

  return false;
}

function handleDragEnd(e) {
  // Обновление стилей или выполнение других действий после завершения перетаскивания
  this.style.backgroundColor = ''; // Возвращаем исходный цвет фона
}