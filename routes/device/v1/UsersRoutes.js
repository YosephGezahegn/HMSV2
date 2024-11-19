/**
 * UsersRoutes.js
 * @description :: CRUD API routes for Users
 */

const express = require('express');
const router = express.Router();
const UsersController = require('../../../controller/device/v1/UsersController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/users/create').post(auth(PLATFORM.DEVICE),checkRolePermission,UsersController.addUsers);
router.route('/device/api/v1/users/list').post(auth(PLATFORM.DEVICE),checkRolePermission,UsersController.findAllUsers);
router.route('/device/api/v1/users/count').post(auth(PLATFORM.DEVICE),checkRolePermission,UsersController.getUsersCount);
router.route('/device/api/v1/users/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,UsersController.getUsers);
router.route('/device/api/v1/users/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,UsersController.updateUsers);    
router.route('/device/api/v1/users/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,UsersController.partialUpdateUsers);
router.route('/device/api/v1/users/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,UsersController.softDeleteUsers);
router.route('/device/api/v1/users/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,UsersController.softDeleteManyUsers);
router.route('/device/api/v1/users/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,UsersController.bulkInsertUsers);
router.route('/device/api/v1/users/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,UsersController.bulkUpdateUsers);
router.route('/device/api/v1/users/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,UsersController.deleteUsers);
router.route('/device/api/v1/users/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,UsersController.deleteManyUsers);

module.exports = router;
