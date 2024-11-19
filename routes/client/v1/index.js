/**
 * index route file of client platform.
 * @description: exports all routes of client platform.
 */
const express =  require('express');
const router =  express.Router();
router.use('/client/auth',require('./auth'));
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
router.use(require('./uploadRoutes'));

module.exports = router;
