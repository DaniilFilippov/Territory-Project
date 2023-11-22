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

      let resroomId1 = parts1[0]; // "I"
      let resroomId2 = parts1[1].replace('r', ''); // "42"; // "r42"

      //resID = parts[0].trim() + ' / ' + parts[1].trim() + ' ' + parts[2].trim();
      console.log(resroomId1 + 11);

      console.log(resroomId2 + 22);


      const result = await dbOperations.executeSQL('SELECT * FROM fd_t_list_of_rooms WHERE prn = (select rn from fd_t_list_of_floors where ID = :resID) and numbofplacement = :resroomId1 and NUMBOFROOM = :resroomId2', {resID, resroomId1, resroomId2});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
} 

module.exports = {
    getFloorsOfBuilding,
    getFloorsByID,
    getRoomsOfFloors,
    getRoomsOfFloorsById
}