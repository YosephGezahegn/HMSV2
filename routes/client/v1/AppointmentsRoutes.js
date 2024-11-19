/**
 * AppointmentsRoutes.js
 * @description :: CRUD API routes for Appointments
 */

const express = require('express');
const router = express.Router();
const AppointmentsController = require('../../../controller/client/v1/AppointmentsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/appointments/create').post(auth(PLATFORM.CLIENT),checkRolePermission,AppointmentsController.addAppointments);
router.route('/client/api/v1/appointments/list').post(auth(PLATFORM.CLIENT),checkRolePermission,AppointmentsController.findAllAppointments);
router.route('/client/api/v1/appointments/count').post(auth(PLATFORM.CLIENT),checkRolePermission,AppointmentsController.getAppointmentsCount);
router.route('/client/api/v1/appointments/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,AppointmentsController.getAppointments);
router.route('/client/api/v1/appointments/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,AppointmentsController.updateAppointments);    
router.route('/client/api/v1/appointments/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,AppointmentsController.partialUpdateAppointments);
router.route('/client/api/v1/appointments/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,AppointmentsController.softDeleteAppointments);
router.route('/client/api/v1/appointments/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,AppointmentsController.softDeleteManyAppointments);
router.route('/client/api/v1/appointments/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,AppointmentsController.bulkInsertAppointments);
router.route('/client/api/v1/appointments/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,AppointmentsController.bulkUpdateAppointments);
router.route('/client/api/v1/appointments/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,AppointmentsController.deleteAppointments);
router.route('/client/api/v1/appointments/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,AppointmentsController.deleteManyAppointments);

module.exports = router;
