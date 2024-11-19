/**
 * PatientsRoutes.js
 * @description :: CRUD API routes for Patients
 */

const express = require('express');
const router = express.Router();
const PatientsController = require('../../../controller/client/v1/PatientsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/patients/create').post(auth(PLATFORM.CLIENT),checkRolePermission,PatientsController.addPatients);
router.route('/client/api/v1/patients/list').post(auth(PLATFORM.CLIENT),checkRolePermission,PatientsController.findAllPatients);
router.route('/client/api/v1/patients/count').post(auth(PLATFORM.CLIENT),checkRolePermission,PatientsController.getPatientsCount);
router.route('/client/api/v1/patients/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,PatientsController.getPatients);
router.route('/client/api/v1/patients/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,PatientsController.updatePatients);    
router.route('/client/api/v1/patients/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,PatientsController.partialUpdatePatients);
router.route('/client/api/v1/patients/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,PatientsController.softDeletePatients);
router.route('/client/api/v1/patients/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,PatientsController.softDeleteManyPatients);
router.route('/client/api/v1/patients/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,PatientsController.bulkInsertPatients);
router.route('/client/api/v1/patients/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,PatientsController.bulkUpdatePatients);
router.route('/client/api/v1/patients/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,PatientsController.deletePatients);
router.route('/client/api/v1/patients/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,PatientsController.deleteManyPatients);

module.exports = router;
