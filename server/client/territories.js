const gridContainer = document.querySelector('.element-grid');
document.title = "Территории";


fetch('/api/territories')
.then(response => response.json()).then(data => {
    data.forEach(element => {
        const name = element.NAME;
        const SVGMAP = element.SVGMAP;

        createAndAddElement(name, SVGMAP);
    });
    const SVGPATH = document.querySelectorAll("path");
});




function createAndAddElement(name, svgmap) {

    // Создаем элементы
    const elementItem = document.createElement('div');
    elementItem.className = 'element-item container';

    const header = document.createElement('h4');
    header.textContent = name;

    const mapContainer = document.createElement('div');
    mapContainer.className = 'map-container';
    mapContainer.insertAdjacentHTML('beforeend', svgmap);

    // Собираем структуру элементов
    elementItem.appendChild(header);
    elementItem.appendChild(mapContainer);

    // Добавляем элементы в gridContainer
    gridContainer.appendChild(elementItem);
}
