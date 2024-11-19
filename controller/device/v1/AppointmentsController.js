/**
 * AppointmentsController.js
 * @description :: exports action methods for Appointments.
 */

const Appointments = require('../../../model/Appointments');
const AppointmentsSchemaKey = require('../../../utils/validation/AppointmentsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Appointments in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Appointments. {status, message, data}
 */ 
const addAppointments = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      AppointmentsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
        
    let createdAppointments = await dbService.createOne(Appointments,dataToCreate);
    return  res.success({ data :createdAppointments });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Appointments in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Appointmentss. {status, message, data}
 */
const bulkInsertAppointments = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      let createdAppointments = await dbService.createMany(Appointments,dataToCreate); 
      return  res.success({ data :{ count :createdAppointments.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Appointments from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Appointments(s). {status, message, data}
 */
const findAllAppointments = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAppointments;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      AppointmentsSchemaKey.findFilterKeys,
      Appointments.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAppointments = await dbService.count(Appointments, query);
      if (!foundAppointments) {
        return res.recordNotFound();
      } 
      foundAppointments = { totalRecords: foundAppointments };
      return res.success({ data :foundAppointments });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAppointments = await dbService.paginate( Appointments,query,options);
    if (!foundAppointments){
      return res.recordNotFound();
    }
    return res.success({ data:foundAppointments }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Appointments from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Appointments. {status, message, data}
 */
const getAppointments = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAppointments = await dbService.findOne(Appointments,{ id :id });
    if (!foundAppointments){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAppointments });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Appointments.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAppointmentsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      AppointmentsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAppointments = await dbService.count(Appointments,where);
    if (!countedAppointments){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAppointments } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Appointments with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Appointments.
 * @return {Object} : updated Appointments. {status, message, data}
 */
const updateAppointments = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      AppointmentsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAppointments = await dbService.update(Appointments,query,dataToUpdate);
    return  res.success({ data :updatedAppointments }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Appointments with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Appointmentss.
 * @return {Object} : updated Appointmentss. {status, message, data}
 */
const bulkUpdateAppointments = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {};
    }
    let updatedAppointments = await dbService.update(Appointments,filter,dataToUpdate);
    if (!updatedAppointments){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAppointments.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Appointments with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Appointments.
 * @return {Object} : updated Appointments. {status, message, data}
 */
const partialUpdateAppointments = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      AppointmentsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAppointments = await dbService.update(Appointments, query, dataToUpdate);
    if (!updatedAppointments) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAppointments });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Appointments from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Appointments.
 * @return {Object} : deactivated Appointments. {status, message, data}
 */
const softDeleteAppointments = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = { isDeleted: true, };
    let result = await dbService.update(Appointments, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Appointments from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Appointments. {status, message, data}
 */
const deleteAppointments = async (req, res) => {
  const result = await dbService.deleteByPk(Appointments, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Appointments in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAppointments = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAppointments = await dbService.destroy(Appointments,query);
    return res.success({ data :{ count :deletedAppointments.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Appointments from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Appointments.
 * @return {Object} : number of deactivated documents of Appointments. {status, message, data}
 */
const softDeleteManyAppointments = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    const options = {};
    let updatedAppointments = await dbService.update(Appointments,query,updateBody, options);
    if (!updatedAppointments) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAppointments.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAppointments,
  bulkInsertAppointments,
  findAllAppointments,
  getAppointments,
  getAppointmentsCount,
  updateAppointments,
  bulkUpdateAppointments,
  partialUpdateAppointments,
  softDeleteAppointments,
  deleteAppointments,
  deleteManyAppointments,
  softDeleteManyAppointments,
};
