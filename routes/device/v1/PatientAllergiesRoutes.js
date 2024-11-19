/**
 * PatientAllergiesRoutes.js
 * @description :: CRUD API routes for PatientAllergies
 */

const express = require('express');
const router = express.Router();
const PatientAllergiesController = require('../../../controller/device/v1/PatientAllergiesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/patientallergies/create').post(auth(PLATFORM.DEVICE),checkRolePermission,PatientAllergiesController.addPatientAllergies);
router.route('/device/api/v1/patientallergies/list').post(auth(PLATFORM.DEVICE),checkRolePermission,PatientAllergiesController.findAllPatientAllergies);
router.route('/device/api/v1/patientallergies/count').post(auth(PLATFORM.DEVICE),checkRolePermission,PatientAllergiesController.getPatientAllergiesCount);
router.route('/device/api/v1/patientallergies/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,PatientAllergiesController.getPatientAllergies);
router.route('/device/api/v1/patientallergies/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PatientAllergiesController.updatePatientAllergies);    
router.route('/device/api/v1/patientallergies/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PatientAllergiesController.partialUpdatePatientAllergies);
router.route('/device/api/v1/patientallergies/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PatientAllergiesController.softDeletePatientAllergies);
router.route('/device/api/v1/patientallergies/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,PatientAllergiesController.softDeleteManyPatientAllergies);
router.route('/device/api/v1/patientallergies/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,PatientAllergiesController.bulkInsertPatientAllergies);
router.route('/device/api/v1/patientallergies/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,PatientAllergiesController.bulkUpdatePatientAllergies);
router.route('/device/api/v1/patientallergies/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,PatientAllergiesController.deletePatientAllergies);
router.route('/device/api/v1/patientallergies/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,PatientAllergiesController.deleteManyPatientAllergies);

module.exports = router;
