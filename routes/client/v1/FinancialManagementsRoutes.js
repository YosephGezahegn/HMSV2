/**
 * FinancialManagementsRoutes.js
 * @description :: CRUD API routes for FinancialManagements
 */

const express = require('express');
const router = express.Router();
const FinancialManagementsController = require('../../../controller/client/v1/FinancialManagementsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/financialmanagements/create').post(auth(PLATFORM.CLIENT),checkRolePermission,FinancialManagementsController.addFinancialManagements);
router.route('/client/api/v1/financialmanagements/list').post(auth(PLATFORM.CLIENT),checkRolePermission,FinancialManagementsController.findAllFinancialManagements);
router.route('/client/api/v1/financialmanagements/count').post(auth(PLATFORM.CLIENT),checkRolePermission,FinancialManagementsController.getFinancialManagementsCount);
router.route('/client/api/v1/financialmanagements/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,FinancialManagementsController.getFinancialManagements);
router.route('/client/api/v1/financialmanagements/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,FinancialManagementsController.updateFinancialManagements);    
router.route('/client/api/v1/financialmanagements/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,FinancialManagementsController.partialUpdateFinancialManagements);
router.route('/client/api/v1/financialmanagements/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,FinancialManagementsController.softDeleteFinancialManagements);
router.route('/client/api/v1/financialmanagements/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,FinancialManagementsController.softDeleteManyFinancialManagements);
router.route('/client/api/v1/financialmanagements/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,FinancialManagementsController.bulkInsertFinancialManagements);
router.route('/client/api/v1/financialmanagements/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,FinancialManagementsController.bulkUpdateFinancialManagements);
router.route('/client/api/v1/financialmanagements/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,FinancialManagementsController.deleteFinancialManagements);
router.route('/client/api/v1/financialmanagements/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,FinancialManagementsController.deleteManyFinancialManagements);

module.exports = router;
