/**
 * AdmissionsRoutes.js
 * @description :: CRUD API routes for Admissions
 */

const express = require('express');
const router = express.Router();
const AdmissionsController = require('../../../controller/device/v1/AdmissionsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/admissions/create').post(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionsController.addAdmissions);
router.route('/device/api/v1/admissions/list').post(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionsController.findAllAdmissions);
router.route('/device/api/v1/admissions/count').post(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionsController.getAdmissionsCount);
router.route('/device/api/v1/admissions/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionsController.getAdmissions);
router.route('/device/api/v1/admissions/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionsController.updateAdmissions);    
router.route('/device/api/v1/admissions/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionsController.partialUpdateAdmissions);
router.route('/device/api/v1/admissions/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionsController.softDeleteAdmissions);
router.route('/device/api/v1/admissions/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionsController.softDeleteManyAdmissions);
router.route('/device/api/v1/admissions/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionsController.bulkInsertAdmissions);
router.route('/device/api/v1/admissions/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionsController.bulkUpdateAdmissions);
router.route('/device/api/v1/admissions/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionsController.deleteAdmissions);
router.route('/device/api/v1/admissions/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionsController.deleteManyAdmissions);

module.exports = router;
