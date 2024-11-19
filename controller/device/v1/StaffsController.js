/**
 * StaffsController.js
 * @description :: exports action methods for Staffs.
 */

const Staffs = require('../../../model/Staffs');
const StaffsSchemaKey = require('../../../utils/validation/StaffsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

/**
 * @description : create record of Staffs in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Staffs. {status, message, data}
 */ 
const addStaffs = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      StaffsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
        
    let createdStaffs = await dbService.createOne(Staffs,dataToCreate);
    return  res.success({ data :createdStaffs });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Staffs in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Staffss. {status, message, data}
 */
const bulkInsertStaffs = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      let createdStaffs = await dbService.createMany(Staffs,dataToCreate); 
      return  res.success({ data :{ count :createdStaffs.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Staffs from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Staffs(s). {status, message, data}
 */
const findAllStaffs = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundStaffs;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      StaffsSchemaKey.findFilterKeys,
      Staffs.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundStaffs = await dbService.count(Staffs, query);
      if (!foundStaffs) {
        return res.recordNotFound();
      } 
      foundStaffs = { totalRecords: foundStaffs };
      return res.success({ data :foundStaffs });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundStaffs = await dbService.paginate( Staffs,query,options);
    if (!foundStaffs){
      return res.recordNotFound();
    }
    return res.success({ data:foundStaffs }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Staffs from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Staffs. {status, message, data}
 */
const getStaffs = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundStaffs = await dbService.findOne(Staffs,{ id :id });
    if (!foundStaffs){
      return res.recordNotFound();
    }
    return  res.success({ data :foundStaffs });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Staffs.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getStaffsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      StaffsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedStaffs = await dbService.count(Staffs,where);
    if (!countedStaffs){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedStaffs } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Staffs with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Staffs.
 * @return {Object} : updated Staffs. {status, message, data}
 */
const updateStaffs = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      StaffsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedStaffs = await dbService.update(Staffs,query,dataToUpdate);
    return  res.success({ data :updatedStaffs }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Staffs with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Staffss.
 * @return {Object} : updated Staffss. {status, message, data}
 */
const bulkUpdateStaffs = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {};
    }
    let updatedStaffs = await dbService.update(Staffs,filter,dataToUpdate);
    if (!updatedStaffs){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedStaffs.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Staffs with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Staffs.
 * @return {Object} : updated Staffs. {status, message, data}
 */
const partialUpdateStaffs = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      StaffsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedStaffs = await dbService.update(Staffs, query, dataToUpdate);
    if (!updatedStaffs) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedStaffs });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Staffs from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Staffs.
 * @return {Object} : deactivated Staffs. {status, message, data}
 */
const softDeleteStaffs = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedStaffs = await deleteDependentService.softDeleteStaffs(query, updateBody);
    if (!updatedStaffs){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedStaffs });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Staffs from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Staffs. {status, message, data}
 */
const deleteStaffs = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedStaffs = await deleteDependentService.countStaffs(query);
      if (!countedStaffs){
        return res.recordNotFound();
      }
      return res.success({ data :countedStaffs });
    }
    let deletedStaffs = await deleteDependentService.deleteUser(query);
    if (!deletedStaffs){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedStaffs });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Staffs in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyStaffs = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedStaffs = await deleteDependentService.countStaffs(query);
      if (!countedStaffs) {
        return res.recordNotFound();
      }
      return res.success({ data: countedStaffs });            
    }
    let deletedStaffs = await deleteDependentService.deleteStaffs(query);
    if (!deletedStaffs) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedStaffs });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Staffs from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Staffs.
 * @return {Object} : number of deactivated documents of Staffs. {status, message, data}
 */
const softDeleteManyStaffs = async (req, res) => {
  try {
    let dataToUpdate = req.body;
    let query = {};
    if (!req.params || !req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }            
    query = { id:{ $in:dataToUpdate.ids } };
    const updateBody = { isDeleted: true, };
    let updatedStaffs = await deleteDependentService.softDeleteStaffs(query, updateBody);
    if (!updatedStaffs) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedStaffs });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addStaffs,
  bulkInsertStaffs,
  findAllStaffs,
  getStaffs,
  getStaffsCount,
  updateStaffs,
  bulkUpdateStaffs,
  partialUpdateStaffs,
  softDeleteStaffs,
  deleteStaffs,
  deleteManyStaffs,
  softDeleteManyStaffs,
};
