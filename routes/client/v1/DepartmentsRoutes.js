/**
 * DepartmentsRoutes.js
 * @description :: CRUD API routes for Departments
 */

const express = require('express');
const router = express.Router();
const DepartmentsController = require('../../../controller/client/v1/DepartmentsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/departments/create').post(auth(PLATFORM.CLIENT),checkRolePermission,DepartmentsController.addDepartments);
router.route('/client/api/v1/departments/list').post(auth(PLATFORM.CLIENT),checkRolePermission,DepartmentsController.findAllDepartments);
router.route('/client/api/v1/departments/count').post(auth(PLATFORM.CLIENT),checkRolePermission,DepartmentsController.getDepartmentsCount);
router.route('/client/api/v1/departments/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,DepartmentsController.getDepartments);
router.route('/client/api/v1/departments/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,DepartmentsController.updateDepartments);    
router.route('/client/api/v1/departments/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,DepartmentsController.partialUpdateDepartments);
router.route('/client/api/v1/departments/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,DepartmentsController.softDeleteDepartments);
router.route('/client/api/v1/departments/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,DepartmentsController.softDeleteManyDepartments);
router.route('/client/api/v1/departments/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,DepartmentsController.bulkInsertDepartments);
router.route('/client/api/v1/departments/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,DepartmentsController.bulkUpdateDepartments);
router.route('/client/api/v1/departments/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,DepartmentsController.deleteDepartments);
router.route('/client/api/v1/departments/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,DepartmentsController.deleteManyDepartments);

module.exports = router;
