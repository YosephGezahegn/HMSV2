/**
 * MedicationsController.js
 * @description :: exports action methods for Medications.
 */

const Medications = require('../../../model/Medications');
const MedicationsSchemaKey = require('../../../utils/validation/MedicationsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

/**
 * @description : create record of Medications in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Medications. {status, message, data}
 */ 
const addMedications = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      MedicationsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
        
    let createdMedications = await dbService.createOne(Medications,dataToCreate);
    return  res.success({ data :createdMedications });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Medications in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Medicationss. {status, message, data}
 */
const bulkInsertMedications = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      let createdMedications = await dbService.createMany(Medications,dataToCreate); 
      return  res.success({ data :{ count :createdMedications.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Medications from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Medications(s). {status, message, data}
 */
const findAllMedications = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundMedications;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      MedicationsSchemaKey.findFilterKeys,
      Medications.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundMedications = await dbService.count(Medications, query);
      if (!foundMedications) {
        return res.recordNotFound();
      } 
      foundMedications = { totalRecords: foundMedications };
      return res.success({ data :foundMedications });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundMedications = await dbService.paginate( Medications,query,options);
    if (!foundMedications){
      return res.recordNotFound();
    }
    return res.success({ data:foundMedications }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Medications from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Medications. {status, message, data}
 */
const getMedications = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundMedications = await dbService.findOne(Medications,{ id :id });
    if (!foundMedications){
      return res.recordNotFound();
    }
    return  res.success({ data :foundMedications });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Medications.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getMedicationsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      MedicationsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedMedications = await dbService.count(Medications,where);
    if (!countedMedications){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedMedications } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Medications with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Medications.
 * @return {Object} : updated Medications. {status, message, data}
 */
const updateMedications = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      MedicationsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedMedications = await dbService.update(Medications,query,dataToUpdate);
    return  res.success({ data :updatedMedications }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Medications with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Medicationss.
 * @return {Object} : updated Medicationss. {status, message, data}
 */
const bulkUpdateMedications = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {};
    }
    let updatedMedications = await dbService.update(Medications,filter,dataToUpdate);
    if (!updatedMedications){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedMedications.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Medications with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Medications.
 * @return {Object} : updated Medications. {status, message, data}
 */
const partialUpdateMedications = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      MedicationsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedMedications = await dbService.update(Medications, query, dataToUpdate);
    if (!updatedMedications) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedMedications });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Medications from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Medications.
 * @return {Object} : deactivated Medications. {status, message, data}
 */
const softDeleteMedications = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedMedications = await deleteDependentService.softDeleteMedications(query, updateBody);
    if (!updatedMedications){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedMedications });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Medications from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Medications. {status, message, data}
 */
const deleteMedications = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedMedications = await deleteDependentService.countMedications(query);
      if (!countedMedications){
        return res.recordNotFound();
      }
      return res.success({ data :countedMedications });
    }
    let deletedMedications = await deleteDependentService.deleteUser(query);
    if (!deletedMedications){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedMedications });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Medications in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyMedications = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedMedications = await deleteDependentService.countMedications(query);
      if (!countedMedications) {
        return res.recordNotFound();
      }
      return res.success({ data: countedMedications });            
    }
    let deletedMedications = await deleteDependentService.deleteMedications(query);
    if (!deletedMedications) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedMedications });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Medications from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Medications.
 * @return {Object} : number of deactivated documents of Medications. {status, message, data}
 */
const softDeleteManyMedications = async (req, res) => {
  try {
    let dataToUpdate = req.body;
    let query = {};
    if (!req.params || !req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }            
    query = { id:{ $in:dataToUpdate.ids } };
    const updateBody = { isDeleted: true, };
    let updatedMedications = await deleteDependentService.softDeleteMedications(query, updateBody);
    if (!updatedMedications) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedMedications });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addMedications,
  bulkInsertMedications,
  findAllMedications,
  getMedications,
  getMedicationsCount,
  updateMedications,
  bulkUpdateMedications,
  partialUpdateMedications,
  softDeleteMedications,
  deleteMedications,
  deleteManyMedications,
  softDeleteManyMedications,
};
