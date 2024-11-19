/**
 * FinancialManagements.js
 * @description :: sequelize model of database table FinancialManagements
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const PatientsEnum = require('../constants/Patients');
let FinancialManagements = sequelize.define('FinancialManagements',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  TransactionID:{
    type:DataTypes.INTEGER,
    primaryKey:true
  },
  PatientID:{ type:DataTypes.INTEGER },
  TransactionDate:{ type:DataTypes.DATE },
  Amount:{ type:DataTypes.DECIMAL },
        
  TransactionType:{
    type:DataTypes.ENUM,
    defaultValue:PatientsEnum.TransactionType.Payment,
    values:convertObjectToEnum(PatientsEnum.TransactionType)
  },
  ResponsibleStaffID:{ type:DataTypes.INTEGER },
  Is_Active:{ type:DataTypes.INTEGER },
  added_by:{ type:DataTypes.INTEGER },
  updated_by:{ type:DataTypes.INTEGER },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  isDeleted:{ type:DataTypes.BOOLEAN }
}
,{
  hooks:{
    beforeCreate: [
      async function (FinancialManagements,options){
        FinancialManagements.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (FinancialManagements,options){
        if (FinancialManagements !== undefined && FinancialManagements.length) { 
          for (let index = 0; index < FinancialManagements.length; index++) { 
        
            const element = FinancialManagements[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
FinancialManagements.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(FinancialManagements);
sequelizePaginate.paginate(FinancialManagements);
module.exports = FinancialManagements;
