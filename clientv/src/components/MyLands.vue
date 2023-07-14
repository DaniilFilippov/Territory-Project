<template >
  <div>
    <h1>Земельные участки</h1>
    <input v-model="name" type="name" name="name" placeholder="name"/>
    <br>
    <br>
    
    <button @click="mounted()" >Показать земельные участки</button>
    <button v-on:click=" addVon()" >Показать земельные участки</button>
    
    <br>

    <div v-for="terr in info" :key ="terr.rn">
        <ul>
          <li>Идентификатор: {{terr.ID}} </li>
          <li>Наименование: {{terr.NAME}} </li>
          <li>Примечание:  {{terr.NOTE}} </li>      
        </ul> 
        {{  strToSvg(terr.SVGMAP)}}
       </div>

       <button  id = "id"> Нажми</button>
       <div id="svgmap">
        {{  strToSvg(this.info[0].SVGMAP)}}
        </div>

<table id='f2r1' class='table' style='display:none'><caption>лестница</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>лестница</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>16,5кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r2' class='table' style='display:none'><caption>коридор</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>коридор</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>3,9кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r3' class='table' style='display:none'><caption>уборная</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>уборная</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>1,1кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r4' class='table' style='display:none'><caption>уборная</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>уборная</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>1,1кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r5' class='table' style='display:none'><caption>умывальная</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>умывальная</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>4,1кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r6' class='table' style='display:none'><caption>отдел кадров</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>отдел кадров</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>13,4кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r7' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>24,7кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r8' class='table' style='display:none'><caption>подсобное помещение</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>подсобное помещение</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>4,6кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>хозяйственного назначения</td></tr></table>
<table id='f2r9' class='table' style='display:none'><caption>коридор</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>коридор</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>5,1кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r10' class='table' style='display:none'><caption>уборная</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>уборная</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>1кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r11' class='table' style='display:none'><caption>уборная</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>уборная</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>1кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r12' class='table' style='display:none'><caption>умывальная</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>умывальная</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>4,2кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r13' class='table' style='display:none'><caption>лестница</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>лестница</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>16,5кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r14' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>22,2кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r15' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>14,3кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r16' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>13,6кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r17' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>23,1кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r18' class='table' style='display:none'><caption>зал ожидания</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>зал ожидания</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>20,2кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r19' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>22,7кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r20' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>13,4кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r21' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>13,4кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r22' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>12,9кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r23' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>14,6кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r24' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>14,5кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r25' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>13,6кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r26' class='table' style='display:none'><caption>коридор</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>коридор</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>96,4кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r27' class='table' style='display:none'><caption>зал ожидания</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>зал ожидания</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>35,4кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r28' class='table' style='display:none'><caption>холл</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>холл</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>10,3кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r29' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>3,9кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r30' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>8,9кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r31' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>6,9кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r32' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>11,1кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r33' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>10,1кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r34' class='table' style='display:none'><caption>тамбур</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>тамбур</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>4,1кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r35' class='table' style='display:none'><caption>касса</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>касса</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>7,6кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r36' class='table' style='display:none'><caption>тамбур</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>тамбур</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>3,3кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r37' class='table' style='display:none'><caption>бухгалтерия</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>бухгалтерия</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>13,5кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r38' class='table' style='display:none'><caption>моечная</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>моечная</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>10,6кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>хозяйственного назначения</td></tr></table>
<table id='f2r39' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>7,4кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r40' class='table' style='display:none'><caption>лаборатория</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>лаборатория</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>14,2кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учебная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r41' class='table' style='display:none'><caption>коридор</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>коридор</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>10,2кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>вспомогательное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>общего использования</td></tr></table>
<table id='f2r42' class='table' style='display:none'><caption>лаборатория</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>лаборатория</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>7,3кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учебная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r43' class='table' style='display:none'><caption>мастерская</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>мастерская</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>4,3кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>подсобная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td>хозяйственного назначения</td></tr></table>
<table id='f2r44' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>7,4кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r45' class='table' style='display:none'><caption>лаборатория</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>лаборатория</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>12,3кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учебная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r46' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>11,6кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r47' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>15,3кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>
<table id='f2r48' class='table' style='display:none'><caption>кабинет</caption><tr><th width='30%'>Характеристика</th><th>Значение</th></tr><tr><td>Название</td><td>кабинет</td></tr><tr><td>Высота</td><td>2,33м.</td></tr><tr><td>Площадь</td><td>16,3кв.м.</td></tr><tr><td>Назначение</td><td>нежилая</td></tr><tr><td>Вид</td><td>основное</td></tr><tr><td>Классификация в  соответствии с отчетностью по ВПО, СПО</td><td>учено-вспомогательная</td></tr><tr><td>Классификация в соответствии с хозяйственной  деятельностью</td><td></td></tr></table>

</div>

</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import axios from 'axios'
export default {

  name: 'MyLands',
  data () {
    return {
      name: '',
      info: null,
      json: '',
      svg: null,
      arrTer: null,
      tab: null
    }
  },
  methods: {
    findLands() {
      AuthenticationService.lands().then(response => (this.info = response.data.lands)); 
      this.info = JSON.parse(this.info);
      console.log(this.info);
    },
    mounted() {
    axios
      .post('http://localhost:8081/territories')
      .then(response => (this.info = response.data));
      //this.arrTer = JSON.parse(JSON.stringify(this.info));
    },
    strToSvg(str) {

      if (str != null)
      {
        let parser = new DOMParser();
        let doc = parser.parseFromString(str,'image/svg+xml');
        console.log(doc.documentElement);
        try
        {
            document.getElementById("svgmap").appendChild(doc.documentElement);
        }
        catch(err)
        {
          console.log(err);
        }
      }
    },
    rc() {     
      //alert("sender.id="+sender.id);	
      console.log("Событие сработало");
    },
    addVon() {     
      console.log("Событие сработало");
      document.getElementsByTagName('html')[0].setAttribute('xmlns',"http://www.w3.org/1999/xhtml")

    },
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li {
    list-style: none;
  }
</style>
