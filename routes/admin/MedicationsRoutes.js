/**
 * MedicationsRoutes.js
 * @description :: CRUD API routes for Medications
 */

const express = require('express');
const router = express.Router();
const MedicationsController = require('../../controller/admin/MedicationsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/medications/create').post(auth(PLATFORM.ADMIN),checkRolePermission,MedicationsController.addMedications);
router.route('/admin/medications/list').post(auth(PLATFORM.ADMIN),checkRolePermission,MedicationsController.findAllMedications);
router.route('/admin/medications/count').post(auth(PLATFORM.ADMIN),checkRolePermission,MedicationsController.getMedicationsCount);
router.route('/admin/medications/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,MedicationsController.getMedications);
router.route('/admin/medications/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,MedicationsController.updateMedications);    
router.route('/admin/medications/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,MedicationsController.partialUpdateMedications);
router.route('/admin/medications/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,MedicationsController.softDeleteMedications);
router.route('/admin/medications/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,MedicationsController.softDeleteManyMedications);
router.route('/admin/medications/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,MedicationsController.bulkInsertMedications);
router.route('/admin/medications/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,MedicationsController.bulkUpdateMedications);
router.route('/admin/medications/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,MedicationsController.deleteMedications);
router.route('/admin/medications/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,MedicationsController.deleteManyMedications);

module.exports = router;
