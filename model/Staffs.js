/**
 * Staffs.js
 * @description :: sequelize model of database table Staffs
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const PatientsEnum = require('../constants/Patients');
let Staffs = sequelize.define('Staffs',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  StaffID:{
    type:DataTypes.INTEGER,
    primaryKey:true
  },
  First_Name:{ type:DataTypes.CHAR },
  Last_Name:{ type:DataTypes.CHAR },
        
  Gender:{
    type:DataTypes.ENUM,
    defaultValue:PatientsEnum.Gender.Male,
    values:convertObjectToEnum(PatientsEnum.Gender)
  },
        
  Job_Position:{
    type:DataTypes.ENUM,
    defaultValue:PatientsEnum.JobPosition.Doctor,
    values:convertObjectToEnum(PatientsEnum.JobPosition)
  },
  DepartmentID:{ type:DataTypes.INTEGER },
  Contact_Number:{ type:DataTypes.STRING },
  Email:{ type:DataTypes.CHAR },
  Address:{ type:DataTypes.CHAR },
  City:{ type:DataTypes.CHAR },
  State:{ type:DataTypes.CHAR },
  Zip_Code:{ type:DataTypes.STRING },
  Qualifications:{ type:DataTypes.CHAR },
  Hire_Date:{ type:DataTypes.DATEONLY },
  Salary:{ type:DataTypes.DECIMAL },
  Shift:{ type:DataTypes.CHAR },
  License_Number:{ type:DataTypes.CHAR },
  Specialization:{ type:DataTypes.CHAR },
  Emergency_Contact_Name:{ type:DataTypes.CHAR },
  Emergency_Contact_Number:{ type:DataTypes.STRING },
  Certification:{ type:DataTypes.TEXT },
  Training_Program:{ type:DataTypes.CHAR },
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
      async function (Staffs,options){
        Staffs.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Staffs,options){
        if (Staffs !== undefined && Staffs.length) { 
          for (let index = 0; index < Staffs.length; index++) { 
        
            const element = Staffs[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Staffs.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Staffs);
sequelizePaginate.paginate(Staffs);
module.exports = Staffs;
