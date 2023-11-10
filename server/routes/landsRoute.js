const express = require('express');
const landsController = require('../controllers/landsController');

const router = express.Router();

router.get('/lands', landsController.getAllLands);

router.get('/lands/:id/', landsController.getLandById);

router.get('/territories/lands/:prnID/', landsController.getLandsOfTerritory);

module.exports = router;