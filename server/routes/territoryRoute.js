const express = require('express');
const territoryController = require('../controllers/territoryController');

const router = express.Router();

router.get('/territories', territoryController.getAllTerritory);

router.get('/territories/:id', territoryController.getTerritoryById);

module.exports = router;