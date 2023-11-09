const dbOperations = require('../src/models/dbOperations');
//Get Building by ID
async function getBuildingById(req, res) {
    try {
        const { id } = req.params.id;
        const result = await dbOperations.executeSQL('SELECT * FROM FD_T_LAND_PLOTS WHERE ID = :id', {id});
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

//Get buildings plots relative to the land
async function getBuildingsOfLands(req, res) {
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