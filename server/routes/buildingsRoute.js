const express = require('express');
const buildingsController = require('../controllers/buildingsController');

const router = express.Router();

router.get('/buildings', buildingsController.getAllBuildings);

router.get('/buildings/:id', buildingsController.getBuildingById);

router.get('/lands/buildings/:prnID/', buildingsController.getBuildingsOfLands);

module.exports = router;