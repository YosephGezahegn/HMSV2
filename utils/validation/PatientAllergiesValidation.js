/**
 * PatientAllergiesValidation.js
 * @description :: validate each post and put request as per PatientAllergies model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of PatientAllergies */
exports.schemaKeys = joi.object({
  PatientID: joi.number().integer().allow(0),
  Allergy: joi.any(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of PatientAllergies for updation */
exports.updateSchemaKeys = joi.object({
  PatientID: joi.number().integer().allow(0),
  Allergy: joi.any(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of PatientAllergies for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      PatientID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      Allergy: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
