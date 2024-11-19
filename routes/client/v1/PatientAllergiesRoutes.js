/**
 * PatientAllergiesRoutes.js
 * @description :: CRUD API routes for PatientAllergies
 */

const express = require('express');
const router = express.Router();
const PatientAllergiesController = require('../../../controller/client/v1/PatientAllergiesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/patientallergies/create').post(auth(PLATFORM.CLIENT),checkRolePermission,PatientAllergiesController.addPatientAllergies);
router.route('/client/api/v1/patientallergies/list').post(auth(PLATFORM.CLIENT),checkRolePermission,PatientAllergiesController.findAllPatientAllergies);
router.route('/client/api/v1/patientallergies/count').post(auth(PLATFORM.CLIENT),checkRolePermission,PatientAllergiesController.getPatientAllergiesCount);
router.route('/client/api/v1/patientallergies/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,PatientAllergiesController.getPatientAllergies);
router.route('/client/api/v1/patientallergies/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,PatientAllergiesController.updatePatientAllergies);    
router.route('/client/api/v1/patientallergies/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,PatientAllergiesController.partialUpdatePatientAllergies);
router.route('/client/api/v1/patientallergies/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,PatientAllergiesController.softDeletePatientAllergies);
router.route('/client/api/v1/patientallergies/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,PatientAllergiesController.softDeleteManyPatientAllergies);
router.route('/client/api/v1/patientallergies/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,PatientAllergiesController.bulkInsertPatientAllergies);
router.route('/client/api/v1/patientallergies/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,PatientAllergiesController.bulkUpdatePatientAllergies);
router.route('/client/api/v1/patientallergies/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,PatientAllergiesController.deletePatientAllergies);
router.route('/client/api/v1/patientallergies/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,PatientAllergiesController.deleteManyPatientAllergies);

module.exports = router;
