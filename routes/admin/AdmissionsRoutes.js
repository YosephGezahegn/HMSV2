/**
 * AdmissionsRoutes.js
 * @description :: CRUD API routes for Admissions
 */

const express = require('express');
const router = express.Router();
const AdmissionsController = require('../../controller/admin/AdmissionsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/admissions/create').post(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionsController.addAdmissions);
router.route('/admin/admissions/list').post(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionsController.findAllAdmissions);
router.route('/admin/admissions/count').post(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionsController.getAdmissionsCount);
router.route('/admin/admissions/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionsController.getAdmissions);
router.route('/admin/admissions/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionsController.updateAdmissions);    
router.route('/admin/admissions/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionsController.partialUpdateAdmissions);
router.route('/admin/admissions/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionsController.softDeleteAdmissions);
router.route('/admin/admissions/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionsController.softDeleteManyAdmissions);
router.route('/admin/admissions/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionsController.bulkInsertAdmissions);
router.route('/admin/admissions/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionsController.bulkUpdateAdmissions);
router.route('/admin/admissions/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionsController.deleteAdmissions);
router.route('/admin/admissions/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionsController.deleteManyAdmissions);

module.exports = router;
