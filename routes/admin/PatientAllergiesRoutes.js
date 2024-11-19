/**
 * PatientAllergiesRoutes.js
 * @description :: CRUD API routes for PatientAllergies
 */

const express = require('express');
const router = express.Router();
const PatientAllergiesController = require('../../controller/admin/PatientAllergiesController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/patientallergies/create').post(auth(PLATFORM.ADMIN),checkRolePermission,PatientAllergiesController.addPatientAllergies);
router.route('/admin/patientallergies/list').post(auth(PLATFORM.ADMIN),checkRolePermission,PatientAllergiesController.findAllPatientAllergies);
router.route('/admin/patientallergies/count').post(auth(PLATFORM.ADMIN),checkRolePermission,PatientAllergiesController.getPatientAllergiesCount);
router.route('/admin/patientallergies/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,PatientAllergiesController.getPatientAllergies);
router.route('/admin/patientallergies/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PatientAllergiesController.updatePatientAllergies);    
router.route('/admin/patientallergies/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PatientAllergiesController.partialUpdatePatientAllergies);
router.route('/admin/patientallergies/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PatientAllergiesController.softDeletePatientAllergies);
router.route('/admin/patientallergies/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,PatientAllergiesController.softDeleteManyPatientAllergies);
router.route('/admin/patientallergies/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,PatientAllergiesController.bulkInsertPatientAllergies);
router.route('/admin/patientallergies/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,PatientAllergiesController.bulkUpdatePatientAllergies);
router.route('/admin/patientallergies/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,PatientAllergiesController.deletePatientAllergies);
router.route('/admin/patientallergies/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,PatientAllergiesController.deleteManyPatientAllergies);

module.exports = router;
