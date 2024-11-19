/**
 * StaffsRoutes.js
 * @description :: CRUD API routes for Staffs
 */

const express = require('express');
const router = express.Router();
const StaffsController = require('../../../controller/device/v1/StaffsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/staffs/create').post(auth(PLATFORM.DEVICE),checkRolePermission,StaffsController.addStaffs);
router.route('/device/api/v1/staffs/list').post(auth(PLATFORM.DEVICE),checkRolePermission,StaffsController.findAllStaffs);
router.route('/device/api/v1/staffs/count').post(auth(PLATFORM.DEVICE),checkRolePermission,StaffsController.getStaffsCount);
router.route('/device/api/v1/staffs/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,StaffsController.getStaffs);
router.route('/device/api/v1/staffs/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,StaffsController.updateStaffs);    
router.route('/device/api/v1/staffs/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,StaffsController.partialUpdateStaffs);
router.route('/device/api/v1/staffs/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,StaffsController.softDeleteStaffs);
router.route('/device/api/v1/staffs/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,StaffsController.softDeleteManyStaffs);
router.route('/device/api/v1/staffs/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,StaffsController.bulkInsertStaffs);
router.route('/device/api/v1/staffs/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,StaffsController.bulkUpdateStaffs);
router.route('/device/api/v1/staffs/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,StaffsController.deleteStaffs);
router.route('/device/api/v1/staffs/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,StaffsController.deleteManyStaffs);

module.exports = router;
