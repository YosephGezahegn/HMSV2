/**
 * UsersRoutes.js
 * @description :: CRUD API routes for Users
 */

const express = require('express');
const router = express.Router();
const UsersController = require('../../../controller/client/v1/UsersController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/users/create').post(auth(PLATFORM.CLIENT),checkRolePermission,UsersController.addUsers);
router.route('/client/api/v1/users/list').post(auth(PLATFORM.CLIENT),checkRolePermission,UsersController.findAllUsers);
router.route('/client/api/v1/users/count').post(auth(PLATFORM.CLIENT),checkRolePermission,UsersController.getUsersCount);
router.route('/client/api/v1/users/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,UsersController.getUsers);
router.route('/client/api/v1/users/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,UsersController.updateUsers);    
router.route('/client/api/v1/users/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,UsersController.partialUpdateUsers);
router.route('/client/api/v1/users/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,UsersController.softDeleteUsers);
router.route('/client/api/v1/users/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,UsersController.softDeleteManyUsers);
router.route('/client/api/v1/users/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,UsersController.bulkInsertUsers);
router.route('/client/api/v1/users/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,UsersController.bulkUpdateUsers);
router.route('/client/api/v1/users/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,UsersController.deleteUsers);
router.route('/client/api/v1/users/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,UsersController.deleteManyUsers);

module.exports = router;
