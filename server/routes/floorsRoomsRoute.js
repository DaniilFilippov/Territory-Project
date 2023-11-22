const express = require('express');
const floorsRoomsController = require('../controllers/floorsRoomsController');
const router = express.Router();


router.get('/floors/', floorsRoomsController.getFloorsOfBuilding);
router.get('/floors/:prnID', floorsRoomsController.getFloorsOfBuilding);
router.get('/buildings/floors/:id', floorsRoomsController.getFloorsByID);
router.get('/floors/rooms/:id', floorsRoomsController.getRoomsOfFloors);
router.get('/floors/rooms/:floorId/:roomId', floorsRoomsController.getRoomsOfFloorsById);

module.exports = router;