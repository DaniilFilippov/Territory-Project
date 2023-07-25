let territory = document.getElementsByClassName("terr");
const terrDisplay = document.querySelector('#terr-content');
window.onload = function(){
    if(localStorage.getItem("flag")){
        document.getElementById("terries-tittle").innerHTML=localStorage.getItem("id");
        
        fetch('http://localhost:8081/globalmap')
        .then(response => response.json()).then(data => {
            let terr = document.querySelector('#terr-header');
            const keys = Object.keys(data);
            keys.forEach(key => {
                const keys2 = Object.keys(data[key]);
                keys2.forEach(key2 => {
                    if(key2 == "ID" || key2 == "NAME" || key2 == "NOTE")
                    {
                        console.log(data[key][key2])    
                        terr.insertAdjacentHTML('beforeend', data[key][key2]);
                        terr.insertAdjacentHTML('beforeend',' ');
                    }
                });
            });
        });
        
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
    }
    else{
        document.getElementsByClassName("page").item(0).innerHTML+="Ошибочка";
        
    }
}