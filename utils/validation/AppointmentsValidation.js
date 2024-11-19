/**
 * AppointmentsValidation.js
 * @description :: validate each post and put request as per Appointments model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { convertObjectToEnum } = require('../common');  
const PatientsDefault = require('../../constants/Patients');    

/** validation keys and properties of Appointments */
exports.schemaKeys = joi.object({
  AppointmentID: joi.number().integer().allow(0),
  PatientID: joi.number().integer().allow(0),
  StaffID: joi.number().integer().allow(0),
  DepartmentID: joi.number().integer().allow(0),
  AppointmentDateTime: joi.date().options({ convert: true }).allow(null).allow(''),
  Purpose: joi.any(),
  Status: joi.valid(...convertObjectToEnum(PatientsDefault.AppointmentStatus)),
  Notes: joi.any(),
  Is_Active: joi.number().integer().allow(0),
  added_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of Appointments for updation */
exports.updateSchemaKeys = joi.object({
  AppointmentID: joi.number().integer().allow(0),
  PatientID: joi.number().integer().allow(0),
  StaffID: joi.number().integer().allow(0),
  DepartmentID: joi.number().integer().allow(0),
  AppointmentDateTime: joi.date().options({ convert: true }).allow(null).allow(''),
  Purpose: joi.any(),
  Status: joi.valid(...convertObjectToEnum(PatientsDefault.AppointmentStatus)),
  Notes: joi.any(),
  Is_Active: joi.number().integer().allow(0),
  added_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Appointments for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      AppointmentID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      PatientID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      StaffID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      DepartmentID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      AppointmentDateTime: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      Purpose: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Notes: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
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
