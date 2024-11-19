/**
 * MedicationsRoutes.js
 * @description :: CRUD API routes for Medications
 */

const express = require('express');
const router = express.Router();
const MedicationsController = require('../../../controller/device/v1/MedicationsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/medications/create').post(auth(PLATFORM.DEVICE),checkRolePermission,MedicationsController.addMedications);
router.route('/device/api/v1/medications/list').post(auth(PLATFORM.DEVICE),checkRolePermission,MedicationsController.findAllMedications);
router.route('/device/api/v1/medications/count').post(auth(PLATFORM.DEVICE),checkRolePermission,MedicationsController.getMedicationsCount);
router.route('/device/api/v1/medications/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,MedicationsController.getMedications);
router.route('/device/api/v1/medications/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,MedicationsController.updateMedications);    
router.route('/device/api/v1/medications/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,MedicationsController.partialUpdateMedications);
router.route('/device/api/v1/medications/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,MedicationsController.softDeleteMedications);
router.route('/device/api/v1/medications/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,MedicationsController.softDeleteManyMedications);
router.route('/device/api/v1/medications/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,MedicationsController.bulkInsertMedications);
router.route('/device/api/v1/medications/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,MedicationsController.bulkUpdateMedications);
router.route('/device/api/v1/medications/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,MedicationsController.deleteMedications);
router.route('/device/api/v1/medications/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,MedicationsController.deleteManyMedications);

module.exports = router;
