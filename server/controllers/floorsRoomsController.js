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
      let resID = parts[0].trim() + ' / ' + parts[1].trim() + ' ' + parts[2].trim();
      console.log(resID);
      const result = await dbOperations.executeSQL('SELECT * FROM fd_t_list_of_floors WHERE ID = :resID', {resID});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getFloorsOfBuilding,
    getFloorsByID
}