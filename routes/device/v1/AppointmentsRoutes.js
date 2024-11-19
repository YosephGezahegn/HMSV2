/**
 * AppointmentsRoutes.js
 * @description :: CRUD API routes for Appointments
 */

const express = require('express');
const router = express.Router();
const AppointmentsController = require('../../../controller/device/v1/AppointmentsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/appointments/create').post(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentsController.addAppointments);
router.route('/device/api/v1/appointments/list').post(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentsController.findAllAppointments);
router.route('/device/api/v1/appointments/count').post(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentsController.getAppointmentsCount);
router.route('/device/api/v1/appointments/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentsController.getAppointments);
router.route('/device/api/v1/appointments/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentsController.updateAppointments);    
router.route('/device/api/v1/appointments/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentsController.partialUpdateAppointments);
router.route('/device/api/v1/appointments/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentsController.softDeleteAppointments);
router.route('/device/api/v1/appointments/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentsController.softDeleteManyAppointments);
router.route('/device/api/v1/appointments/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentsController.bulkInsertAppointments);
router.route('/device/api/v1/appointments/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentsController.bulkUpdateAppointments);
router.route('/device/api/v1/appointments/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentsController.deleteAppointments);
router.route('/device/api/v1/appointments/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentsController.deleteManyAppointments);

module.exports = router;
