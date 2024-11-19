/**
 * PatientMedications.js
 * @description :: sequelize model of database table PatientMedications
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let PatientMedications = sequelize.define('PatientMedications',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  PatientID:{
    type:DataTypes.INTEGER,
    primaryKey:true
  },
  MedicationID:{ type:DataTypes.INTEGER },
  isDeleted:{ type:DataTypes.BOOLEAN }
}
,{
  hooks:{
    beforeCreate: [
      async function (PatientMedications,options){
        PatientMedications.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (PatientMedications,options){
        if (PatientMedications !== undefined && PatientMedications.length) { 
          for (let index = 0; index < PatientMedications.length; index++) { 
        
            const element = PatientMedications[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
PatientMedications.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(PatientMedications);
sequelizePaginate.paginate(PatientMedications);
module.exports = PatientMedications;
