const dbOperations = require('../database/dbOperations');

//Get all territories
async function getAllTerritory(req, res) {
    try {
      const territory = await dbOperations.executeSQL('SELECT * FROM FD_T_TERRITORY');
      
      res.status(200).json(territory);
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
//Get territory by ID
async function getTerritoryById(req, res) {
    try {
        const { id } = req.params;
        const result = await dbOperations.executeSQL('SELECT * FROM FD_T_TERRITORY WHERE ID = :id', {id});
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

module.exports = {
    getAllTerritory,
    getTerritoryById
};