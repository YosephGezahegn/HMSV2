/**
 * FinancialManagementsRoutes.js
 * @description :: CRUD API routes for FinancialManagements
 */

const express = require('express');
const router = express.Router();
const FinancialManagementsController = require('../../../controller/device/v1/FinancialManagementsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/financialmanagements/create').post(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementsController.addFinancialManagements);
router.route('/device/api/v1/financialmanagements/list').post(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementsController.findAllFinancialManagements);
router.route('/device/api/v1/financialmanagements/count').post(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementsController.getFinancialManagementsCount);
router.route('/device/api/v1/financialmanagements/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementsController.getFinancialManagements);
router.route('/device/api/v1/financialmanagements/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementsController.updateFinancialManagements);    
router.route('/device/api/v1/financialmanagements/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementsController.partialUpdateFinancialManagements);
router.route('/device/api/v1/financialmanagements/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementsController.softDeleteFinancialManagements);
router.route('/device/api/v1/financialmanagements/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementsController.softDeleteManyFinancialManagements);
router.route('/device/api/v1/financialmanagements/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementsController.bulkInsertFinancialManagements);
router.route('/device/api/v1/financialmanagements/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementsController.bulkUpdateFinancialManagements);
router.route('/device/api/v1/financialmanagements/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementsController.deleteFinancialManagements);
router.route('/device/api/v1/financialmanagements/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementsController.deleteManyFinancialManagements);

module.exports = router;
