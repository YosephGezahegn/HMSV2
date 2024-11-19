/**
 * MedicationsRoutes.js
 * @description :: CRUD API routes for Medications
 */

const express = require('express');
const router = express.Router();
const MedicationsController = require('../../../controller/client/v1/MedicationsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/medications/create').post(auth(PLATFORM.CLIENT),checkRolePermission,MedicationsController.addMedications);
router.route('/client/api/v1/medications/list').post(auth(PLATFORM.CLIENT),checkRolePermission,MedicationsController.findAllMedications);
router.route('/client/api/v1/medications/count').post(auth(PLATFORM.CLIENT),checkRolePermission,MedicationsController.getMedicationsCount);
router.route('/client/api/v1/medications/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,MedicationsController.getMedications);
router.route('/client/api/v1/medications/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,MedicationsController.updateMedications);    
router.route('/client/api/v1/medications/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,MedicationsController.partialUpdateMedications);
router.route('/client/api/v1/medications/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,MedicationsController.softDeleteMedications);
router.route('/client/api/v1/medications/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,MedicationsController.softDeleteManyMedications);
router.route('/client/api/v1/medications/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,MedicationsController.bulkInsertMedications);
router.route('/client/api/v1/medications/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,MedicationsController.bulkUpdateMedications);
router.route('/client/api/v1/medications/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,MedicationsController.deleteMedications);
router.route('/client/api/v1/medications/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,MedicationsController.deleteManyMedications);

module.exports = router;
