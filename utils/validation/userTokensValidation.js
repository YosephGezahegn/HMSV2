/**
 * userTokensValidation.js
 * @description :: validate each post and put request as per userTokens model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of userTokens */
exports.schemaKeys = joi.object({
  userId: joi.number().integer().allow(0),
  token: joi.string().allow(null).allow(''),
  tokenExpiredTime: joi.date().options({ convert: true }).allow(null).allow(''),
  isTokenExpired: joi.boolean().default(false),
  isActive: joi.boolean(),
  addedBy: joi.number().integer().allow(0),
  updatedBy: joi.number().integer().allow(0),
  createdAt: joi.date().options({ convert: true }).allow(null).allow(''),
  updatedAt: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of userTokens for updation */
exports.updateSchemaKeys = joi.object({
  userId: joi.number().integer().allow(0),
  token: joi.string().allow(null).allow(''),
  tokenExpiredTime: joi.date().options({ convert: true }).allow(null).allow(''),
  isTokenExpired: joi.boolean().default(false),
  isActive: joi.boolean(),
  addedBy: joi.number().integer().allow(0),
  updatedBy: joi.number().integer().allow(0),
  createdAt: joi.date().options({ convert: true }).allow(null).allow(''),
  updatedAt: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of userTokens for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      userId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      token: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      tokenExpiredTime: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isTokenExpired: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      addedBy: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      updatedBy: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      createdAt: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updatedAt: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
