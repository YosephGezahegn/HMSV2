/**
 * PatientMedicationsRoutes.js
 * @description :: CRUD API routes for PatientMedications
 */

const express = require('express');
const router = express.Router();
const PatientMedicationsController = require('../../../controller/device/v1/PatientMedicationsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/patientmedications/create').post(auth(PLATFORM.DEVICE),checkRolePermission,PatientMedicationsController.addPatientMedications);
router.route('/device/api/v1/patientmedications/list').post(auth(PLATFORM.DEVICE),checkRolePermission,PatientMedicationsController.findAllPatientMedications);
router.route('/device/api/v1/patientmedications/count').post(auth(PLATFORM.DEVICE),checkRolePermission,PatientMedicationsController.getPatientMedicationsCount);
router.route('/device/api/v1/patientmedications/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,PatientMedicationsController.getPatientMedications);
router.route('/device/api/v1/patientmedications/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PatientMedicationsController.updatePatientMedications);    
router.route('/device/api/v1/patientmedications/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PatientMedicationsController.partialUpdatePatientMedications);
router.route('/device/api/v1/patientmedications/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PatientMedicationsController.softDeletePatientMedications);
router.route('/device/api/v1/patientmedications/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,PatientMedicationsController.softDeleteManyPatientMedications);
router.route('/device/api/v1/patientmedications/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,PatientMedicationsController.bulkInsertPatientMedications);
router.route('/device/api/v1/patientmedications/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,PatientMedicationsController.bulkUpdatePatientMedications);
router.route('/device/api/v1/patientmedications/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,PatientMedicationsController.deletePatientMedications);
router.route('/device/api/v1/patientmedications/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,PatientMedicationsController.deleteManyPatientMedications);

module.exports = router;
