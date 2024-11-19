/**
 * RoomsRoutes.js
 * @description :: CRUD API routes for Rooms
 */

const express = require('express');
const router = express.Router();
const RoomsController = require('../../../controller/client/v1/RoomsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/rooms/create').post(auth(PLATFORM.CLIENT),checkRolePermission,RoomsController.addRooms);
router.route('/client/api/v1/rooms/list').post(auth(PLATFORM.CLIENT),checkRolePermission,RoomsController.findAllRooms);
router.route('/client/api/v1/rooms/count').post(auth(PLATFORM.CLIENT),checkRolePermission,RoomsController.getRoomsCount);
router.route('/client/api/v1/rooms/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,RoomsController.getRooms);
router.route('/client/api/v1/rooms/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,RoomsController.updateRooms);    
router.route('/client/api/v1/rooms/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,RoomsController.partialUpdateRooms);
router.route('/client/api/v1/rooms/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,RoomsController.softDeleteRooms);
router.route('/client/api/v1/rooms/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,RoomsController.softDeleteManyRooms);
router.route('/client/api/v1/rooms/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,RoomsController.bulkInsertRooms);
router.route('/client/api/v1/rooms/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,RoomsController.bulkUpdateRooms);
router.route('/client/api/v1/rooms/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,RoomsController.deleteRooms);
router.route('/client/api/v1/rooms/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,RoomsController.deleteManyRooms);

module.exports = router;
