
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

      let text = document.createElement('p');
      text.textContent = `- ${item.CODE}`;
      let elem = document.createElement('div');
      elem.appendChild(text);
      popupOnMap.appendChild(elem);
    });
  })
  .catch(error => {
      console.error('Ошибка при получении данных:', error);
  });
};



//Функция смены этажа пользователем
function changeFloor(sender) {   
  lastSvgEltm = null;
  svgColor = null;  
  tab.style.display = 'none';
  
  let str = sender.value;
  let parts = str.split('/');
  activeFloor = parts[0].trim() + ' ' + parts[1].trim();

  fetch('/api/buildings/floors/' + activeFloor)
  .then(response => {
      if (!response.ok) {
          throw new Error('Ошибка интернет соединения');
      }
      return response.json();
  })
  .then(data => {
      svgMapDisplay.innerHTML = '';
      data.forEach(element => {
          svgMapDisplay.insertAdjacentHTML('beforeend', element.SVGMAP);
      });

      const SVGElements = document.querySelectorAll("path, polygon");
      
      insInfo(activeFloor, element);  

      SVGElements.forEach(element => {
          element.classList.add("mark");
          element.addEventListener('mouseover', showPopupOnMap);
          element.addEventListener('mouseout', hidePopupOnMap);
          element.addEventListener('click', function() {
              showBuildings(this);
            
          });
          
      });
  })
  .catch(error => {
      console.error('Ошибка при получении данных:', error);
  });
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

    svgElement.style.fill = '#ff0000';

    return data; // Возвращаем данные
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
}