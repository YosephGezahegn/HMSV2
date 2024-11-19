/**
 * AdmissionsController.js
 * @description :: exports action methods for Admissions.
 */

const Admissions = require('../../model/Admissions');
const AdmissionsSchemaKey = require('../../utils/validation/AdmissionsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Admissions in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Admissions. {status, message, data}
 */ 
const addAdmissions = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      AdmissionsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
        
    let createdAdmissions = await dbService.createOne(Admissions,dataToCreate);
    return  res.success({ data :createdAdmissions });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Admissions in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Admissionss. {status, message, data}
 */
const bulkInsertAdmissions = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      let createdAdmissions = await dbService.createMany(Admissions,dataToCreate); 
      return  res.success({ data :{ count :createdAdmissions.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Admissions from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Admissions(s). {status, message, data}
 */
const findAllAdmissions = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAdmissions;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      AdmissionsSchemaKey.findFilterKeys,
      Admissions.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAdmissions = await dbService.count(Admissions, query);
      if (!foundAdmissions) {
        return res.recordNotFound();
      } 
      foundAdmissions = { totalRecords: foundAdmissions };
      return res.success({ data :foundAdmissions });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAdmissions = await dbService.paginate( Admissions,query,options);
    if (!foundAdmissions){
      return res.recordNotFound();
    }
    return res.success({ data:foundAdmissions }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Admissions from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Admissions. {status, message, data}
 */
const getAdmissions = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAdmissions = await dbService.findOne(Admissions,{ id :id });
    if (!foundAdmissions){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAdmissions });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Admissions.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAdmissionsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      AdmissionsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAdmissions = await dbService.count(Admissions,where);
    if (!countedAdmissions){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAdmissions } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Admissions with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admissions.
 * @return {Object} : updated Admissions. {status, message, data}
 */
const updateAdmissions = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      AdmissionsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAdmissions = await dbService.update(Admissions,query,dataToUpdate);
    return  res.success({ data :updatedAdmissions }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Admissions with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admissionss.
 * @return {Object} : updated Admissionss. {status, message, data}
 */
const bulkUpdateAdmissions = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {};
    }
    let updatedAdmissions = await dbService.update(Admissions,filter,dataToUpdate);
    if (!updatedAdmissions){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAdmissions.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Admissions with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admissions.
 * @return {Object} : updated Admissions. {status, message, data}
 */
const partialUpdateAdmissions = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      AdmissionsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAdmissions = await dbService.update(Admissions, query, dataToUpdate);
    if (!updatedAdmissions) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAdmissions });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Admissions from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Admissions.
 * @return {Object} : deactivated Admissions. {status, message, data}
 */
const softDeleteAdmissions = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedAdmissions = await deleteDependentService.softDeleteAdmissions(query, updateBody);
    if (!updatedAdmissions){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedAdmissions });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Admissions from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Admissions. {status, message, data}
 */
const deleteAdmissions = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedAdmissions = await deleteDependentService.countAdmissions(query);
      if (!countedAdmissions){
        return res.recordNotFound();
      }
      return res.success({ data :countedAdmissions });
    }
    let deletedAdmissions = await deleteDependentService.deleteUser(query);
    if (!deletedAdmissions){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedAdmissions });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Admissions in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAdmissions = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedAdmissions = await deleteDependentService.countAdmissions(query);
      if (!countedAdmissions) {
        return res.recordNotFound();
      }
      return res.success({ data: countedAdmissions });            
    }
    let deletedAdmissions = await deleteDependentService.deleteAdmissions(query);
    if (!deletedAdmissions) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedAdmissions });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Admissions from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Admissions.
 * @return {Object} : number of deactivated documents of Admissions. {status, message, data}
 */
const softDeleteManyAdmissions = async (req, res) => {
  try {
    let dataToUpdate = req.body;
    let query = {};
    if (!req.params || !req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }            
    query = { id:{ $in:dataToUpdate.ids } };
    const updateBody = { isDeleted: true, };
    let updatedAdmissions = await deleteDependentService.softDeleteAdmissions(query, updateBody);
    if (!updatedAdmissions) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedAdmissions });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAdmissions,
  bulkInsertAdmissions,
  findAllAdmissions,
  getAdmissions,
  getAdmissionsCount,
  updateAdmissions,
  bulkUpdateAdmissions,
  partialUpdateAdmissions,
  softDeleteAdmissions,
  deleteAdmissions,
  deleteManyAdmissions,
  softDeleteManyAdmissions,
};
