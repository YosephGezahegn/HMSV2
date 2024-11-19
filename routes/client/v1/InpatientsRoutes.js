/**
 * InpatientsRoutes.js
 * @description :: CRUD API routes for Inpatients
 */

const express = require('express');
const router = express.Router();
const InpatientsController = require('../../../controller/client/v1/InpatientsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/inpatients/create').post(auth(PLATFORM.CLIENT),checkRolePermission,InpatientsController.addInpatients);
router.route('/client/api/v1/inpatients/list').post(auth(PLATFORM.CLIENT),checkRolePermission,InpatientsController.findAllInpatients);
router.route('/client/api/v1/inpatients/count').post(auth(PLATFORM.CLIENT),checkRolePermission,InpatientsController.getInpatientsCount);
router.route('/client/api/v1/inpatients/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,InpatientsController.getInpatients);
router.route('/client/api/v1/inpatients/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,InpatientsController.updateInpatients);    
router.route('/client/api/v1/inpatients/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,InpatientsController.partialUpdateInpatients);
router.route('/client/api/v1/inpatients/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,InpatientsController.softDeleteInpatients);
router.route('/client/api/v1/inpatients/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,InpatientsController.softDeleteManyInpatients);
router.route('/client/api/v1/inpatients/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,InpatientsController.bulkInsertInpatients);
router.route('/client/api/v1/inpatients/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,InpatientsController.bulkUpdateInpatients);
router.route('/client/api/v1/inpatients/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,InpatientsController.deleteInpatients);
router.route('/client/api/v1/inpatients/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,InpatientsController.deleteManyInpatients);

module.exports = router;
