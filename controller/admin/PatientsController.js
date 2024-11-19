/**
 * PatientsController.js
 * @description :: exports action methods for Patients.
 */

const Patients = require('../../model/Patients');
const PatientsSchemaKey = require('../../utils/validation/PatientsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Patients in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Patients. {status, message, data}
 */ 
const addPatients = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      PatientsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
        
    let createdPatients = await dbService.createOne(Patients,dataToCreate);
    return  res.success({ data :createdPatients });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Patients in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Patientss. {status, message, data}
 */
const bulkInsertPatients = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      let createdPatients = await dbService.createMany(Patients,dataToCreate); 
      return  res.success({ data :{ count :createdPatients.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Patients from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Patients(s). {status, message, data}
 */
const findAllPatients = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPatients;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      PatientsSchemaKey.findFilterKeys,
      Patients.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPatients = await dbService.count(Patients, query);
      if (!foundPatients) {
        return res.recordNotFound();
      } 
      foundPatients = { totalRecords: foundPatients };
      return res.success({ data :foundPatients });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPatients = await dbService.paginate( Patients,query,options);
    if (!foundPatients){
      return res.recordNotFound();
    }
    return res.success({ data:foundPatients }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Patients from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Patients. {status, message, data}
 */
const getPatients = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPatients = await dbService.findOne(Patients,{ id :id });
    if (!foundPatients){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPatients });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Patients.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPatientsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      PatientsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPatients = await dbService.count(Patients,where);
    if (!countedPatients){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPatients } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Patients with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Patients.
 * @return {Object} : updated Patients. {status, message, data}
 */
const updatePatients = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      PatientsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPatients = await dbService.update(Patients,query,dataToUpdate);
    return  res.success({ data :updatedPatients }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Patients with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Patientss.
 * @return {Object} : updated Patientss. {status, message, data}
 */
const bulkUpdatePatients = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {};
    }
    let updatedPatients = await dbService.update(Patients,filter,dataToUpdate);
    if (!updatedPatients){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPatients.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Patients with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Patients.
 * @return {Object} : updated Patients. {status, message, data}
 */
const partialUpdatePatients = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      PatientsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPatients = await dbService.update(Patients, query, dataToUpdate);
    if (!updatedPatients) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPatients });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Patients from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Patients.
 * @return {Object} : deactivated Patients. {status, message, data}
 */
const softDeletePatients = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedPatients = await deleteDependentService.softDeletePatients(query, updateBody);
    if (!updatedPatients){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedPatients });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Patients from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Patients. {status, message, data}
 */
const deletePatients = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedPatients = await deleteDependentService.countPatients(query);
      if (!countedPatients){
        return res.recordNotFound();
      }
      return res.success({ data :countedPatients });
    }
    let deletedPatients = await deleteDependentService.deleteUser(query);
    if (!deletedPatients){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedPatients });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Patients in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPatients = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedPatients = await deleteDependentService.countPatients(query);
      if (!countedPatients) {
        return res.recordNotFound();
      }
      return res.success({ data: countedPatients });            
    }
    let deletedPatients = await deleteDependentService.deletePatients(query);
    if (!deletedPatients) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedPatients });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Patients from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Patients.
 * @return {Object} : number of deactivated documents of Patients. {status, message, data}
 */
const softDeleteManyPatients = async (req, res) => {
  try {
    let dataToUpdate = req.body;
    let query = {};
    if (!req.params || !req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }            
    query = { id:{ $in:dataToUpdate.ids } };
    const updateBody = { isDeleted: true, };
    let updatedPatients = await deleteDependentService.softDeletePatients(query, updateBody);
    if (!updatedPatients) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedPatients });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPatients,
  bulkInsertPatients,
  findAllPatients,
  getPatients,
  getPatientsCount,
  updatePatients,
  bulkUpdatePatients,
  partialUpdatePatients,
  softDeletePatients,
  deletePatients,
  deleteManyPatients,
  softDeleteManyPatients,
};
