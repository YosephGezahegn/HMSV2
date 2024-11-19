/**
 * InpatientsRoutes.js
 * @description :: CRUD API routes for Inpatients
 */

const express = require('express');
const router = express.Router();
const InpatientsController = require('../../../controller/device/v1/InpatientsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/inpatients/create').post(auth(PLATFORM.DEVICE),checkRolePermission,InpatientsController.addInpatients);
router.route('/device/api/v1/inpatients/list').post(auth(PLATFORM.DEVICE),checkRolePermission,InpatientsController.findAllInpatients);
router.route('/device/api/v1/inpatients/count').post(auth(PLATFORM.DEVICE),checkRolePermission,InpatientsController.getInpatientsCount);
router.route('/device/api/v1/inpatients/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,InpatientsController.getInpatients);
router.route('/device/api/v1/inpatients/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,InpatientsController.updateInpatients);    
router.route('/device/api/v1/inpatients/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,InpatientsController.partialUpdateInpatients);
router.route('/device/api/v1/inpatients/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,InpatientsController.softDeleteInpatients);
router.route('/device/api/v1/inpatients/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,InpatientsController.softDeleteManyInpatients);
router.route('/device/api/v1/inpatients/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,InpatientsController.bulkInsertInpatients);
router.route('/device/api/v1/inpatients/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,InpatientsController.bulkUpdateInpatients);
router.route('/device/api/v1/inpatients/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,InpatientsController.deleteInpatients);
router.route('/device/api/v1/inpatients/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,InpatientsController.deleteManyInpatients);

module.exports = router;
