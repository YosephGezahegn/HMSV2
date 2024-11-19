/**
 * StaffsValidation.js
 * @description :: validate each post and put request as per Staffs model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { convertObjectToEnum } = require('../common');  
const PatientsDefault = require('../../constants/Patients');    

/** validation keys and properties of Staffs */
exports.schemaKeys = joi.object({
  StaffID: joi.number().integer().allow(0),
  First_Name: joi.any(),
  Last_Name: joi.any(),
  Gender: joi.valid(...convertObjectToEnum(PatientsDefault.Gender)),
  Job_Position: joi.valid(...convertObjectToEnum(PatientsDefault.JobPosition)),
  DepartmentID: joi.number().integer().allow(0),
  Contact_Number: joi.string().allow(null).allow(''),
  Email: joi.any(),
  Address: joi.any(),
  City: joi.any(),
  State: joi.any(),
  Zip_Code: joi.string().allow(null).allow(''),
  Qualifications: joi.any(),
  Hire_Date: joi.any(),
  Salary: joi.number().allow(0),
  Shift: joi.any(),
  License_Number: joi.any(),
  Specialization: joi.any(),
  Emergency_Contact_Name: joi.any(),
  Emergency_Contact_Number: joi.string().allow(null).allow(''),
  Certification: joi.any(),
  Training_Program: joi.any(),
  Is_Active: joi.number().integer().allow(0),
  added_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of Staffs for updation */
exports.updateSchemaKeys = joi.object({
  StaffID: joi.number().integer().allow(0),
  First_Name: joi.any(),
  Last_Name: joi.any(),
  Gender: joi.valid(...convertObjectToEnum(PatientsDefault.Gender)),
  Job_Position: joi.valid(...convertObjectToEnum(PatientsDefault.JobPosition)),
  DepartmentID: joi.number().integer().allow(0),
  Contact_Number: joi.string().allow(null).allow(''),
  Email: joi.any(),
  Address: joi.any(),
  City: joi.any(),
  State: joi.any(),
  Zip_Code: joi.string().allow(null).allow(''),
  Qualifications: joi.any(),
  Hire_Date: joi.any(),
  Salary: joi.number().allow(0),
  Shift: joi.any(),
  License_Number: joi.any(),
  Specialization: joi.any(),
  Emergency_Contact_Name: joi.any(),
  Emergency_Contact_Number: joi.string().allow(null).allow(''),
  Certification: joi.any(),
  Training_Program: joi.any(),
  Is_Active: joi.number().integer().allow(0),
  added_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Staffs for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      StaffID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      First_Name: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Last_Name: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      DepartmentID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      Contact_Number: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Email: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Address: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      City: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      State: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Zip_Code: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Qualifications: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Hire_Date: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Salary: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      Shift: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      License_Number: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Specialization: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Emergency_Contact_Name: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Emergency_Contact_Number: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Certification: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Training_Program: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Is_Active: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      added_by: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      updated_by: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
