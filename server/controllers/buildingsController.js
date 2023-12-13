const dbOperations = require('../src/models/dbOperations');
//Получить здание по ID
async function getBuildingById(req, res) {
    try {
        const { id } = req.params;
        const result = await dbOperations.executeSQL('SELECT * FROM fd_t_bsr_master WHERE ID = :id', {id});
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

//Получить здания относящиеся к указанному земельному участку
async function getBuildingsOfLands(req, res) {
    try {
        //territory
        const { prnID } = req.params; 
        const result = await dbOperations.executeSQL(`SELECT * 
        FROM fd_t_bsr_master 
        WHERE landplotsrn = (
            SELECT rn 
            FROM fd_t_land_plots 
            WHERE TRIM(BOTH FROM REPLACE(REPLACE(ID, CHR(13), ''), CHR(10), '')) = TRIM(BOTH FROM :prnID)
        )`, {prnID});
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

//Получить здания относящиеся к указанному земельному участку
async function getAllBuildings(req, res) {
  try {
      //territory
      const { prnID } = req.params; 
      const result = await dbOperations.executeSQL('SELECT * FROM fd_t_bsr_master');
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}



module.exports = {
    getBuildingById,
    getBuildingsOfLands,
    getAllBuildings
};