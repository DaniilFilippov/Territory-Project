const gridContainer = document.querySelector('.element-grid');
const allElements = []; // Массив для хранения всех элементов
const itemsPerPage = 12;
let currentPage = 0;



fetch('/api/lands')
.then(response => response.json()).then(data => {
    data.forEach(element => {
        const name = element.ID;
        const SVGMAP = element.SVGMAP;

        createAndAddElement(name, SVGMAP);
    });
    createPagination();
    showPage(0);
    document.querySelector('.pagination button').classList.add('selected');
   
    
    const SVGPATH = document.querySelectorAll("path");
});




function createAndAddElement(name, svgmap) {
    // Создаем элементы
    const elementItem = document.createElement('div');
    elementItem.setAttribute('id', name);
    elementItem.className = 'element-item container';
    elementItem.addEventListener('click', showLandMapEvt);
    const header = document.createElement('h4');
    header.textContent = name;

    const mapContainer = document.createElement('div');
    mapContainer.className = 'map-container';

    if (svgmap == null) {
        let imagePath = 'src/no-svg.jpg'
        mapContainer.insertAdjacentHTML('beforeend', `<img src="${imagePath}" alt="No SVG available">`);
    }
    else {
        mapContainer.insertAdjacentHTML('beforeend', svgmap);
    }

    
    // Собираем структуру элементов
    elementItem.appendChild(header);
    elementItem.appendChild(mapContainer);

    // Добавляем элемент в массив, а не непосредственно в контейнер
    allElements.push(elementItem);
}

function showPage(page) {
    // Очищаем контейнер перед отображением новой страницы
    gridContainer.innerHTML = '';

    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToShow = allElements.slice(start, end);

    itemsToShow.forEach(item => gridContainer.appendChild(item));
}

function createPagination() {
    const pageCount = Math.ceil(allElements.length / itemsPerPage);
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';

    for (let i = 0; i < pageCount; i++) {
        const btn = document.createElement('button');
        btn.innerText = i + 1;
        btn.addEventListener('click', function() {
            showPage(i);
            document.querySelectorAll('.pagination button').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            window.scrollTo(0, 0);
        });
        paginationContainer.appendChild(btn);
    }

    gridContainer.after(paginationContainer);
}


  function showLandMapEvt(evt) {
    window.location.href = `/lands?id=${evt.currentTarget .id}`

  }

