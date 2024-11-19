/**
 * index route file of admin platform.
 * @description: exports all routes of admin platform.
 */
const express =  require('express');
const router =  express.Router();
router.use('/admin/auth',require('./auth'));
router.use(require('./PatientMedicationsRoutes'));
router.use(require('./PatientAllergiesRoutes'));
router.use(require('./UsersRoutes'));
router.use(require('./FinancialManagementsRoutes'));
router.use(require('./DepartmentsRoutes'));
router.use(require('./AppointmentsRoutes'));
router.use(require('./MedicationsRoutes'));
router.use(require('./InpatientsRoutes'));
router.use(require('./RoomsRoutes'));
router.use(require('./AdmissionsRoutes'));
router.use(require('./StaffsRoutes'));
router.use(require('./PatientsRoutes'));
router.use(require('./userRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
