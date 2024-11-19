/**
 * PatientMedicationsController.js
 * @description :: exports action methods for PatientMedications.
 */

const PatientMedications = require('../../model/PatientMedications');
const PatientMedicationsSchemaKey = require('../../utils/validation/PatientMedicationsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of PatientMedications in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created PatientMedications. {status, message, data}
 */ 
const addPatientMedications = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      PatientMedicationsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
        
    let createdPatientMedications = await dbService.createOne(PatientMedications,dataToCreate);
    return  res.success({ data :createdPatientMedications });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of PatientMedications in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created PatientMedicationss. {status, message, data}
 */
const bulkInsertPatientMedications = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      let createdPatientMedications = await dbService.createMany(PatientMedications,dataToCreate); 
      return  res.success({ data :{ count :createdPatientMedications.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of PatientMedications from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found PatientMedications(s). {status, message, data}
 */
const findAllPatientMedications = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPatientMedications;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      PatientMedicationsSchemaKey.findFilterKeys,
      PatientMedications.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPatientMedications = await dbService.count(PatientMedications, query);
      if (!foundPatientMedications) {
        return res.recordNotFound();
      } 
      foundPatientMedications = { totalRecords: foundPatientMedications };
      return res.success({ data :foundPatientMedications });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPatientMedications = await dbService.paginate( PatientMedications,query,options);
    if (!foundPatientMedications){
      return res.recordNotFound();
    }
    return res.success({ data:foundPatientMedications }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of PatientMedications from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found PatientMedications. {status, message, data}
 */
const getPatientMedications = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPatientMedications = await dbService.findOne(PatientMedications,{ id :id });
    if (!foundPatientMedications){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPatientMedications });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of PatientMedications.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPatientMedicationsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      PatientMedicationsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPatientMedications = await dbService.count(PatientMedications,where);
    if (!countedPatientMedications){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPatientMedications } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of PatientMedications with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated PatientMedications.
 * @return {Object} : updated PatientMedications. {status, message, data}
 */
const updatePatientMedications = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      PatientMedicationsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPatientMedications = await dbService.update(PatientMedications,query,dataToUpdate);
    return  res.success({ data :updatedPatientMedications }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of PatientMedications with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated PatientMedicationss.
 * @return {Object} : updated PatientMedicationss. {status, message, data}
 */
const bulkUpdatePatientMedications = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {};
    }
    let updatedPatientMedications = await dbService.update(PatientMedications,filter,dataToUpdate);
    if (!updatedPatientMedications){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPatientMedications.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of PatientMedications with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated PatientMedications.
 * @return {Object} : updated PatientMedications. {status, message, data}
 */
const partialUpdatePatientMedications = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      PatientMedicationsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPatientMedications = await dbService.update(PatientMedications, query, dataToUpdate);
    if (!updatedPatientMedications) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPatientMedications });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of PatientMedications from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of PatientMedications.
 * @return {Object} : deactivated PatientMedications. {status, message, data}
 */
const softDeletePatientMedications = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = { isDeleted: true, };
    let result = await dbService.update(PatientMedications, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of PatientMedications from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted PatientMedications. {status, message, data}
 */
const deletePatientMedications = async (req, res) => {
  const result = await dbService.deleteByPk(PatientMedications, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of PatientMedications in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPatientMedications = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedPatientMedications = await dbService.destroy(PatientMedications,query);
    return res.success({ data :{ count :deletedPatientMedications.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of PatientMedications from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of PatientMedications.
 * @return {Object} : number of deactivated documents of PatientMedications. {status, message, data}
 */
const softDeleteManyPatientMedications = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    const options = {};
    let updatedPatientMedications = await dbService.update(PatientMedications,query,updateBody, options);
    if (!updatedPatientMedications) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedPatientMedications.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPatientMedications,
  bulkInsertPatientMedications,
  findAllPatientMedications,
  getPatientMedications,
  getPatientMedicationsCount,
  updatePatientMedications,
  bulkUpdatePatientMedications,
  partialUpdatePatientMedications,
  softDeletePatientMedications,
  deletePatientMedications,
  deleteManyPatientMedications,
  softDeleteManyPatientMedications,
};
