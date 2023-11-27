
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const buildingId = urlParams.get('id');
let popupOnMap = document.querySelector('.popupOnMap');
const nameTitle = document.querySelector('.nameOfBuildings');
const svgMapDisplay = document.querySelector('.svgMap');
const buildingsFloors = document.getElementById('buildingFloors');
let activeFloor = '';
let tab = '';

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
    const SVGPATH = document.querySelectorAll("path");
    
    for (let i = 0; i < SVGPATH.length; i++) {
        SVGPATH[i].classList.add("mark");
        SVGPATH[i].addEventListener('mouseover', showPopupOnMap);
        SVGPATH[i].addEventListener('dblclick', showLandMapEvt);
    
      }
});

//Запись этажей в выпадающий список
function fetchFloors(id) {
    fetch('/api/floors/' + id)
    .then(response => response.json())
    .then(data => {
      data.sort((a, b) => a.ID.localeCompare(b.ID));
   
      data.forEach(function(item) {
        let option = document.createElement('option');
        let str = item.ID;
        console.log(str);
        let parts = str.split('/');
        let result = parts[1].trim();
        
        option.value = item.ID;
        option.textContent = result;
        buildingsFloors.appendChild(option);
      });


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
};



//Функция смены этажа пользователем
function changeFloor(sender)
{     
        let str = sender.value;
        
        let parts = str.split('/');
        activeFloor = parts[0].trim() + ' ' + parts[1].trim();

    fetch('/api/buildings/floors/' + activeFloor)
    .then(response => response.json()).then(data => {
        
        data.forEach(element => {
           const SVGMAP = element.SVGMAP;
         
               svgMapDisplay.innerHTML = '';
               svgMapDisplay.insertAdjacentHTML('beforeend', SVGMAP);
           
           
        });
        const SVGPATH = document.querySelectorAll("path");
        const SVGPOLY = document.querySelectorAll("polygon");

        for (let i = 0; i < SVGPATH.length; i++) {
           SVGPATH[i].classList.add("mark");
           SVGPATH[i].addEventListener('mouseover', showPopupOnMap);
           SVGPATH[i].addEventListener('dblclick', showBuildings);
        }
        for (let i = 0; i < SVGPOLY.length; i++) {
          SVGPOLY[i].classList.add("mark");
          SVGPOLY[i].addEventListener('mouseover', showPopupOnMap);
          SVGPOLY[i].addEventListener('dblclick', showBuildings);
       }
    });
}

function fetchData (id) {
  fetch('/api/lands/buildings/' + id)
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

// Отображение всплывающего окна
function showPopupOnMap(evt) {
    popupOnMap.innerHTML = '';
    let head = document.createElement('h3');
    head.textContent = this.id;
    popupOnMap.id = this.id;
    popupOnMap.appendChild(head);
      
    fetchData(this.id);
    
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

  document.addEventListener('click', function(event) {
    // Check if the clicked element is the target element or its descendant
    if (!event.target.matches('.mark')) {
      // target element is clicked
      console.log(123);
      hidePopupOnMap(event);
    }
  });


  function showBuildings(sender) {
  
    console.log("Show " + sender.id);
    roomsInfo(activeFloor, sender.id);
    
  }
  
  // Скрыть всплывающее окно
  function hidePopupOnMap(evt) {
    if (!popupOnMap.contains(evt.target)) {
      // Hide the popup
      popupOnMap.style.visibility = 'hidden';
      popupOnMap.innerHTML = '';
      console.log('Triggered');
    }
  }
 
  function roomsInfo(floor, room) {
   
    fetch(`/api/floors/rooms/${floor}/${room}`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-container');
            container.innerHTML = ''; // Очищаем контейнер перед добавлением новых данных

            //Отображение таблицы с характеристиками комнаты
            tab = document.getElementById('tab-room');
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

    console.log(`/api/floors/rooms/${floor}/${room}`);
} 
