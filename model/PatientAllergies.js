/**
 * PatientAllergies.js
 * @description :: sequelize model of database table PatientAllergies
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let PatientAllergies = sequelize.define('PatientAllergies',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  PatientID:{
    type:DataTypes.INTEGER,
    primaryKey:true
  },
  Allergy:{ type:DataTypes.CHAR },
  isDeleted:{ type:DataTypes.BOOLEAN }
}
,{
  hooks:{
    beforeCreate: [
      async function (PatientAllergies,options){
        PatientAllergies.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (PatientAllergies,options){
        if (PatientAllergies !== undefined && PatientAllergies.length) { 
          for (let index = 0; index < PatientAllergies.length; index++) { 
        
            const element = PatientAllergies[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
PatientAllergies.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(PatientAllergies);
sequelizePaginate.paginate(PatientAllergies);
module.exports = PatientAllergies;
