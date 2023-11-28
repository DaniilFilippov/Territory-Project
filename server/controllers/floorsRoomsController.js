const dbOperations = require('../src/models/dbOperations');

//Получить этажи относящиеся к указанному зданию
async function getFloorsOfBuilding(req, res) {
    try {
        
        const { prnID } = req.params; 
        const result = await dbOperations.executeSQL('SELECT * FROM fd_t_list_of_floors WHERE prn = (select rn from fd_t_bsr_master where ID = :prnID)', {prnID});
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
} 

async function getFloorsByID(req, res) {
  try {
      const { id } = req.params;

      let str = id;

      let parts = str.split(' ');
      let resID = parts[0].trim() + ' /';
      for (let i = 1; i < parts.length; i++) {
        resID = resID + ' ' + parts[i].trim();
      }
      const result = await dbOperations.executeSQL('SELECT * FROM fd_t_list_of_floors WHERE ID = :resID', {resID});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

async function getRoomsOfFloors(req, res) {
  try {
      
      const { id } = req.params; 

      let str = id;

      let parts = str.split(' ');
      let resID = parts[0].trim() + ' /';
      for (let i = 1; i < parts.length; i++) {
        resID = resID + ' ' + parts[i].trim();
      }

      //resID = parts[0].trim() + ' / ' + parts[1].trim() + ' ' + parts[2].trim();
      console.log(resID + ' : ' + parts.length);

      const result = await dbOperations.executeSQL('SELECT * FROM fd_t_list_of_rooms WHERE prn = (select rn from fd_t_list_of_floors where ID = :resID)', {resID});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
} 

async function getRoomsOfFloorsById(req, res) {
  try {
      
      const id = req.params.floorId; 
      const roomId = req.params.roomId;

      let str = id;
      let parts = str.split(' ');
      let resID = parts[0].trim() + ' /';
      for (let i = 1; i < parts.length; i++) {
        resID = resID + ' ' + parts[i].trim();
      }

      let parts1 = roomId.split('-');
      let resroomId2, resroomId1;


      if (parts1[1] === undefined) {
         resroomId2 = parts1[0].replace('r', ''); // "42"; // "r42"
         resroomId1 = null;
      }
      else       {
         resroomId1 = parts1[0]; // "I"
         resroomId2 = parts1[1].replace('r', ''); // "42"; // "r42"
      }

      console.log( resroomId1);
      console.log(resroomId2);

     //resID = parts[0].trim() + ' / ' + parts[1].trim() + ' ' + parts[2].trim();



      const result = await dbOperations.executeSQL(
        `SELECT r.ID as "Идентификатор", r.numbofdoor as "Номер комнаты(на двери)", r.numbofplacement as "Номер помещения", r.NUMBOFROOM as "Номер комнаты в помещении", r.height as "Высота",
        r.square as "Площадь",
        (SELECT name 
             FROM DMSENUMVALUES  
             WHERE  prn = (select rn from DMSDOMAINS where code = 'PurposeOfRoom' ) 
             AND value_num = r.purposeofroom) as "Назначение команты",
        (SELECT name 
             FROM DMSENUMVALUES  
             WHERE  prn = (select rn from DMSDOMAINS where code = 'TypeOfRoom' ) 
             AND value_num = r.typeofroom) as "Вид команты",
        (SELECT name 
             FROM udo_t_namesofrooms   
             WHERE  rn = r.nameofroom) as "Наименование комнаты",
        (SELECT name 
             FROM DMSENUMVALUES  
             WHERE  prn = (select rn from DMSDOMAINS where code = 'ClassifReporting' ) 
             AND value_num = r.CLASSIFREPORTINGVPOSPO) as "Классификация по ВПО СПО",
        (SELECT name 
             FROM DMSENUMVALUES  
             WHERE  prn = (select rn from DMSDOMAINS where code = 'ClassifEconActiv' ) 
             AND value_num = r.CLASSIFECONACTIVITY) as "Классификация хоз. деят.",
        (SELECT name 
             FROM udo_t_namesofrooms   
             WHERE  rn = r.ROOMACTUALUSE) as "Фактическое использование",
        (SELECT name
                from INS_DEPARTMENT
                where rn = (select INS_DEPARTMENTRN from FD_T_DIVISIONS_ROOM where prn = r.rn and (DATETO is null or DATETO > (select SYSDATE from dual)))) as "Подразделение",
        (SELECT code
          from INS_DEPARTMENT
          where rn = (select INS_DEPARTMENTRN from FD_T_DIVISIONS_ROOM where prn = r.rn and (DATETO is null or DATETO > (select SYSDATE from dual)))) as "CODE"
        FROM fd_t_list_of_rooms r
        WHERE prn = (select rn from fd_t_list_of_floors where ID = :resID) 
        and r.numbofplacement = :resroomId1
        and r.NUMBOFROOM =:resroomId2`,
         {resID, resroomId1, resroomId2});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
} 

//Вывод всех комнат этажа 
async function getRoomsOfFloorsEdit(req, res) {
  try {
      
      const id = req.params.floorId; 

      let str = id;
      let parts = str.split(' ');
      let resID = parts[0].trim() + ' /';
      for (let i = 1; i < parts.length; i++) {
        resID = resID + ' ' + parts[i].trim();
      }
      const result = await dbOperations.executeSQL(
        `SELECT r.ID as "Идентификатор", r.numbofdoor as "Номер комнаты(на двери)", r.numbofplacement as "Номер помещения", r.NUMBOFROOM as "Номер комнаты в помещении", r.height as "Высота",
        r.square as "Площадь",
        (SELECT name 
             FROM DMSENUMVALUES  
             WHERE  prn = (select rn from DMSDOMAINS where code = 'PurposeOfRoom' ) 
             AND value_num = r.purposeofroom) as "Назначение команты",
        (SELECT name 
             FROM DMSENUMVALUES  
             WHERE  prn = (select rn from DMSDOMAINS where code = 'TypeOfRoom' ) 
             AND value_num = r.typeofroom) as "Вид команты",
        (SELECT name 
             FROM udo_t_namesofrooms   
             WHERE  rn = r.nameofroom) as "Наименование комнаты",
        (SELECT name 
             FROM DMSENUMVALUES  
             WHERE  prn = (select rn from DMSDOMAINS where code = 'ClassifReporting' ) 
             AND value_num = r.CLASSIFREPORTINGVPOSPO) as "Классификация по ВПО СПО",
        (SELECT name 
             FROM DMSENUMVALUES  
             WHERE  prn = (select rn from DMSDOMAINS where code = 'ClassifEconActiv' ) 
             AND value_num = r.CLASSIFECONACTIVITY) as "Классификация хоз. деят.",
        (SELECT name 
             FROM udo_t_namesofrooms   
             WHERE  rn = r.ROOMACTUALUSE) as "Фактическое использование",
        (SELECT name
                from INS_DEPARTMENT
                where rn = (select INS_DEPARTMENTRN from FD_T_DIVISIONS_ROOM where prn = r.rn and (DATETO is null or DATETO > (select SYSDATE from dual)))) as "Подразделение",
        (SELECT code
          from INS_DEPARTMENT
          where rn = (select INS_DEPARTMENTRN from FD_T_DIVISIONS_ROOM where prn = r.rn and (DATETO is null or DATETO > (select SYSDATE from dual)))) as "CODE"
        FROM fd_t_list_of_rooms r
        WHERE prn = (select rn from fd_t_list_of_floors where ID = :resID)`,
         {resID});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
} 
// Извлечение цвета закрепленного за Штатным подразделением
async function getColorOfInsDepart(req, res) {
  try {
      const codeInsDep  = req.params.codeInsDep; 
         const result = await dbOperations.executeSQL(`select * from DOCS_PROPS_VALS 
      where unitcode = 'INS_DEPARTMENT' 
      and UNIT_RN  = (select rn from INS_DEPARTMENT where code = :codeInsDep)`, {codeInsDep});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
} 


module.exports = {
    getFloorsOfBuilding,
    getFloorsByID,
    getRoomsOfFloors,
    getRoomsOfFloorsById,
    getColorOfInsDepart,
    getRoomsOfFloorsEdit
}