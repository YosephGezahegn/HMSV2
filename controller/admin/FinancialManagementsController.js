/**
 * FinancialManagementsController.js
 * @description :: exports action methods for FinancialManagements.
 */

const FinancialManagements = require('../../model/FinancialManagements');
const FinancialManagementsSchemaKey = require('../../utils/validation/FinancialManagementsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of FinancialManagements in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created FinancialManagements. {status, message, data}
 */ 
const addFinancialManagements = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      FinancialManagementsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
        
    let createdFinancialManagements = await dbService.createOne(FinancialManagements,dataToCreate);
    return  res.success({ data :createdFinancialManagements });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of FinancialManagements in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created FinancialManagementss. {status, message, data}
 */
const bulkInsertFinancialManagements = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      let createdFinancialManagements = await dbService.createMany(FinancialManagements,dataToCreate); 
      return  res.success({ data :{ count :createdFinancialManagements.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of FinancialManagements from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found FinancialManagements(s). {status, message, data}
 */
const findAllFinancialManagements = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundFinancialManagements;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      FinancialManagementsSchemaKey.findFilterKeys,
      FinancialManagements.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundFinancialManagements = await dbService.count(FinancialManagements, query);
      if (!foundFinancialManagements) {
        return res.recordNotFound();
      } 
      foundFinancialManagements = { totalRecords: foundFinancialManagements };
      return res.success({ data :foundFinancialManagements });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundFinancialManagements = await dbService.paginate( FinancialManagements,query,options);
    if (!foundFinancialManagements){
      return res.recordNotFound();
    }
    return res.success({ data:foundFinancialManagements }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of FinancialManagements from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found FinancialManagements. {status, message, data}
 */
const getFinancialManagements = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundFinancialManagements = await dbService.findOne(FinancialManagements,{ id :id });
    if (!foundFinancialManagements){
      return res.recordNotFound();
    }
    return  res.success({ data :foundFinancialManagements });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of FinancialManagements.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getFinancialManagementsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      FinancialManagementsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedFinancialManagements = await dbService.count(FinancialManagements,where);
    if (!countedFinancialManagements){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedFinancialManagements } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of FinancialManagements with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated FinancialManagements.
 * @return {Object} : updated FinancialManagements. {status, message, data}
 */
const updateFinancialManagements = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      FinancialManagementsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedFinancialManagements = await dbService.update(FinancialManagements,query,dataToUpdate);
    return  res.success({ data :updatedFinancialManagements }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of FinancialManagements with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated FinancialManagementss.
 * @return {Object} : updated FinancialManagementss. {status, message, data}
 */
const bulkUpdateFinancialManagements = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {};
    }
    let updatedFinancialManagements = await dbService.update(FinancialManagements,filter,dataToUpdate);
    if (!updatedFinancialManagements){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedFinancialManagements.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of FinancialManagements with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated FinancialManagements.
 * @return {Object} : updated FinancialManagements. {status, message, data}
 */
const partialUpdateFinancialManagements = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      FinancialManagementsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedFinancialManagements = await dbService.update(FinancialManagements, query, dataToUpdate);
    if (!updatedFinancialManagements) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedFinancialManagements });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of FinancialManagements from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of FinancialManagements.
 * @return {Object} : deactivated FinancialManagements. {status, message, data}
 */
const softDeleteFinancialManagements = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = { isDeleted: true, };
    let result = await dbService.update(FinancialManagements, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of FinancialManagements from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted FinancialManagements. {status, message, data}
 */
const deleteFinancialManagements = async (req, res) => {
  const result = await dbService.deleteByPk(FinancialManagements, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of FinancialManagements in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyFinancialManagements = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedFinancialManagements = await dbService.destroy(FinancialManagements,query);
    return res.success({ data :{ count :deletedFinancialManagements.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of FinancialManagements from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of FinancialManagements.
 * @return {Object} : number of deactivated documents of FinancialManagements. {status, message, data}
 */
const softDeleteManyFinancialManagements = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    const options = {};
    let updatedFinancialManagements = await dbService.update(FinancialManagements,query,updateBody, options);
    if (!updatedFinancialManagements) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedFinancialManagements.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addFinancialManagements,
  bulkInsertFinancialManagements,
  findAllFinancialManagements,
  getFinancialManagements,
  getFinancialManagementsCount,
  updateFinancialManagements,
  bulkUpdateFinancialManagements,
  partialUpdateFinancialManagements,
  softDeleteFinancialManagements,
  deleteFinancialManagements,
  deleteManyFinancialManagements,
  softDeleteManyFinancialManagements,
};
