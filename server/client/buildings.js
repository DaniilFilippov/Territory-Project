const domenDictionary = {
  "EnonActiv": "ClassifEconActiv",
  "VPOSPO": "ClassifReporting",
  "PurposeOfRoom": "PurposeOfRoom",
  "TypeOfRoom":"TypeOfRoom",
  "CODE":"CODE"
};
let dicSquareTotalsCR = {
  'учебно-вспомогательная': 0, 
  'подсобная': 0, 
  'учебная': 0,   
  'ремонт': 0,
  'не определено': 0        
};
let dicClassifReporting = {
  'учебно-вспомогательная': 0, 
  'подсобная': 0, 
  'учебная': 0,   
  'ремонт': 0,
  'не определено': 0        
};


let dicClassifEconActiv = {
  'не определено': 0, 
  'общего использования': 0, 
  'хозяйственного назначения': 0,   
  'для организации и ведения учебного процесса': 0,
  'административного подразделения': 0,
  'административная университета': 0,
  'администрация ИУЦТ': 0,
  'административное': 0,
  'сдана в аренду': 0
};

let dicSquareTotalsEA = {
  'не определено': 0, 
  'общего использования': 0, 
  'хозяйственного назначения': 0,   
  'для организации и ведения учебного процесса': 0,
  'административного подразделения': 0,
  'административная университета': 0,
  'администрация ИУЦТ': 0,
  'административное': 0,
  'сдана в аренду': 0
};

let dicPurposeOfRoom = {
  'нежилая': 0, 
  'жилая': 0, 
  'не определено': 0   
};
let dicSquareTotalsPR = {
  'нежилая': 0, 
  'жилая': 0, 
  'не определено': 0       
};

