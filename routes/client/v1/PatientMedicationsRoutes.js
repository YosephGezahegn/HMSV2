/**
 * PatientMedicationsRoutes.js
 * @description :: CRUD API routes for PatientMedications
 */

const express = require('express');
const router = express.Router();
const PatientMedicationsController = require('../../../controller/client/v1/PatientMedicationsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/patientmedications/create').post(auth(PLATFORM.CLIENT),checkRolePermission,PatientMedicationsController.addPatientMedications);
router.route('/client/api/v1/patientmedications/list').post(auth(PLATFORM.CLIENT),checkRolePermission,PatientMedicationsController.findAllPatientMedications);
router.route('/client/api/v1/patientmedications/count').post(auth(PLATFORM.CLIENT),checkRolePermission,PatientMedicationsController.getPatientMedicationsCount);
router.route('/client/api/v1/patientmedications/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,PatientMedicationsController.getPatientMedications);
router.route('/client/api/v1/patientmedications/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,PatientMedicationsController.updatePatientMedications);    
router.route('/client/api/v1/patientmedications/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,PatientMedicationsController.partialUpdatePatientMedications);
router.route('/client/api/v1/patientmedications/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,PatientMedicationsController.softDeletePatientMedications);
router.route('/client/api/v1/patientmedications/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,PatientMedicationsController.softDeleteManyPatientMedications);
router.route('/client/api/v1/patientmedications/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,PatientMedicationsController.bulkInsertPatientMedications);
router.route('/client/api/v1/patientmedications/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,PatientMedicationsController.bulkUpdatePatientMedications);
router.route('/client/api/v1/patientmedications/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,PatientMedicationsController.deletePatientMedications);
router.route('/client/api/v1/patientmedications/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,PatientMedicationsController.deleteManyPatientMedications);

module.exports = router;
