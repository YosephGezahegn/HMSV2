/**
 * FinancialManagementsValidation.js
 * @description :: validate each post and put request as per FinancialManagements model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { convertObjectToEnum } = require('../common');  
const PatientsDefault = require('../../constants/Patients');    

/** validation keys and properties of FinancialManagements */
exports.schemaKeys = joi.object({
  TransactionID: joi.number().integer().allow(0),
  PatientID: joi.number().integer().allow(0),
  TransactionDate: joi.date().options({ convert: true }).allow(null).allow(''),
  Amount: joi.number().allow(0),
  TransactionType: joi.valid(...convertObjectToEnum(PatientsDefault.TransactionType)),
  ResponsibleStaffID: joi.number().integer().allow(0),
  Is_Active: joi.number().integer().allow(0),
  added_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of FinancialManagements for updation */
exports.updateSchemaKeys = joi.object({
  TransactionID: joi.number().integer().allow(0),
  PatientID: joi.number().integer().allow(0),
  TransactionDate: joi.date().options({ convert: true }).allow(null).allow(''),
  Amount: joi.number().allow(0),
  TransactionType: joi.valid(...convertObjectToEnum(PatientsDefault.TransactionType)),
  ResponsibleStaffID: joi.number().integer().allow(0),
  Is_Active: joi.number().integer().allow(0),
  added_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of FinancialManagements for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      TransactionID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      PatientID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      TransactionDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      Amount: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      ResponsibleStaffID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
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
