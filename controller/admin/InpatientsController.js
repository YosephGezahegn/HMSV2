/**
 * InpatientsController.js
 * @description :: exports action methods for Inpatients.
 */

const Inpatients = require('../../model/Inpatients');
const InpatientsSchemaKey = require('../../utils/validation/InpatientsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Inpatients in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Inpatients. {status, message, data}
 */ 
const addInpatients = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      InpatientsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
        
    let createdInpatients = await dbService.createOne(Inpatients,dataToCreate);
    return  res.success({ data :createdInpatients });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Inpatients in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Inpatientss. {status, message, data}
 */
const bulkInsertInpatients = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      let createdInpatients = await dbService.createMany(Inpatients,dataToCreate); 
      return  res.success({ data :{ count :createdInpatients.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Inpatients from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Inpatients(s). {status, message, data}
 */
const findAllInpatients = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundInpatients;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      InpatientsSchemaKey.findFilterKeys,
      Inpatients.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundInpatients = await dbService.count(Inpatients, query);
      if (!foundInpatients) {
        return res.recordNotFound();
      } 
      foundInpatients = { totalRecords: foundInpatients };
      return res.success({ data :foundInpatients });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundInpatients = await dbService.paginate( Inpatients,query,options);
    if (!foundInpatients){
      return res.recordNotFound();
    }
    return res.success({ data:foundInpatients }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Inpatients from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Inpatients. {status, message, data}
 */
const getInpatients = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundInpatients = await dbService.findOne(Inpatients,{ id :id });
    if (!foundInpatients){
      return res.recordNotFound();
    }
    return  res.success({ data :foundInpatients });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Inpatients.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getInpatientsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      InpatientsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedInpatients = await dbService.count(Inpatients,where);
    if (!countedInpatients){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedInpatients } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Inpatients with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Inpatients.
 * @return {Object} : updated Inpatients. {status, message, data}
 */
const updateInpatients = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      InpatientsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedInpatients = await dbService.update(Inpatients,query,dataToUpdate);
    return  res.success({ data :updatedInpatients }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Inpatients with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Inpatientss.
 * @return {Object} : updated Inpatientss. {status, message, data}
 */
const bulkUpdateInpatients = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {};
    }
    let updatedInpatients = await dbService.update(Inpatients,filter,dataToUpdate);
    if (!updatedInpatients){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedInpatients.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Inpatients with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Inpatients.
 * @return {Object} : updated Inpatients. {status, message, data}
 */
const partialUpdateInpatients = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      InpatientsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedInpatients = await dbService.update(Inpatients, query, dataToUpdate);
    if (!updatedInpatients) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedInpatients });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Inpatients from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Inpatients.
 * @return {Object} : deactivated Inpatients. {status, message, data}
 */
const softDeleteInpatients = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = { isDeleted: true, };
    let result = await dbService.update(Inpatients, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Inpatients from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Inpatients. {status, message, data}
 */
const deleteInpatients = async (req, res) => {
  const result = await dbService.deleteByPk(Inpatients, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Inpatients in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyInpatients = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedInpatients = await dbService.destroy(Inpatients,query);
    return res.success({ data :{ count :deletedInpatients.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Inpatients from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Inpatients.
 * @return {Object} : number of deactivated documents of Inpatients. {status, message, data}
 */
const softDeleteManyInpatients = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    const options = {};
    let updatedInpatients = await dbService.update(Inpatients,query,updateBody, options);
    if (!updatedInpatients) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedInpatients.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addInpatients,
  bulkInsertInpatients,
  findAllInpatients,
  getInpatients,
  getInpatientsCount,
  updateInpatients,
  bulkUpdateInpatients,
  partialUpdateInpatients,
  softDeleteInpatients,
  deleteInpatients,
  deleteManyInpatients,
  softDeleteManyInpatients,
};
