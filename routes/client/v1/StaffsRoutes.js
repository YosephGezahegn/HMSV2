/**
 * StaffsRoutes.js
 * @description :: CRUD API routes for Staffs
 */

const express = require('express');
const router = express.Router();
const StaffsController = require('../../../controller/client/v1/StaffsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/staffs/create').post(auth(PLATFORM.CLIENT),checkRolePermission,StaffsController.addStaffs);
router.route('/client/api/v1/staffs/list').post(auth(PLATFORM.CLIENT),checkRolePermission,StaffsController.findAllStaffs);
router.route('/client/api/v1/staffs/count').post(auth(PLATFORM.CLIENT),checkRolePermission,StaffsController.getStaffsCount);
router.route('/client/api/v1/staffs/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,StaffsController.getStaffs);
router.route('/client/api/v1/staffs/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,StaffsController.updateStaffs);    
router.route('/client/api/v1/staffs/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,StaffsController.partialUpdateStaffs);
router.route('/client/api/v1/staffs/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,StaffsController.softDeleteStaffs);
router.route('/client/api/v1/staffs/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,StaffsController.softDeleteManyStaffs);
router.route('/client/api/v1/staffs/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,StaffsController.bulkInsertStaffs);
router.route('/client/api/v1/staffs/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,StaffsController.bulkUpdateStaffs);
router.route('/client/api/v1/staffs/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,StaffsController.deleteStaffs);
router.route('/client/api/v1/staffs/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,StaffsController.deleteManyStaffs);

module.exports = router;
