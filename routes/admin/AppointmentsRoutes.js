/**
 * AppointmentsRoutes.js
 * @description :: CRUD API routes for Appointments
 */

const express = require('express');
const router = express.Router();
const AppointmentsController = require('../../controller/admin/AppointmentsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/appointments/create').post(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentsController.addAppointments);
router.route('/admin/appointments/list').post(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentsController.findAllAppointments);
router.route('/admin/appointments/count').post(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentsController.getAppointmentsCount);
router.route('/admin/appointments/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentsController.getAppointments);
router.route('/admin/appointments/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentsController.updateAppointments);    
router.route('/admin/appointments/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentsController.partialUpdateAppointments);
router.route('/admin/appointments/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentsController.softDeleteAppointments);
router.route('/admin/appointments/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentsController.softDeleteManyAppointments);
router.route('/admin/appointments/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentsController.bulkInsertAppointments);
router.route('/admin/appointments/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentsController.bulkUpdateAppointments);
router.route('/admin/appointments/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentsController.deleteAppointments);
router.route('/admin/appointments/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentsController.deleteManyAppointments);

module.exports = router;