let dicTypeOfRoom = {
  'вспомогательное': 0, 
  'основное': 0, 
  'не определено': 0   
};
let dicSquareTotalsTR = {
  'вспомогательное': 0, 
  'основное': 0, 
  'не определено': 0       
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
let popupTimeout;

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

// Заполнение select'ов значениями
for (let key in domenDictionary) {
  if (domenDictionary.hasOwnProperty(key)) {
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
async function showDom(sender) { 
  amountOfDom =  document.querySelector(`.${sender.id}txt`);
  amountOfDom.innerHTML = '';
  let amount = 0;
  let type = sender.value;
  tab.style.display = 'none';
  svgColor = '';
  
  if (lastSvgEltm)
  {
    lastSvgEltm.classList.remove('highlighted-svg-element');
  }

  lastSvgEltm = '';
  
  tabContainer.style.border = '1px solid rgba(179, 171, 171, 0)';
  tabContainer.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.0)'; 
  tabContainer.style.background = 'rgba(255, 255, 255, 0.0)'; 
  //Если значение селекта дефолтное
  if (type === 'default') {
    SVGElements.forEach(async (svgElement) => {
      for(let i = 0; i < activeRoomsInfo.length; i++) {
        
        let id = '';
      if (activeRoomsInfo[i].NUMBOFPLACEMENT === null) {
          id = `r${activeRoomsInfo[i].NUMBOFROOM}`;
       }
      else {
          id = `${activeRoomsInfo[i].NUMBOFPLACEMENT}-r${activeRoomsInfo[i].NUMBOFROOM}`;
       }

        if(replEngLetWithRus(svgElement.id) == id){
          svgElement.style.fill = activeRoomsInfo[i].STR_VALUE;
        }
      }
      
    });
  }
  else {
    SVGElements.forEach(async (svgElement) => {
      let id = '';
      for(let i = 0; i < activeRoomsInfo.length; i++) {
        if (activeRoomsInfo[i].NUMBOFPLACEMENT === null) {
           id = `r${activeRoomsInfo[i].NUMBOFROOM}`;
        }
        else {
           id = `${activeRoomsInfo[i].NUMBOFPLACEMENT}-r${activeRoomsInfo[i].NUMBOFROOM}`;
        }
        id = replEngLetWithRus(id);
        if(replEngLetWithRus(svgElement.id) == id && activeRoomsInfo[i][sender.id] == type){
          
          switch (sender.id) {
            case 'ClassifReporting':
              svgElement.classList.add('animated-svg');

              svgElement.style.fill  =  '#00ff00';
              break;
            
            case 'ClassifEconActiv':
              svgElement.classList.add('animated-svg');
              animateSvg(svgElement);
              svgElement.style.fill  =  '#0000FF';
                break;
            case 'PurposeOfRoom':
              svgElement.classList.add('animated-svg');
              animateSvg(svgElement);
              svgElement.style.fill  =  '#FF6600';
                break;
            case 'TypeOfRoom':
              svgElement.classList.add('animated-svg');
              animateSvg(svgElement);
              svgElement.style.fill  =  '#fb00ff';
              break;
            case 'CODE':
              svgElement.classList.add('animated-svg');
              animateSvg(svgElement);
              svgElement.style.fill  =  activeRoomsInfo[i].STR_VALUE;

            
              break;
            default:
              svgElement.style.fill = '#000000';
              break;
          }
       
          break;
        } 
        else {
          
          svgElement.style.fill = '#808080';
        }
       
      }
    });

    let textNode;
    let sqrNode;
    let sqr, count;
    switch (sender.id) {
      case 'ClassifReporting':
        console.log(sender.value);
        textNode = document.createTextNode(`Кол-во комнат типа "${sender.value}": ${dicClassifReporting[sender.value]} `);
        sqrNode = document.createTextNode(`Площадь на этаже  ${parseFloat(dicSquareTotalsCR[sender.value].toFixed(2))} кв.м.`);
        break;
      case 'ClassifEconActiv':
        console.log(sender.value);
        textNode = document.createTextNode(`Кол-во комнат типа "${sender.value}": ${dicClassifEconActiv[sender.value]} `);
        sqrNode = document.createTextNode(`Площадь на этаже  ${parseFloat(dicSquareTotalsEA[sender.value].toFixed(2))} кв.м.`);     
        break;
      case 'PurposeOfRoom':
        console.log(sender.value);
        textNode = document.createTextNode(`Кол-во комнат типа "${sender.value}": ${dicPurposeOfRoom[sender.value]} `);
        sqrNode = document.createTextNode(`Площадь на этаже  ${parseFloat(dicSquareTotalsPR[sender.value].toFixed(2))} кв.м.`);
        console.log(dicPurposeOfRoom);
        console.log(dicSquareTotalsPR);
          break;
      case 'TypeOfRoom':
        console.log(sender.value);
        textNode = document.createTextNode(`Кол-во комнат типа "${sender.value}": ${dicTypeOfRoom[sender.value]} `);
        sqrNode = document.createTextNode(`Площадь на этаже  ${parseFloat(dicSquareTotalsTR[sender.value].toFixed(2))} кв.м.`);
        console.log(dicTypeOfRoom);
        console.log(dicSquareTotalsTR);
        break;
      case 'CODE':
        
        fetch(`/api/floors/res/${activeFloor}/${sender.value}`)
        .then(response => response.json())
        .then(data => {
          data.forEach(element => {
            
            sqr = element.sqrSum;
            count = element.roomsCount;
            textNode = document.createTextNode(`Кол-во комнат типа "${sender.value}": ${count} `);
            sqrNode = document.createTextNode(`Площадь на этаже  ${sqr} кв.м.`);

            amountOfDom.appendChild(textNode); 
            amountOfDom.appendChild(document.createElement('br')); 
            amountOfDom.appendChild(sqrNode); 

         });
         
        })
        .catch(error => console.error('Ошибка при получении данных:', error));
        console.log(sqr);
        break;
      default:
        
        break;
    }
    
    if(sender.id != 'CODE') {
      amountOfDom.appendChild(textNode); 
      amountOfDom.appendChild(document.createElement('br')); 
      amountOfDom.appendChild(sqrNode); 
    }

  }

  for (let key in domenDictionary) {
    if (domenDictionary.hasOwnProperty(key) && domenDictionary[key] != sender.id) {

      var select = document.getElementById(domenDictionary[key]);
      select.value = 'default';
    }
  }
}
function animateSvg(svgElement) {
  svgElement.classList.add('animated-svg'); // Добавляем класс для анимации
  
  svgElement.addEventListener('animationend', function() {
    svgElement.classList.remove('animated-svg'); // Удаляем класс после завершения анимации
  }, { once: true }); // Обработчик события будет вызван только один раз

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
  if (lastSvgEltm)
  {
    lastSvgEltm.classList.remove('highlighted-svg-element');
  }
  lastSvgEltm = null;

  svgColor = null;  
  tab.style.display = 'none';
  let selectElement = document.getElementById('CODE');
  let str = sender.value;
  let parts = str.split('/');
  
  
  activeFloor = parts[0].trim() + ' ' + parts[1].trim();

  selectElement.innerHTML = '';

  let el = document.createElement("option");
  el.textContent =  'Выберите подразделение';
  el.value = 'default';
  el.selected = true;
  selectElement.appendChild(el);



  document.getElementById('ClassifReporting').value = 'default';
  document.getElementById('ClassifEconActiv').value = 'default';
  document.getElementById('PurposeOfRoom').value = 'default';
  document.getElementById('CODE').value = 'default';

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

    SVGElements = document.querySelectorAll("path, polygon, polyline, rect");
    let id = '';
    SVGElements.forEach(async (svgElement) => {
      svgElement.classList.add('animated-fill');
      svgElement.classList.add("mark");
      svgElement.addEventListener('mouseover', showPopupOnMap);
      svgElement.addEventListener('mouseout', hidePopupOnMap);
      svgElement.addEventListener('click', function() {
            showBuildings(this);
            
        });
        
      for(let i = 0; i < activeRoomsInfo.length; i++) {
        
        if(activeRoomsInfo[i].NUMBOFPLACEMENT === null)
        {
           id = `r${activeRoomsInfo[i].NUMBOFROOM}`;
          
        }
        else {
           id = `${activeRoomsInfo[i].NUMBOFPLACEMENT}-r${activeRoomsInfo[i].NUMBOFROOM}`;
        }
        id = replEngLetWithRus(id);
        
        if(replEngLetWithRus(svgElement.id) == id){
          svgElement.style.fill = activeRoomsInfo[i].STR_VALUE;
          // Удаляем существующий атрибут, если он есть
          svgElement.style.opacity = '1';
          svgElement.style.fillOpacity = '0.5';
        }

       
        let valueToCheck = activeRoomsInfo[i].CODE; 
        let valueName = activeRoomsInfo[i].NAME; 
        
        if (containsOption(selectElement, valueToCheck) == false) {
          let el = document.createElement("option");
         
          if(valueToCheck == 'РУТ (МИИТ)')
          {
            el.textContent =  valueToCheck;
          } else {
            el.textContent =  valueName;
          }
          
          el.value = valueToCheck;
          selectElement.appendChild(el);

        } 
      }
    });
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
}

//Проверка на содержание элементов в списке
function containsOption(selectElement, valueToCheck) {
  return Array.from(selectElement.options).some(option => option.value === valueToCheck);
}

function fetchData(activeFloor, id) {
  // Отменяем предыдущий запрос, если он существует
  if (currentRequest) {
    currentRequest.abort();
  }

  let fixId = replEngLetWithRus(id);

  // Создаем новый контроллер AbortController для нового запроса
  currentRequest = new AbortController();
  const { signal } = currentRequest;

  fetch(`/api/floors/rooms/${activeFloor}/${fixId}`, { signal })
    .then(response => response.json())
    .then(data => {
      popupOnMap.innerHTML = ''; // Очищаем предыдущее содержимое
      data.forEach(function(item) {
        let head = document.createElement('h4');
        head.style.margin = '5px';
        let content = document.createElement('p');
        let room = item.namesOfRoom;
        let roomid = item.Идентификатор;
        head.textContent = `Номер комнты: ${roomid} (${fixId})`;
        content.textContent =`${room}`;
        content.style.textAlign = 'center';
        content.style.margin = '0px';
        popupOnMap.id = room;
        popupOnMap.appendChild(head);
        popupOnMap.appendChild(content);
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

function showPopupOnMap(evt) {
  clearTimeout(popupTimeout); // Очищаем предыдущий таймер, если он был установлен

  popupTimeout = setTimeout(() => {
    popupOnMap.innerHTML = '';
    fetchData(activeFloor, this.id);
  
    // Calculate popup position and show it
    const x = evt.clientX;
    const y = evt.clientY;
    popupOnMap.style.visibility = 'visible';
    popupOnMap.style.left = x + 20 + 'px';
    popupOnMap.style.top = window.scrollY + y - 60 + 'px';
    
    popupOnMap.style.background = convertRgbToRgba(this.style.fill, 0.4) 
  }, 100); // Задержка в 50 миллисекунд
}

function hidePopupOnMap(evt) {
  clearTimeout(popupTimeout); // Очищаем таймер, чтобы предотвратить появление popup

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
  
  function replEngLetWithRus(str) {
    const replacements = {
      'A': 'А', 'a': 'а', 'B': 'Б', 'b': 'б', 
      'V': 'В', 'v': 'в', 'C': 'С', 'c': 'с',
      'E': 'Е', 'e': 'е', 'Z': 'З', 'z': 'з', 
      'Ж': 'J', 'ж': 'j', 'D': 'Д', 'd': 'д', 
      'G': 'Г', 'g': 'г', 
      'M': 'М', 'm': 'м'
    };
  
    const parts = str.split('r');
    if (parts.length > 1) {
      parts[1] = parts[1].split('').map(char => replacements[char] || char).join('');
    }
    return parts.join('r');
  }

 // Выведение информации по комнате
  function roomsInfo(floor, room) {
    if (lastSvgEltm)
    {
      lastSvgEltm.style.fill = svgColor;
      lastSvgEltm.classList.remove('highlighted-svg-element');
    }

    let fixId = replEngLetWithRus(room);


    fetch(`/api/floors/rooms/${floor}/${fixId}`)
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
        lastSvgEltm.style.fill = 'red';
        lastSvgEltm.classList.add('highlighted-svg-element');
        
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
//Сброс значений словаря
function clearDict (dic)
{
  Object.keys(dic).forEach(key => {
    dic[key] = 0;
  })
}

async function fullInfo(floor, svgElement) {


  clearDict(dicClassifReporting);
  clearDict(dicSquareTotalsCR);
  clearDict(dicClassifEconActiv);
  clearDict(dicSquareTotalsEA);
  
  clearDict(dicPurposeOfRoom);
  clearDict(dicSquareTotalsPR);
  clearDict(dicTypeOfRoom);
  clearDict(dicSquareTotalsTR);
  
  try {
    const response = await fetch(`/api/floors/info/${floor}`);
    const data = await response.json();
   
    data.forEach(function(element) {
      if (element.STR_VALUE == null) {
        element.STR_VALUE = '#FEC04C';
       
      }
      
      if (dicClassifReporting.hasOwnProperty(element.ClassifReporting)) {
        dicClassifReporting[element.ClassifReporting]++;
        dicSquareTotalsCR[element.ClassifReporting] += element.SQUARE;
      } 
      
      if (dicClassifEconActiv.hasOwnProperty(element.ClassifEconActiv)) {
        dicClassifEconActiv[element.ClassifEconActiv]++;
        dicSquareTotalsEA[element.ClassifEconActiv] += element.SQUARE;
      } 

      if (dicPurposeOfRoom.hasOwnProperty(element.PurposeOfRoom)) {
        dicPurposeOfRoom[element.PurposeOfRoom]++;
        dicSquareTotalsPR[element.PurposeOfRoom] += element.SQUARE;
      } 

      if (dicTypeOfRoom.hasOwnProperty(element.TypeOfRoom)) {
        dicTypeOfRoom[element.TypeOfRoom]++;
        dicSquareTotalsTR[element.TypeOfRoom] += element.SQUARE;
      } 

    });

    
    return data; // Возвращаем данные
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
}

///////////////////////////////////////////////////////////////////////////////////////////
document.querySelectorAll('.drag').forEach(elem => {
  elem.addEventListener('dragstart', handleDragStart, false);
  elem.addEventListener('dragenter', handleDragEnter, false);
  elem.addEventListener('dragover', handleDragOver, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragend', handleDragEnd, false);
});

function handleDragStart(e) {
  e.target.style.opacity = '0.4';  // полупрозрачность
  e.target.classList.add('dragging');

  dragSrcEl = this; // Запоминаем элемент, который будет перемещаться

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
      e.preventDefault(); // Необходимо для разрешения перетаскивания
  }

  e.dataTransfer.dropEffect = 'move';  // вид курсора

  return false;
}

function handleDragEnter(e) {
  if (e.currentTarget === e.target) {
      e.currentTarget.classList.add('drag-over');
  }
}

function handleDragLeave(e) {
  let relatedTarget = e.relatedTarget;
  if (!e.currentTarget.contains(relatedTarget)) {
      e.currentTarget.classList.remove('drag-over');
  }
}

function handleDrop(e) {
  if (e.stopPropagation) {
      e.stopPropagation(); // Останавливает перенаправление в некоторых браузерах
  }

  if (dragSrcEl !== this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
  }

  e.currentTarget.classList.remove('drag-over');

  return false;
}

function handleDragEnd(e) {
  e.target.style.opacity = '1'; // Возвращаем непрозрачность
  e.target.classList.remove('dragging');

  document.querySelectorAll('.drag').forEach(elem => {
      elem.classList.remove('drag-over');
  });
}


function convertRgbToRgba(rgbString, alpha) {
  // Заменяем 'rgb' на 'rgba' и добавляем альфа-канал
  return rgbString.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
}