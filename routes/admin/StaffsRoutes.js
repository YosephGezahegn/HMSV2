/**
 * StaffsRoutes.js
 * @description :: CRUD API routes for Staffs
 */

const express = require('express');
const router = express.Router();
const StaffsController = require('../../controller/admin/StaffsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/staffs/create').post(auth(PLATFORM.ADMIN),checkRolePermission,StaffsController.addStaffs);
router.route('/admin/staffs/list').post(auth(PLATFORM.ADMIN),checkRolePermission,StaffsController.findAllStaffs);
router.route('/admin/staffs/count').post(auth(PLATFORM.ADMIN),checkRolePermission,StaffsController.getStaffsCount);
router.route('/admin/staffs/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,StaffsController.getStaffs);
router.route('/admin/staffs/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,StaffsController.updateStaffs);    
router.route('/admin/staffs/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,StaffsController.partialUpdateStaffs);
router.route('/admin/staffs/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,StaffsController.softDeleteStaffs);
router.route('/admin/staffs/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,StaffsController.softDeleteManyStaffs);
router.route('/admin/staffs/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,StaffsController.bulkInsertStaffs);
router.route('/admin/staffs/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,StaffsController.bulkUpdateStaffs);
router.route('/admin/staffs/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,StaffsController.deleteStaffs);
router.route('/admin/staffs/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,StaffsController.deleteManyStaffs);

module.exports = router;
