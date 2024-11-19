/**
 * InpatientsRoutes.js
 * @description :: CRUD API routes for Inpatients
 */

const express = require('express');
const router = express.Router();
const InpatientsController = require('../../controller/admin/InpatientsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/inpatients/create').post(auth(PLATFORM.ADMIN),checkRolePermission,InpatientsController.addInpatients);
router.route('/admin/inpatients/list').post(auth(PLATFORM.ADMIN),checkRolePermission,InpatientsController.findAllInpatients);
router.route('/admin/inpatients/count').post(auth(PLATFORM.ADMIN),checkRolePermission,InpatientsController.getInpatientsCount);
router.route('/admin/inpatients/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,InpatientsController.getInpatients);
router.route('/admin/inpatients/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,InpatientsController.updateInpatients);    
router.route('/admin/inpatients/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,InpatientsController.partialUpdateInpatients);
router.route('/admin/inpatients/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,InpatientsController.softDeleteInpatients);
router.route('/admin/inpatients/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,InpatientsController.softDeleteManyInpatients);
router.route('/admin/inpatients/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,InpatientsController.bulkInsertInpatients);
router.route('/admin/inpatients/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,InpatientsController.bulkUpdateInpatients);
router.route('/admin/inpatients/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,InpatientsController.deleteInpatients);
router.route('/admin/inpatients/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,InpatientsController.deleteManyInpatients);

module.exports = router;
