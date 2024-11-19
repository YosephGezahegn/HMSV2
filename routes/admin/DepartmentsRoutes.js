/**
 * DepartmentsRoutes.js
 * @description :: CRUD API routes for Departments
 */

const express = require('express');
const router = express.Router();
const DepartmentsController = require('../../controller/admin/DepartmentsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/departments/create').post(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentsController.addDepartments);
router.route('/admin/departments/list').post(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentsController.findAllDepartments);
router.route('/admin/departments/count').post(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentsController.getDepartmentsCount);
router.route('/admin/departments/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentsController.getDepartments);
router.route('/admin/departments/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentsController.updateDepartments);    
router.route('/admin/departments/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentsController.partialUpdateDepartments);
router.route('/admin/departments/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentsController.softDeleteDepartments);
router.route('/admin/departments/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentsController.softDeleteManyDepartments);
router.route('/admin/departments/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentsController.bulkInsertDepartments);
router.route('/admin/departments/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentsController.bulkUpdateDepartments);
router.route('/admin/departments/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentsController.deleteDepartments);
router.route('/admin/departments/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentsController.deleteManyDepartments);

module.exports = router;
