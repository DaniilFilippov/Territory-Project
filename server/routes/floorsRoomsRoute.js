const express = require('express');
const floorsRoomsController = require('../controllers/floorsRoomsController');
const router = express.Router();


router.get('/floors/', floorsRoomsController.getFloorsOfBuilding);
router.get('/floors/:prnID', floorsRoomsController.getFloorsOfBuilding);
router.get('/buildings/floors/:id', floorsRoomsController.getFloorsByID);
router.get('/floors/rooms/:id', floorsRoomsController.getRoomsOfFloors);
router.get('/floors/rooms/:floorId/:roomId', floorsRoomsController.getRoomsOfFloorsById);
router.get('/InsDep/:codeInsDep', floorsRoomsController.getColorOfInsDepart);
router.get('/rooms/:floorId', floorsRoomsController.getRoomsOfFloorsEdit);
router.get('/floors/info/:floorId', floorsRoomsController.getInfoRoomsByFloor);
router.get('/floors/info/domen/:code', floorsRoomsController.getNamesOfDomen);
module.exports = router;