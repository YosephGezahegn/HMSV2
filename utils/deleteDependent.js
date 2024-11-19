/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let PatientMedications = require('../model/PatientMedications');
let PatientAllergies = require('../model/PatientAllergies');
let Users = require('../model/Users');
let FinancialManagements = require('../model/FinancialManagements');
let Departments = require('../model/Departments');
let Appointments = require('../model/Appointments');
let Medications = require('../model/Medications');
let Inpatients = require('../model/Inpatients');
let Rooms = require('../model/Rooms');
let Admissions = require('../model/Admissions');
let Staffs = require('../model/Staffs');
let Patients = require('../model/Patients');
let User = require('../model/user');
let UserAuthSettings = require('../model/userAuthSettings');
let UserTokens = require('../model/userTokens');
let ActivityLog = require('../model/activityLog');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deletePatientMedications = async (filter) =>{
  try {
    let response  = await dbService.destroy(PatientMedications,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePatientAllergies = async (filter) =>{
  try {
    let response  = await dbService.destroy(PatientAllergies,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUsers = async (filter) =>{
  try {
    let users = await dbService.findAll(Users,filter);
    if (users && users.length){
      users = users.map((obj) => obj.id);

      const FinancialManagementsFilter = { $or: [{ added_by : { $in : users } },{ updated_by : { $in : users } }] };
      const FinancialManagementsCnt = await dbService.destroy(FinancialManagements,FinancialManagementsFilter);

      const DepartmentsFilter = { $or: [{ added_by : { $in : users } },{ updated_by : { $in : users } }] };
      const DepartmentsCnt = await dbService.destroy(Departments,DepartmentsFilter);

      const AppointmentsFilter = { $or: [{ added_by : { $in : users } },{ updated_by : { $in : users } }] };
      const AppointmentsCnt = await dbService.destroy(Appointments,AppointmentsFilter);

      const InpatientsFilter = { $or: [{ added_by : { $in : users } },{ updated_by : { $in : users } }] };
      const InpatientsCnt = await dbService.destroy(Inpatients,InpatientsFilter);

      const RoomsFilter = { $or: [{ added_by : { $in : users } },{ updated_by : { $in : users } }] };
      const RoomsCnt = await dbService.destroy(Rooms,RoomsFilter);

      const AdmissionsFilter = { $or: [{ added_by : { $in : users } },{ updated_by : { $in : users } }] };
      const AdmissionsCnt = await dbService.destroy(Admissions,AdmissionsFilter);

      const StaffsFilter = { $or: [{ added_by : { $in : users } },{ updated_by : { $in : users } }] };
      const StaffsCnt = await dbService.destroy(Staffs,StaffsFilter);

      const PatientsFilter = { $or: [{ added_by : { $in : users } },{ updated_by : { $in : users } }] };
      const PatientsCnt = await dbService.destroy(Patients,PatientsFilter);

      let deleted  = await dbService.destroy(Users,filter);
      let response = {
        FinancialManagements :FinancialManagementsCnt.length,
        Departments :DepartmentsCnt.length,
        Appointments :AppointmentsCnt.length,
        Inpatients :InpatientsCnt.length,
        Rooms :RoomsCnt.length,
        Admissions :AdmissionsCnt.length,
        Staffs :StaffsCnt.length,
        Patients :PatientsCnt.length,
      };
      return response; 
    } else {
      return {  users : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteFinancialManagements = async (filter) =>{
  try {
    let response  = await dbService.destroy(FinancialManagements,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteDepartments = async (filter) =>{
  try {
    let departments = await dbService.findAll(Departments,filter);
    if (departments && departments.length){
      departments = departments.map((obj) => obj.id);

      const AppointmentsFilter = { $or: [{ DepartmentID : { $in : departments } }] };
      const AppointmentsCnt = await dbService.destroy(Appointments,AppointmentsFilter);

      const StaffsFilter = { $or: [{ DepartmentID : { $in : departments } }] };
      const StaffsCnt = await dbService.destroy(Staffs,StaffsFilter);

      let deleted  = await dbService.destroy(Departments,filter);
      let response = {
        Appointments :AppointmentsCnt.length,
        Staffs :StaffsCnt.length,
      };
      return response; 
    } else {
      return {  departments : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAppointments = async (filter) =>{
  try {
    let response  = await dbService.destroy(Appointments,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMedications = async (filter) =>{
  try {
    let medications = await dbService.findAll(Medications,filter);
    if (medications && medications.length){
      medications = medications.map((obj) => obj.id);

      const PatientMedicationsFilter = { $or: [{ MedicationID : { $in : medications } }] };
      const PatientMedicationsCnt = await dbService.destroy(PatientMedications,PatientMedicationsFilter);

      let deleted  = await dbService.destroy(Medications,filter);
      let response = { PatientMedications :PatientMedicationsCnt.length, };
      return response; 
    } else {
      return {  medications : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteInpatients = async (filter) =>{
  try {
    let response  = await dbService.destroy(Inpatients,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRooms = async (filter) =>{
  try {
    let rooms = await dbService.findAll(Rooms,filter);
    if (rooms && rooms.length){
      rooms = rooms.map((obj) => obj.id);

      const InpatientsFilter = { $or: [{ RoomNumber : { $in : rooms } }] };
      const InpatientsCnt = await dbService.destroy(Inpatients,InpatientsFilter);

      const AdmissionsFilter = { $or: [{ RoomNumber : { $in : rooms } }] };
      const AdmissionsCnt = await dbService.destroy(Admissions,AdmissionsFilter);

      let deleted  = await dbService.destroy(Rooms,filter);
      let response = {
        Inpatients :InpatientsCnt.length,
        Admissions :AdmissionsCnt.length,
      };
      return response; 
    } else {
      return {  rooms : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAdmissions = async (filter) =>{
  try {
    let admissions = await dbService.findAll(Admissions,filter);
    if (admissions && admissions.length){
      admissions = admissions.map((obj) => obj.id);

      const InpatientsFilter = { $or: [{ AdmissionID : { $in : admissions } }] };
      const InpatientsCnt = await dbService.destroy(Inpatients,InpatientsFilter);

      let deleted  = await dbService.destroy(Admissions,filter);
      let response = { Inpatients :InpatientsCnt.length, };
      return response; 
    } else {
      return {  admissions : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteStaffs = async (filter) =>{
  try {
    let staffs = await dbService.findAll(Staffs,filter);
    if (staffs && staffs.length){
      staffs = staffs.map((obj) => obj.id);

      const FinancialManagementsFilter = { $or: [{ ResponsibleStaffID : { $in : staffs } }] };
      const FinancialManagementsCnt = await dbService.destroy(FinancialManagements,FinancialManagementsFilter);

      const DepartmentsFilter = { $or: [{ Head : { $in : staffs } }] };
      const DepartmentsCnt = await dbService.destroy(Departments,DepartmentsFilter);

      const AppointmentsFilter = { $or: [{ StaffID : { $in : staffs } }] };
      const AppointmentsCnt = await dbService.destroy(Appointments,AppointmentsFilter);

      const InpatientsFilter = { $or: [{ ResponsibleStaffID : { $in : staffs } }] };
      const InpatientsCnt = await dbService.destroy(Inpatients,InpatientsFilter);

      const RoomsFilter = { $or: [{ AssignedNurseID : { $in : staffs } },{ AssignedDoctorID : { $in : staffs } }] };
      const RoomsCnt = await dbService.destroy(Rooms,RoomsFilter);

      let deleted  = await dbService.destroy(Staffs,filter);
      let response = {
        FinancialManagements :FinancialManagementsCnt.length,
        Departments :DepartmentsCnt.length,
        Appointments :AppointmentsCnt.length,
        Inpatients :InpatientsCnt.length,
        Rooms :RoomsCnt.length,
      };
      return response; 
    } else {
      return {  staffs : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deletePatients = async (filter) =>{
  try {
    let patients = await dbService.findAll(Patients,filter);
    if (patients && patients.length){
      patients = patients.map((obj) => obj.id);

      const PatientMedicationsFilter = { $or: [{ PatientID : { $in : patients } }] };
      const PatientMedicationsCnt = await dbService.destroy(PatientMedications,PatientMedicationsFilter);

      const PatientAllergiesFilter = { $or: [{ PatientID : { $in : patients } }] };
      const PatientAllergiesCnt = await dbService.destroy(PatientAllergies,PatientAllergiesFilter);

      const FinancialManagementsFilter = { $or: [{ PatientID : { $in : patients } }] };
      const FinancialManagementsCnt = await dbService.destroy(FinancialManagements,FinancialManagementsFilter);

      const AppointmentsFilter = { $or: [{ PatientID : { $in : patients } }] };
      const AppointmentsCnt = await dbService.destroy(Appointments,AppointmentsFilter);

      const InpatientsFilter = { $or: [{ PatientID : { $in : patients } }] };
      const InpatientsCnt = await dbService.destroy(Inpatients,InpatientsFilter);

      const AdmissionsFilter = { $or: [{ PatientID : { $in : patients } }] };
      const AdmissionsCnt = await dbService.destroy(Admissions,AdmissionsFilter);

      let deleted  = await dbService.destroy(Patients,filter);
      let response = {
        PatientMedications :PatientMedicationsCnt.length,
        PatientAllergies :PatientAllergiesCnt.length,
        FinancialManagements :FinancialManagementsCnt.length,
        Appointments :AppointmentsCnt.length,
        Inpatients :InpatientsCnt.length,
        Admissions :AdmissionsCnt.length,
      };
      return response; 
    } else {
      return {  patients : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.destroy(User,userFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt = await dbService.destroy(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.destroy(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(User,filter);
      let response = {
        user :userCnt.length + deleted.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserAuthSettings = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserAuthSettings,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteActivityLog = async (filter) =>{
  try {
    let response  = await dbService.destroy(ActivityLog,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(Role,filter);
      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      let deleted  = await dbService.destroy(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt.length, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countPatientMedications = async (filter) =>{
  try {
    const PatientMedicationsCnt =  await dbService.count(PatientMedications,filter);
    return { PatientMedications : PatientMedicationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPatientAllergies = async (filter) =>{
  try {
    const PatientAllergiesCnt =  await dbService.count(PatientAllergies,filter);
    return { PatientAllergies : PatientAllergiesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUsers = async (filter) =>{
  try {
    let users = await dbService.findAll(Users,filter);
    if (users && users.length){
      users = users.map((obj) => obj.id);

      const FinancialManagementsFilter = { $or: [{ added_by : { $in : users } },{ updated_by : { $in : users } }] };
      const FinancialManagementsCnt =  await dbService.count(FinancialManagements,FinancialManagementsFilter);

      const DepartmentsFilter = { $or: [{ added_by : { $in : users } },{ updated_by : { $in : users } }] };
      const DepartmentsCnt =  await dbService.count(Departments,DepartmentsFilter);

      const AppointmentsFilter = { $or: [{ added_by : { $in : users } },{ updated_by : { $in : users } }] };
      const AppointmentsCnt =  await dbService.count(Appointments,AppointmentsFilter);

      const InpatientsFilter = { $or: [{ added_by : { $in : users } },{ updated_by : { $in : users } }] };
      const InpatientsCnt =  await dbService.count(Inpatients,InpatientsFilter);

      const RoomsFilter = { $or: [{ added_by : { $in : users } },{ updated_by : { $in : users } }] };
      const RoomsCnt =  await dbService.count(Rooms,RoomsFilter);

      const AdmissionsFilter = { $or: [{ added_by : { $in : users } },{ updated_by : { $in : users } }] };
      const AdmissionsCnt =  await dbService.count(Admissions,AdmissionsFilter);

      const StaffsFilter = { $or: [{ added_by : { $in : users } },{ updated_by : { $in : users } }] };
      const StaffsCnt =  await dbService.count(Staffs,StaffsFilter);

      const PatientsFilter = { $or: [{ added_by : { $in : users } },{ updated_by : { $in : users } }] };
      const PatientsCnt =  await dbService.count(Patients,PatientsFilter);

      let response = {
        FinancialManagements : FinancialManagementsCnt,
        Departments : DepartmentsCnt,
        Appointments : AppointmentsCnt,
        Inpatients : InpatientsCnt,
        Rooms : RoomsCnt,
        Admissions : AdmissionsCnt,
        Staffs : StaffsCnt,
        Patients : PatientsCnt,
      };
      return response; 
    } else {
      return {  users : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countFinancialManagements = async (filter) =>{
  try {
    const FinancialManagementsCnt =  await dbService.count(FinancialManagements,filter);
    return { FinancialManagements : FinancialManagementsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countDepartments = async (filter) =>{
  try {
    let departments = await dbService.findAll(Departments,filter);
    if (departments && departments.length){
      departments = departments.map((obj) => obj.id);

      const AppointmentsFilter = { $or: [{ DepartmentID : { $in : departments } }] };
      const AppointmentsCnt =  await dbService.count(Appointments,AppointmentsFilter);

      const StaffsFilter = { $or: [{ DepartmentID : { $in : departments } }] };
      const StaffsCnt =  await dbService.count(Staffs,StaffsFilter);

      let response = {
        Appointments : AppointmentsCnt,
        Staffs : StaffsCnt,
      };
      return response; 
    } else {
      return {  departments : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countAppointments = async (filter) =>{
  try {
    const AppointmentsCnt =  await dbService.count(Appointments,filter);
    return { Appointments : AppointmentsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countMedications = async (filter) =>{
  try {
    let medications = await dbService.findAll(Medications,filter);
    if (medications && medications.length){
      medications = medications.map((obj) => obj.id);

      const PatientMedicationsFilter = { $or: [{ MedicationID : { $in : medications } }] };
      const PatientMedicationsCnt =  await dbService.count(PatientMedications,PatientMedicationsFilter);

      let response = { PatientMedications : PatientMedicationsCnt, };
      return response; 
    } else {
      return {  medications : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countInpatients = async (filter) =>{
  try {
    const InpatientsCnt =  await dbService.count(Inpatients,filter);
    return { Inpatients : InpatientsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRooms = async (filter) =>{
  try {
    let rooms = await dbService.findAll(Rooms,filter);
    if (rooms && rooms.length){
      rooms = rooms.map((obj) => obj.id);

      const InpatientsFilter = { $or: [{ RoomNumber : { $in : rooms } }] };
      const InpatientsCnt =  await dbService.count(Inpatients,InpatientsFilter);

      const AdmissionsFilter = { $or: [{ RoomNumber : { $in : rooms } }] };
      const AdmissionsCnt =  await dbService.count(Admissions,AdmissionsFilter);

      let response = {
        Inpatients : InpatientsCnt,
        Admissions : AdmissionsCnt,
      };
      return response; 
    } else {
      return {  rooms : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countAdmissions = async (filter) =>{
  try {
    let admissions = await dbService.findAll(Admissions,filter);
    if (admissions && admissions.length){
      admissions = admissions.map((obj) => obj.id);

      const InpatientsFilter = { $or: [{ AdmissionID : { $in : admissions } }] };
      const InpatientsCnt =  await dbService.count(Inpatients,InpatientsFilter);

      let response = { Inpatients : InpatientsCnt, };
      return response; 
    } else {
      return {  admissions : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countStaffs = async (filter) =>{
  try {
    let staffs = await dbService.findAll(Staffs,filter);
    if (staffs && staffs.length){
      staffs = staffs.map((obj) => obj.id);

      const FinancialManagementsFilter = { $or: [{ ResponsibleStaffID : { $in : staffs } }] };
      const FinancialManagementsCnt =  await dbService.count(FinancialManagements,FinancialManagementsFilter);

      const DepartmentsFilter = { $or: [{ Head : { $in : staffs } }] };
      const DepartmentsCnt =  await dbService.count(Departments,DepartmentsFilter);

      const AppointmentsFilter = { $or: [{ StaffID : { $in : staffs } }] };
      const AppointmentsCnt =  await dbService.count(Appointments,AppointmentsFilter);

      const InpatientsFilter = { $or: [{ ResponsibleStaffID : { $in : staffs } }] };
      const InpatientsCnt =  await dbService.count(Inpatients,InpatientsFilter);

      const RoomsFilter = { $or: [{ AssignedNurseID : { $in : staffs } },{ AssignedDoctorID : { $in : staffs } }] };
      const RoomsCnt =  await dbService.count(Rooms,RoomsFilter);

      let response = {
        FinancialManagements : FinancialManagementsCnt,
        Departments : DepartmentsCnt,
        Appointments : AppointmentsCnt,
        Inpatients : InpatientsCnt,
        Rooms : RoomsCnt,
      };
      return response; 
    } else {
      return {  staffs : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countPatients = async (filter) =>{
  try {
    let patients = await dbService.findAll(Patients,filter);
    if (patients && patients.length){
      patients = patients.map((obj) => obj.id);

      const PatientMedicationsFilter = { $or: [{ PatientID : { $in : patients } }] };
      const PatientMedicationsCnt =  await dbService.count(PatientMedications,PatientMedicationsFilter);

      const PatientAllergiesFilter = { $or: [{ PatientID : { $in : patients } }] };
      const PatientAllergiesCnt =  await dbService.count(PatientAllergies,PatientAllergiesFilter);

      const FinancialManagementsFilter = { $or: [{ PatientID : { $in : patients } }] };
      const FinancialManagementsCnt =  await dbService.count(FinancialManagements,FinancialManagementsFilter);

      const AppointmentsFilter = { $or: [{ PatientID : { $in : patients } }] };
      const AppointmentsCnt =  await dbService.count(Appointments,AppointmentsFilter);

      const InpatientsFilter = { $or: [{ PatientID : { $in : patients } }] };
      const InpatientsCnt =  await dbService.count(Inpatients,InpatientsFilter);

      const AdmissionsFilter = { $or: [{ PatientID : { $in : patients } }] };
      const AdmissionsCnt =  await dbService.count(Admissions,AdmissionsFilter);

      let response = {
        PatientMedications : PatientMedicationsCnt,
        PatientAllergies : PatientAllergiesCnt,
        FinancialManagements : FinancialManagementsCnt,
        Appointments : AppointmentsCnt,
        Inpatients : InpatientsCnt,
        Admissions : AdmissionsCnt,
      };
      return response; 
    } else {
      return {  patients : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        user : userCnt,
        userAuthSettings : userAuthSettingsCnt,
        userTokens : userTokensCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserAuthSettings = async (filter) =>{
  try {
    const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countActivityLog = async (filter) =>{
  try {
    const activityLogCnt =  await dbService.count(ActivityLog,filter);
    return { activityLog : activityLogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePatientMedications = async (filter,updateBody) =>{  
  try {
    const PatientMedicationsCnt =  await dbService.update(PatientMedications,filter);
    return { PatientMedications : PatientMedicationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePatientAllergies = async (filter,updateBody) =>{  
  try {
    const PatientAllergiesCnt =  await dbService.update(PatientAllergies,filter);
    return { PatientAllergies : PatientAllergiesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUsers = async (filter,updateBody) =>{  
  try {
    let users = await dbService.findAll(Users,filter, { id:1 });
    if (users.length){
      users = users.map((obj) => obj.id);

      const FinancialManagementsFilter = { '$or': [{ added_by : { '$in' : users } },{ updated_by : { '$in' : users } }] };
      const FinancialManagementsCnt = await dbService.update(FinancialManagements,FinancialManagementsFilter,updateBody);

      const DepartmentsFilter = { '$or': [{ added_by : { '$in' : users } },{ updated_by : { '$in' : users } }] };
      const DepartmentsCnt = await dbService.update(Departments,DepartmentsFilter,updateBody);

      const AppointmentsFilter = { '$or': [{ added_by : { '$in' : users } },{ updated_by : { '$in' : users } }] };
      const AppointmentsCnt = await dbService.update(Appointments,AppointmentsFilter,updateBody);

      const InpatientsFilter = { '$or': [{ added_by : { '$in' : users } },{ updated_by : { '$in' : users } }] };
      const InpatientsCnt = await dbService.update(Inpatients,InpatientsFilter,updateBody);

      const RoomsFilter = { '$or': [{ added_by : { '$in' : users } },{ updated_by : { '$in' : users } }] };
      const RoomsCnt = await dbService.update(Rooms,RoomsFilter,updateBody);

      const AdmissionsFilter = { '$or': [{ added_by : { '$in' : users } },{ updated_by : { '$in' : users } }] };
      const AdmissionsCnt = await dbService.update(Admissions,AdmissionsFilter,updateBody);

      const StaffsFilter = { '$or': [{ added_by : { '$in' : users } },{ updated_by : { '$in' : users } }] };
      const StaffsCnt = await dbService.update(Staffs,StaffsFilter,updateBody);

      const PatientsFilter = { '$or': [{ added_by : { '$in' : users } },{ updated_by : { '$in' : users } }] };
      const PatientsCnt = await dbService.update(Patients,PatientsFilter,updateBody);
      let updated = await dbService.update(Users,filter,updateBody);

      let response = {
        FinancialManagements :FinancialManagementsCnt.length,
        Departments :DepartmentsCnt.length,
        Appointments :AppointmentsCnt.length,
        Inpatients :InpatientsCnt.length,
        Rooms :RoomsCnt.length,
        Admissions :AdmissionsCnt.length,
        Staffs :StaffsCnt.length,
        Patients :PatientsCnt.length,
      };
      return response;
    } else {
      return {  users : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteFinancialManagements = async (filter,updateBody) =>{  
  try {
    const FinancialManagementsCnt =  await dbService.update(FinancialManagements,filter);
    return { FinancialManagements : FinancialManagementsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteDepartments = async (filter,updateBody) =>{  
  try {
    let departments = await dbService.findAll(Departments,filter, { id:1 });
    if (departments.length){
      departments = departments.map((obj) => obj.id);

      const AppointmentsFilter = { '$or': [{ DepartmentID : { '$in' : departments } }] };
      const AppointmentsCnt = await dbService.update(Appointments,AppointmentsFilter,updateBody);

      const StaffsFilter = { '$or': [{ DepartmentID : { '$in' : departments } }] };
      const StaffsCnt = await dbService.update(Staffs,StaffsFilter,updateBody);
      let updated = await dbService.update(Departments,filter,updateBody);

      let response = {
        Appointments :AppointmentsCnt.length,
        Staffs :StaffsCnt.length,
      };
      return response;
    } else {
      return {  departments : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAppointments = async (filter,updateBody) =>{  
  try {
    const AppointmentsCnt =  await dbService.update(Appointments,filter);
    return { Appointments : AppointmentsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMedications = async (filter,updateBody) =>{  
  try {
    let medications = await dbService.findAll(Medications,filter, { id:1 });
    if (medications.length){
      medications = medications.map((obj) => obj.id);

      const PatientMedicationsFilter = { '$or': [{ MedicationID : { '$in' : medications } }] };
      const PatientMedicationsCnt = await dbService.update(PatientMedications,PatientMedicationsFilter,updateBody);
      let updated = await dbService.update(Medications,filter,updateBody);

      let response = { PatientMedications :PatientMedicationsCnt.length, };
      return response;
    } else {
      return {  medications : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteInpatients = async (filter,updateBody) =>{  
  try {
    const InpatientsCnt =  await dbService.update(Inpatients,filter);
    return { Inpatients : InpatientsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRooms = async (filter,updateBody) =>{  
  try {
    let rooms = await dbService.findAll(Rooms,filter, { id:1 });
    if (rooms.length){
      rooms = rooms.map((obj) => obj.id);

      const InpatientsFilter = { '$or': [{ RoomNumber : { '$in' : rooms } }] };
      const InpatientsCnt = await dbService.update(Inpatients,InpatientsFilter,updateBody);

      const AdmissionsFilter = { '$or': [{ RoomNumber : { '$in' : rooms } }] };
      const AdmissionsCnt = await dbService.update(Admissions,AdmissionsFilter,updateBody);
      let updated = await dbService.update(Rooms,filter,updateBody);

      let response = {
        Inpatients :InpatientsCnt.length,
        Admissions :AdmissionsCnt.length,
      };
      return response;
    } else {
      return {  rooms : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAdmissions = async (filter,updateBody) =>{  
  try {
    let admissions = await dbService.findAll(Admissions,filter, { id:1 });
    if (admissions.length){
      admissions = admissions.map((obj) => obj.id);

      const InpatientsFilter = { '$or': [{ AdmissionID : { '$in' : admissions } }] };
      const InpatientsCnt = await dbService.update(Inpatients,InpatientsFilter,updateBody);
      let updated = await dbService.update(Admissions,filter,updateBody);

      let response = { Inpatients :InpatientsCnt.length, };
      return response;
    } else {
      return {  admissions : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteStaffs = async (filter,updateBody) =>{  
  try {
    let staffs = await dbService.findAll(Staffs,filter, { id:1 });
    if (staffs.length){
      staffs = staffs.map((obj) => obj.id);

      const FinancialManagementsFilter = { '$or': [{ ResponsibleStaffID : { '$in' : staffs } }] };
      const FinancialManagementsCnt = await dbService.update(FinancialManagements,FinancialManagementsFilter,updateBody);

      const DepartmentsFilter = { '$or': [{ Head : { '$in' : staffs } }] };
      const DepartmentsCnt = await dbService.update(Departments,DepartmentsFilter,updateBody);

      const AppointmentsFilter = { '$or': [{ StaffID : { '$in' : staffs } }] };
      const AppointmentsCnt = await dbService.update(Appointments,AppointmentsFilter,updateBody);

      const InpatientsFilter = { '$or': [{ ResponsibleStaffID : { '$in' : staffs } }] };
      const InpatientsCnt = await dbService.update(Inpatients,InpatientsFilter,updateBody);

      const RoomsFilter = { '$or': [{ AssignedNurseID : { '$in' : staffs } },{ AssignedDoctorID : { '$in' : staffs } }] };
      const RoomsCnt = await dbService.update(Rooms,RoomsFilter,updateBody);
      let updated = await dbService.update(Staffs,filter,updateBody);

      let response = {
        FinancialManagements :FinancialManagementsCnt.length,
        Departments :DepartmentsCnt.length,
        Appointments :AppointmentsCnt.length,
        Inpatients :InpatientsCnt.length,
        Rooms :RoomsCnt.length,
      };
      return response;
    } else {
      return {  staffs : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePatients = async (filter,updateBody) =>{  
  try {
    let patients = await dbService.findAll(Patients,filter, { id:1 });
    if (patients.length){
      patients = patients.map((obj) => obj.id);

      const PatientMedicationsFilter = { '$or': [{ PatientID : { '$in' : patients } }] };
      const PatientMedicationsCnt = await dbService.update(PatientMedications,PatientMedicationsFilter,updateBody);

      const PatientAllergiesFilter = { '$or': [{ PatientID : { '$in' : patients } }] };
      const PatientAllergiesCnt = await dbService.update(PatientAllergies,PatientAllergiesFilter,updateBody);

      const FinancialManagementsFilter = { '$or': [{ PatientID : { '$in' : patients } }] };
      const FinancialManagementsCnt = await dbService.update(FinancialManagements,FinancialManagementsFilter,updateBody);

      const AppointmentsFilter = { '$or': [{ PatientID : { '$in' : patients } }] };
      const AppointmentsCnt = await dbService.update(Appointments,AppointmentsFilter,updateBody);

      const InpatientsFilter = { '$or': [{ PatientID : { '$in' : patients } }] };
      const InpatientsCnt = await dbService.update(Inpatients,InpatientsFilter,updateBody);

      const AdmissionsFilter = { '$or': [{ PatientID : { '$in' : patients } }] };
      const AdmissionsCnt = await dbService.update(Admissions,AdmissionsFilter,updateBody);
      let updated = await dbService.update(Patients,filter,updateBody);

      let response = {
        PatientMedications :PatientMedicationsCnt.length,
        PatientAllergies :PatientAllergiesCnt.length,
        FinancialManagements :FinancialManagementsCnt.length,
        Appointments :AppointmentsCnt.length,
        Inpatients :InpatientsCnt.length,
        Admissions :AdmissionsCnt.length,
      };
      return response;
    } else {
      return {  patients : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findAll(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.update(User,userFilter,updateBody);

      const userAuthSettingsFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userAuthSettingsCnt = await dbService.update(UserAuthSettings,userAuthSettingsFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.update(UserTokens,userTokensFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(User,filter,updateBody);

      let response = {
        user :userCnt.length + updated.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserAuthSettings = async (filter,updateBody) =>{  
  try {
    const userAuthSettingsCnt =  await dbService.update(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.update(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteActivityLog = async (filter,updateBody) =>{  
  try {
    const activityLogCnt =  await dbService.update(ActivityLog,filter);
    return { activityLog : activityLogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findAll(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.update(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt.length, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.update(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.update(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deletePatientMedications,
  deletePatientAllergies,
  deleteUsers,
  deleteFinancialManagements,
  deleteDepartments,
  deleteAppointments,
  deleteMedications,
  deleteInpatients,
  deleteRooms,
  deleteAdmissions,
  deleteStaffs,
  deletePatients,
  deleteUser,
  deleteUserAuthSettings,
  deleteUserTokens,
  deleteActivityLog,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countPatientMedications,
  countPatientAllergies,
  countUsers,
  countFinancialManagements,
  countDepartments,
  countAppointments,
  countMedications,
  countInpatients,
  countRooms,
  countAdmissions,
  countStaffs,
  countPatients,
  countUser,
  countUserAuthSettings,
  countUserTokens,
  countActivityLog,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeletePatientMedications,
  softDeletePatientAllergies,
  softDeleteUsers,
  softDeleteFinancialManagements,
  softDeleteDepartments,
  softDeleteAppointments,
  softDeleteMedications,
  softDeleteInpatients,
  softDeleteRooms,
  softDeleteAdmissions,
  softDeleteStaffs,
  softDeletePatients,
  softDeleteUser,
  softDeleteUserAuthSettings,
  softDeleteUserTokens,
  softDeleteActivityLog,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
