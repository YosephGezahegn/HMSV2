/**
 * PatientMedicationsRoutes.js
 * @description :: CRUD API routes for PatientMedications
 */

const express = require('express');
const router = express.Router();
const PatientMedicationsController = require('../../controller/admin/PatientMedicationsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/patientmedications/create').post(auth(PLATFORM.ADMIN),checkRolePermission,PatientMedicationsController.addPatientMedications);
router.route('/admin/patientmedications/list').post(auth(PLATFORM.ADMIN),checkRolePermission,PatientMedicationsController.findAllPatientMedications);
router.route('/admin/patientmedications/count').post(auth(PLATFORM.ADMIN),checkRolePermission,PatientMedicationsController.getPatientMedicationsCount);
router.route('/admin/patientmedications/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,PatientMedicationsController.getPatientMedications);
router.route('/admin/patientmedications/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PatientMedicationsController.updatePatientMedications);    
router.route('/admin/patientmedications/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PatientMedicationsController.partialUpdatePatientMedications);
router.route('/admin/patientmedications/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PatientMedicationsController.softDeletePatientMedications);
router.route('/admin/patientmedications/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,PatientMedicationsController.softDeleteManyPatientMedications);
router.route('/admin/patientmedications/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,PatientMedicationsController.bulkInsertPatientMedications);
router.route('/admin/patientmedications/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,PatientMedicationsController.bulkUpdatePatientMedications);
router.route('/admin/patientmedications/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,PatientMedicationsController.deletePatientMedications);
router.route('/admin/patientmedications/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,PatientMedicationsController.deleteManyPatientMedications);

module.exports = router;
