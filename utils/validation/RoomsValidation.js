/**
 * RoomsValidation.js
 * @description :: validate each post and put request as per Rooms model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { convertObjectToEnum } = require('../common');  
const PatientsDefault = require('../../constants/Patients');    

/** validation keys and properties of Rooms */
exports.schemaKeys = joi.object({
  RoomNumber: joi.number().integer().allow(0),
  RoomType: joi.any(),
  Capacity: joi.number().integer().allow(0),
  AvailabilityStatus: joi.valid(...convertObjectToEnum(PatientsDefault.AvailabilityStatus)),
  FacilitiesAvailable: joi.any(),
  CleanlinessStatus: joi.string().allow(null).allow(''),
  AssignedNurseID: joi.number().integer().allow(0),
  AssignedDoctorID: joi.number().integer().allow(0),
  AdmitDate: joi.any(),
  DischargeDate: joi.any(),
  LastCleaningDate: joi.any(),
  NextCleaningDate: joi.any(),
  Comments: joi.any(),
  Is_Active: joi.number().integer().allow(0),
  added_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of Rooms for updation */
exports.updateSchemaKeys = joi.object({
  RoomNumber: joi.number().integer().allow(0),
  RoomType: joi.any(),
  Capacity: joi.number().integer().allow(0),
  AvailabilityStatus: joi.valid(...convertObjectToEnum(PatientsDefault.AvailabilityStatus)),
  FacilitiesAvailable: joi.any(),
  CleanlinessStatus: joi.string().allow(null).allow(''),
  AssignedNurseID: joi.number().integer().allow(0),
  AssignedDoctorID: joi.number().integer().allow(0),
  AdmitDate: joi.any(),
  DischargeDate: joi.any(),
  LastCleaningDate: joi.any(),
  NextCleaningDate: joi.any(),
  Comments: joi.any(),
  Is_Active: joi.number().integer().allow(0),
  added_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Rooms for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      RoomNumber: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      RoomType: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Capacity: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      FacilitiesAvailable: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      CleanlinessStatus: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      AssignedNurseID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      AssignedDoctorID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      AdmitDate: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      DischargeDate: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      LastCleaningDate: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      NextCleaningDate: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Comments: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
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
