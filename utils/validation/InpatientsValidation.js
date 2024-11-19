/**
 * InpatientsValidation.js
 * @description :: validate each post and put request as per Inpatients model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Inpatients */
exports.schemaKeys = joi.object({
  AdmissionID: joi.number().integer().allow(0),
  PatientID: joi.number().integer().allow(0),
  RoomNumber: joi.number().integer().allow(0),
  AdmissionDate: joi.any(),
  DischargeDate: joi.any(),
  ReasonForAdmission: joi.any(),
  ResponsibleStaffID: joi.number().integer().allow(0),
  DailyNotes: joi.any(),
  TreatmentPlan: joi.any(),
  SurgeryDetails: joi.any(),
  DischargeSummary: joi.any(),
  Is_Active: joi.number().integer().allow(0),
  added_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of Inpatients for updation */
exports.updateSchemaKeys = joi.object({
  AdmissionID: joi.number().integer().allow(0),
  PatientID: joi.number().integer().allow(0),
  RoomNumber: joi.number().integer().allow(0),
  AdmissionDate: joi.any(),
  DischargeDate: joi.any(),
  ReasonForAdmission: joi.any(),
  ResponsibleStaffID: joi.number().integer().allow(0),
  DailyNotes: joi.any(),
  TreatmentPlan: joi.any(),
  SurgeryDetails: joi.any(),
  DischargeSummary: joi.any(),
  Is_Active: joi.number().integer().allow(0),
  added_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Inpatients for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      AdmissionID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      PatientID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      RoomNumber: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      AdmissionDate: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      DischargeDate: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      ReasonForAdmission: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      ResponsibleStaffID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      DailyNotes: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      TreatmentPlan: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      SurgeryDetails: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      DischargeSummary: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
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
