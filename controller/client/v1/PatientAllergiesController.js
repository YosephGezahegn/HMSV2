/**
 * PatientAllergiesController.js
 * @description :: exports action methods for PatientAllergies.
 */

const PatientAllergies = require('../../../model/PatientAllergies');
const PatientAllergiesSchemaKey = require('../../../utils/validation/PatientAllergiesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of PatientAllergies in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created PatientAllergies. {status, message, data}
 */ 
const addPatientAllergies = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      PatientAllergiesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
        
    let createdPatientAllergies = await dbService.createOne(PatientAllergies,dataToCreate);
    return  res.success({ data :createdPatientAllergies });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of PatientAllergies in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created PatientAllergiess. {status, message, data}
 */
const bulkInsertPatientAllergies = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      let createdPatientAllergies = await dbService.createMany(PatientAllergies,dataToCreate); 
      return  res.success({ data :{ count :createdPatientAllergies.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of PatientAllergies from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found PatientAllergies(s). {status, message, data}
 */
const findAllPatientAllergies = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPatientAllergies;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      PatientAllergiesSchemaKey.findFilterKeys,
      PatientAllergies.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPatientAllergies = await dbService.count(PatientAllergies, query);
      if (!foundPatientAllergies) {
        return res.recordNotFound();
      } 
      foundPatientAllergies = { totalRecords: foundPatientAllergies };
      return res.success({ data :foundPatientAllergies });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPatientAllergies = await dbService.paginate( PatientAllergies,query,options);
    if (!foundPatientAllergies){
      return res.recordNotFound();
    }
    return res.success({ data:foundPatientAllergies }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of PatientAllergies from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found PatientAllergies. {status, message, data}
 */
const getPatientAllergies = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPatientAllergies = await dbService.findOne(PatientAllergies,{ id :id });
    if (!foundPatientAllergies){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPatientAllergies });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of PatientAllergies.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPatientAllergiesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      PatientAllergiesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPatientAllergies = await dbService.count(PatientAllergies,where);
    if (!countedPatientAllergies){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPatientAllergies } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of PatientAllergies with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated PatientAllergies.
 * @return {Object} : updated PatientAllergies. {status, message, data}
 */
const updatePatientAllergies = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      PatientAllergiesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPatientAllergies = await dbService.update(PatientAllergies,query,dataToUpdate);
    return  res.success({ data :updatedPatientAllergies }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of PatientAllergies with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated PatientAllergiess.
 * @return {Object} : updated PatientAllergiess. {status, message, data}
 */
const bulkUpdatePatientAllergies = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {};
    }
    let updatedPatientAllergies = await dbService.update(PatientAllergies,filter,dataToUpdate);
    if (!updatedPatientAllergies){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPatientAllergies.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of PatientAllergies with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated PatientAllergies.
 * @return {Object} : updated PatientAllergies. {status, message, data}
 */
const partialUpdatePatientAllergies = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      PatientAllergiesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPatientAllergies = await dbService.update(PatientAllergies, query, dataToUpdate);
    if (!updatedPatientAllergies) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPatientAllergies });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of PatientAllergies from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of PatientAllergies.
 * @return {Object} : deactivated PatientAllergies. {status, message, data}
 */
const softDeletePatientAllergies = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = { isDeleted: true, };
    let result = await dbService.update(PatientAllergies, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of PatientAllergies from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted PatientAllergies. {status, message, data}
 */
const deletePatientAllergies = async (req, res) => {
  const result = await dbService.deleteByPk(PatientAllergies, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of PatientAllergies in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPatientAllergies = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedPatientAllergies = await dbService.destroy(PatientAllergies,query);
    return res.success({ data :{ count :deletedPatientAllergies.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of PatientAllergies from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of PatientAllergies.
 * @return {Object} : number of deactivated documents of PatientAllergies. {status, message, data}
 */
const softDeleteManyPatientAllergies = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    const options = {};
    let updatedPatientAllergies = await dbService.update(PatientAllergies,query,updateBody, options);
    if (!updatedPatientAllergies) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedPatientAllergies.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPatientAllergies,
  bulkInsertPatientAllergies,
  findAllPatientAllergies,
  getPatientAllergies,
  getPatientAllergiesCount,
  updatePatientAllergies,
  bulkUpdatePatientAllergies,
  partialUpdatePatientAllergies,
  softDeletePatientAllergies,
  deletePatientAllergies,
  deleteManyPatientAllergies,
  softDeleteManyPatientAllergies,
};
