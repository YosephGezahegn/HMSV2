/**
 * FinancialManagementsRoutes.js
 * @description :: CRUD API routes for FinancialManagements
 */

const express = require('express');
const router = express.Router();
const FinancialManagementsController = require('../../controller/admin/FinancialManagementsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/financialmanagements/create').post(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementsController.addFinancialManagements);
router.route('/admin/financialmanagements/list').post(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementsController.findAllFinancialManagements);
router.route('/admin/financialmanagements/count').post(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementsController.getFinancialManagementsCount);
router.route('/admin/financialmanagements/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementsController.getFinancialManagements);
router.route('/admin/financialmanagements/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementsController.updateFinancialManagements);    
router.route('/admin/financialmanagements/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementsController.partialUpdateFinancialManagements);
router.route('/admin/financialmanagements/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementsController.softDeleteFinancialManagements);
router.route('/admin/financialmanagements/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementsController.softDeleteManyFinancialManagements);
router.route('/admin/financialmanagements/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementsController.bulkInsertFinancialManagements);
router.route('/admin/financialmanagements/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementsController.bulkUpdateFinancialManagements);
router.route('/admin/financialmanagements/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementsController.deleteFinancialManagements);
router.route('/admin/financialmanagements/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementsController.deleteManyFinancialManagements);

module.exports = router;
