/**
 * index.js
 * @description :: exports all the models and its relationships among other models
 */

const dbConnection = require('../config/dbConnection');
const db = {};
db.sequelize = dbConnection;

db.PatientMedications = require('./PatientMedications');
db.PatientAllergies = require('./PatientAllergies');
db.Users = require('./Users');
db.FinancialManagements = require('./FinancialManagements');
db.Departments = require('./Departments');
db.Appointments = require('./Appointments');
db.Medications = require('./Medications');
db.Inpatients = require('./Inpatients');
db.Rooms = require('./Rooms');
db.Admissions = require('./Admissions');
db.Staffs = require('./Staffs');
db.Patients = require('./Patients');
db.user = require('./user');
db.userAuthSettings = require('./userAuthSettings');
db.userTokens = require('./userTokens');
db.activityLog = require('./activityLog');
db.role = require('./role');
db.projectRoute = require('./projectRoute');
db.routeRole = require('./routeRole');
db.userRole = require('./userRole');

db.FinancialManagements.belongsTo(db.Users, {
  foreignKey: 'added_by',
  as: '_added_by',
  targetKey: 'StaffID' 
});
db.Users.hasMany(db.FinancialManagements, {
  foreignKey: 'added_by',
  sourceKey: 'StaffID' 
});
db.FinancialManagements.belongsTo(db.Users, {
  foreignKey: 'updated_by',
  as: '_updated_by',
  targetKey: 'StaffID' 
});
db.Users.hasMany(db.FinancialManagements, {
  foreignKey: 'updated_by',
  sourceKey: 'StaffID' 
});
db.Departments.belongsTo(db.Users, {
  foreignKey: 'added_by',
  as: '_added_by',
  targetKey: 'StaffID' 
});
db.Users.hasMany(db.Departments, {
  foreignKey: 'added_by',
  sourceKey: 'StaffID' 
});
db.Departments.belongsTo(db.Users, {
  foreignKey: 'updated_by',
  as: '_updated_by',
  targetKey: 'StaffID' 
});
db.Users.hasMany(db.Departments, {
  foreignKey: 'updated_by',
  sourceKey: 'StaffID' 
});
db.Appointments.belongsTo(db.Users, {
  foreignKey: 'added_by',
  as: '_added_by',
  targetKey: 'StaffID' 
});
db.Users.hasMany(db.Appointments, {
  foreignKey: 'added_by',
  sourceKey: 'StaffID' 
});
db.Appointments.belongsTo(db.Users, {
  foreignKey: 'updated_by',
  as: '_updated_by',
  targetKey: 'StaffID' 
});
db.Users.hasMany(db.Appointments, {
  foreignKey: 'updated_by',
  sourceKey: 'StaffID' 
});
db.Inpatients.belongsTo(db.Users, {
  foreignKey: 'added_by',
  as: '_added_by',
  targetKey: 'StaffID' 
});
db.Users.hasMany(db.Inpatients, {
  foreignKey: 'added_by',
  sourceKey: 'StaffID' 
});
db.Inpatients.belongsTo(db.Users, {
  foreignKey: 'updated_by',
  as: '_updated_by',
  targetKey: 'StaffID' 
});
db.Users.hasMany(db.Inpatients, {
  foreignKey: 'updated_by',
  sourceKey: 'StaffID' 
});
db.Rooms.belongsTo(db.Users, {
  foreignKey: 'added_by',
  as: '_added_by',
  targetKey: 'StaffID' 
});
db.Users.hasMany(db.Rooms, {
  foreignKey: 'added_by',
  sourceKey: 'StaffID' 
});
db.Rooms.belongsTo(db.Users, {
  foreignKey: 'updated_by',
  as: '_updated_by',
  targetKey: 'StaffID' 
});
db.Users.hasMany(db.Rooms, {
  foreignKey: 'updated_by',
  sourceKey: 'StaffID' 
});
db.Admissions.belongsTo(db.Users, {
  foreignKey: 'added_by',
  as: '_added_by',
  targetKey: 'StaffID' 
});
db.Users.hasMany(db.Admissions, {
  foreignKey: 'added_by',
  sourceKey: 'StaffID' 
});
db.Admissions.belongsTo(db.Users, {
  foreignKey: 'updated_by',
  as: '_updated_by',
  targetKey: 'StaffID' 
});
db.Users.hasMany(db.Admissions, {
  foreignKey: 'updated_by',
  sourceKey: 'StaffID' 
});
db.Staffs.belongsTo(db.Users, {
  foreignKey: 'added_by',
  as: '_added_by',
  targetKey: 'StaffID' 
});
db.Users.hasMany(db.Staffs, {
  foreignKey: 'added_by',
  sourceKey: 'StaffID' 
});
db.Staffs.belongsTo(db.Users, {
  foreignKey: 'updated_by',
  as: '_updated_by',
  targetKey: 'StaffID' 
});
db.Users.hasMany(db.Staffs, {
  foreignKey: 'updated_by',
  sourceKey: 'StaffID' 
});
db.Patients.belongsTo(db.Users, {
  foreignKey: 'added_by',
  as: '_added_by',
  targetKey: 'StaffID' 
});
db.Users.hasMany(db.Patients, {
  foreignKey: 'added_by',
  sourceKey: 'StaffID' 
});
db.Patients.belongsTo(db.Users, {
  foreignKey: 'updated_by',
  as: '_updated_by',
  targetKey: 'StaffID' 
});
db.Users.hasMany(db.Patients, {
  foreignKey: 'updated_by',
  sourceKey: 'StaffID' 
});
db.Appointments.belongsTo(db.Departments, {
  foreignKey: 'DepartmentID',
  as: '_DepartmentID',
  targetKey: 'DepartmentID' 
});
db.Departments.hasMany(db.Appointments, {
  foreignKey: 'DepartmentID',
  sourceKey: 'DepartmentID' 
});
db.Staffs.belongsTo(db.Departments, {
  foreignKey: 'DepartmentID',
  as: '_DepartmentID',
  targetKey: 'DepartmentID' 
});
db.Departments.hasMany(db.Staffs, {
  foreignKey: 'DepartmentID',
  sourceKey: 'DepartmentID' 
});
db.PatientMedications.belongsTo(db.Medications, {
  foreignKey: 'MedicationID',
  as: '_MedicationID',
  targetKey: 'MedicationID' 
});
db.Medications.hasMany(db.PatientMedications, {
  foreignKey: 'MedicationID',
  sourceKey: 'MedicationID' 
});
db.Inpatients.belongsTo(db.Rooms, {
  foreignKey: 'RoomNumber',
  as: '_RoomNumber',
  targetKey: 'RoomNumber' 
});
db.Rooms.hasMany(db.Inpatients, {
  foreignKey: 'RoomNumber',
  sourceKey: 'RoomNumber' 
});
db.Admissions.belongsTo(db.Rooms, {
  foreignKey: 'RoomNumber',
  as: '_RoomNumber',
  targetKey: 'RoomNumber' 
});
db.Rooms.hasMany(db.Admissions, {
  foreignKey: 'RoomNumber',
  sourceKey: 'RoomNumber' 
});
db.Inpatients.belongsTo(db.Admissions, {
  foreignKey: 'AdmissionID',
  as: '_AdmissionID',
  targetKey: 'AdmissionID' 
});
db.Admissions.hasMany(db.Inpatients, {
  foreignKey: 'AdmissionID',
  sourceKey: 'AdmissionID' 
});
db.FinancialManagements.belongsTo(db.Staffs, {
  foreignKey: 'ResponsibleStaffID',
  as: '_ResponsibleStaffID',
  targetKey: 'StaffID' 
});
db.Staffs.hasMany(db.FinancialManagements, {
  foreignKey: 'ResponsibleStaffID',
  sourceKey: 'StaffID' 
});
db.Departments.belongsTo(db.Staffs, {
  foreignKey: 'Head',
  as: '_Head',
  targetKey: 'StaffID' 
});
db.Staffs.hasMany(db.Departments, {
  foreignKey: 'Head',
  sourceKey: 'StaffID' 
});
db.Appointments.belongsTo(db.Staffs, {
  foreignKey: 'StaffID',
  as: '_StaffID',
  targetKey: 'StaffID' 
});
db.Staffs.hasMany(db.Appointments, {
  foreignKey: 'StaffID',
  sourceKey: 'StaffID' 
});
db.Inpatients.belongsTo(db.Staffs, {
  foreignKey: 'ResponsibleStaffID',
  as: '_ResponsibleStaffID',
  targetKey: 'StaffID' 
});
db.Staffs.hasMany(db.Inpatients, {
  foreignKey: 'ResponsibleStaffID',
  sourceKey: 'StaffID' 
});
db.Rooms.belongsTo(db.Staffs, {
  foreignKey: 'AssignedNurseID',
  as: '_AssignedNurseID',
  targetKey: 'StaffID' 
});
db.Staffs.hasMany(db.Rooms, {
  foreignKey: 'AssignedNurseID',
  sourceKey: 'StaffID' 
});
db.Rooms.belongsTo(db.Staffs, {
  foreignKey: 'AssignedDoctorID',
  as: '_AssignedDoctorID',
  targetKey: 'StaffID' 
});
db.Staffs.hasOne(db.Rooms, {
  foreignKey: 'AssignedDoctorID',
  sourceKey: 'StaffID' 
});
db.PatientMedications.belongsTo(db.Patients, {
  foreignKey: 'PatientID',
  as: '_PatientID',
  targetKey: 'PatientID' 
});
db.Patients.hasMany(db.PatientMedications, {
  foreignKey: 'PatientID',
  sourceKey: 'PatientID' 
});
db.PatientAllergies.belongsTo(db.Patients, {
  foreignKey: 'PatientID',
  as: '_PatientID',
  targetKey: 'PatientID' 
});
db.Patients.hasMany(db.PatientAllergies, {
  foreignKey: 'PatientID',
  sourceKey: 'PatientID' 
});
db.FinancialManagements.belongsTo(db.Patients, {
  foreignKey: 'PatientID',
  as: '_PatientID',
  targetKey: 'PatientID' 
});
db.Patients.hasMany(db.FinancialManagements, {
  foreignKey: 'PatientID',
  sourceKey: 'PatientID' 
});
db.Appointments.belongsTo(db.Patients, {
  foreignKey: 'PatientID',
  as: '_PatientID',
  targetKey: 'PatientID' 
});
db.Patients.hasMany(db.Appointments, {
  foreignKey: 'PatientID',
  sourceKey: 'PatientID' 
});
db.Inpatients.belongsTo(db.Patients, {
  foreignKey: 'PatientID',
  as: '_PatientID',
  targetKey: 'PatientID' 
});
db.Patients.hasMany(db.Inpatients, {
  foreignKey: 'PatientID',
  sourceKey: 'PatientID' 
});
db.Admissions.belongsTo(db.Patients, {
  foreignKey: 'PatientID',
  as: '_PatientID',
  targetKey: 'PatientID' 
});
db.Patients.hasMany(db.Admissions, {
  foreignKey: 'PatientID',
  sourceKey: 'PatientID' 
});
db.user.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.user.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userRole, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.routeRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.userRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.projectRoute, {
  foreignKey: 'routeId',
  as: '_routeId',
  targetKey: 'id' 
});
db.projectRoute.hasMany(db.routeRole, {
  foreignKey: 'routeId',
  sourceKey: 'id' 
});

module.exports = db;