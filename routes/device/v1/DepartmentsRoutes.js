/**
 * DepartmentsRoutes.js
 * @description :: CRUD API routes for Departments
 */

const express = require('express');
const router = express.Router();
const DepartmentsController = require('../../../controller/device/v1/DepartmentsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/departments/create').post(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentsController.addDepartments);
router.route('/device/api/v1/departments/list').post(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentsController.findAllDepartments);
router.route('/device/api/v1/departments/count').post(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentsController.getDepartmentsCount);
router.route('/device/api/v1/departments/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentsController.getDepartments);
router.route('/device/api/v1/departments/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentsController.updateDepartments);    
router.route('/device/api/v1/departments/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentsController.partialUpdateDepartments);
router.route('/device/api/v1/departments/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentsController.softDeleteDepartments);
router.route('/device/api/v1/departments/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentsController.softDeleteManyDepartments);
router.route('/device/api/v1/departments/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentsController.bulkInsertDepartments);
router.route('/device/api/v1/departments/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentsController.bulkUpdateDepartments);
router.route('/device/api/v1/departments/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentsController.deleteDepartments);
router.route('/device/api/v1/departments/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentsController.deleteManyDepartments);

module.exports = router;
