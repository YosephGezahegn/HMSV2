/**
 * PatientsValidation.js
 * @description :: validate each post and put request as per Patients model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { convertObjectToEnum } = require('../common');  
const PatientsDefault = require('../../constants/Patients');    

/** validation keys and properties of Patients */
exports.schemaKeys = joi.object({
  PatientID: joi.number().integer().allow(0),
  First_Name: joi.any(),
  Last_Name: joi.any(),
  Date_Of_Birth: joi.any(),
  Gender: joi.valid(...convertObjectToEnum(PatientsDefault.Gender)),
  Address: joi.any(),
  City: joi.any(),
  State: joi.any(),
  Zip_Code: joi.string().allow(null).allow(''),
  Contact_Number: joi.string().allow(null).allow(''),
  Email: joi.any(),
  Insurance_Details: joi.any(),
  Emergency_Contact_Name: joi.any(),
  Emergency_Contact_Number: joi.string().allow(null).allow(''),
  Medical_History: joi.any(),
  Blood_Type: joi.valid(...convertObjectToEnum(PatientsDefault.BloodType)),
  Height: joi.number().allow(0),
  Weight: joi.number().allow(0),
  Chronic_Conditions: joi.any(),
  Family_History: joi.any(),
  Surgical_History: joi.any(),
  Social_History: joi.any(),
  Immunization_History: joi.any(),
  Primary_Care_Provider: joi.any(),
  Employment_Status: joi.valid(...convertObjectToEnum(PatientsDefault.EmploymentStatus)),
  Employer: joi.any(),
  Marital_Status: joi.valid(...convertObjectToEnum(PatientsDefault.MaritalStatus)),
  Spouse_Name: joi.any(),
  Spouse_DOB: joi.any(),
  Is_Active: joi.number().integer().allow(0),
  added_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of Patients for updation */
exports.updateSchemaKeys = joi.object({
  PatientID: joi.number().integer().allow(0),
  First_Name: joi.any(),
  Last_Name: joi.any(),
  Date_Of_Birth: joi.any(),
  Gender: joi.valid(...convertObjectToEnum(PatientsDefault.Gender)),
  Address: joi.any(),
  City: joi.any(),
  State: joi.any(),
  Zip_Code: joi.string().allow(null).allow(''),
  Contact_Number: joi.string().allow(null).allow(''),
  Email: joi.any(),
  Insurance_Details: joi.any(),
  Emergency_Contact_Name: joi.any(),
  Emergency_Contact_Number: joi.string().allow(null).allow(''),
  Medical_History: joi.any(),
  Blood_Type: joi.valid(...convertObjectToEnum(PatientsDefault.BloodType)),
  Height: joi.number().allow(0),
  Weight: joi.number().allow(0),
  Chronic_Conditions: joi.any(),
  Family_History: joi.any(),
  Surgical_History: joi.any(),
  Social_History: joi.any(),
  Immunization_History: joi.any(),
  Primary_Care_Provider: joi.any(),
  Employment_Status: joi.valid(...convertObjectToEnum(PatientsDefault.EmploymentStatus)),
  Employer: joi.any(),
  Marital_Status: joi.valid(...convertObjectToEnum(PatientsDefault.MaritalStatus)),
  Spouse_Name: joi.any(),
  Spouse_DOB: joi.any(),
  Is_Active: joi.number().integer().allow(0),
  added_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Patients for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      PatientID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      First_Name: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Last_Name: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Date_Of_Birth: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Address: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      City: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      State: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Zip_Code: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Contact_Number: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Email: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Insurance_Details: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Emergency_Contact_Name: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Emergency_Contact_Number: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Medical_History: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Height: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      Weight: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      Chronic_Conditions: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Family_History: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Surgical_History: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Social_History: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Immunization_History: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Primary_Care_Provider: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Employer: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Spouse_Name: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Spouse_DOB: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
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
