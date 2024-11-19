/**
 * AdmissionsRoutes.js
 * @description :: CRUD API routes for Admissions
 */

const express = require('express');
const router = express.Router();
const AdmissionsController = require('../../../controller/client/v1/AdmissionsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/admissions/create').post(auth(PLATFORM.CLIENT),checkRolePermission,AdmissionsController.addAdmissions);
router.route('/client/api/v1/admissions/list').post(auth(PLATFORM.CLIENT),checkRolePermission,AdmissionsController.findAllAdmissions);
router.route('/client/api/v1/admissions/count').post(auth(PLATFORM.CLIENT),checkRolePermission,AdmissionsController.getAdmissionsCount);
router.route('/client/api/v1/admissions/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,AdmissionsController.getAdmissions);
router.route('/client/api/v1/admissions/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,AdmissionsController.updateAdmissions);    
router.route('/client/api/v1/admissions/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,AdmissionsController.partialUpdateAdmissions);
router.route('/client/api/v1/admissions/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,AdmissionsController.softDeleteAdmissions);
router.route('/client/api/v1/admissions/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,AdmissionsController.softDeleteManyAdmissions);
router.route('/client/api/v1/admissions/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,AdmissionsController.bulkInsertAdmissions);
router.route('/client/api/v1/admissions/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,AdmissionsController.bulkUpdateAdmissions);
router.route('/client/api/v1/admissions/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,AdmissionsController.deleteAdmissions);
router.route('/client/api/v1/admissions/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,AdmissionsController.deleteManyAdmissions);

module.exports = router;
