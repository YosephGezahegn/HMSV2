/**
 * UsersRoutes.js
 * @description :: CRUD API routes for Users
 */

const express = require('express');
const router = express.Router();
const UsersController = require('../../controller/admin/UsersController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/users/create').post(auth(PLATFORM.ADMIN),checkRolePermission,UsersController.addUsers);
router.route('/admin/users/list').post(auth(PLATFORM.ADMIN),checkRolePermission,UsersController.findAllUsers);
router.route('/admin/users/count').post(auth(PLATFORM.ADMIN),checkRolePermission,UsersController.getUsersCount);
router.route('/admin/users/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,UsersController.getUsers);
router.route('/admin/users/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,UsersController.updateUsers);    
router.route('/admin/users/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,UsersController.partialUpdateUsers);
router.route('/admin/users/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,UsersController.softDeleteUsers);
router.route('/admin/users/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,UsersController.softDeleteManyUsers);
router.route('/admin/users/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,UsersController.bulkInsertUsers);
router.route('/admin/users/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,UsersController.bulkUpdateUsers);
router.route('/admin/users/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,UsersController.deleteUsers);
router.route('/admin/users/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,UsersController.deleteManyUsers);

module.exports = router;
