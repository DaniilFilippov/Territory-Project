const dbOperations = require('../src/models/dbOperations');

//Get all lands
async function getAllLands(req, res) {
    try {
      const lands = await dbOperations.executeSQL('SELECT * FROM FD_T_LAND_PLOTS');
      
      res.status(200).json(lands);
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
//Get lands by ID
async function getLandById(req, res) {
    try {
        const { id } = req.params;
        const result = await dbOperations.executeSQL('SELECT * FROM FD_T_LAND_PLOTS WHERE ID = :id', {id});
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

//Get land plots relative to the territory
async function getLandsOfTerritory(req, res) {
    try {
        //territory
        const { prnID } = req.params; 
        const result = await dbOperations.executeSQL('SELECT * FROM FD_T_LAND_PLOTS WHERE PRN = (select rn from fd_t_territory where ID = :prnID)', {prnID});
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}




module.exports = {
    getAllLands,
    getLandById,
    getLandsOfTerritory
};