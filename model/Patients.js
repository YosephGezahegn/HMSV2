/**
 * Patients.js
 * @description :: sequelize model of database table Patients
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const PatientsEnum = require('../constants/Patients');
let Patients = sequelize.define('Patients',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  PatientID:{
    type:DataTypes.INTEGER,
    primaryKey:true
  },
  First_Name:{ type:DataTypes.CHAR },
  Last_Name:{ type:DataTypes.CHAR },
  Date_Of_Birth:{ type:DataTypes.DATEONLY },
        
  Gender:{
    type:DataTypes.ENUM,
    defaultValue:PatientsEnum.Gender.Male,
    values:convertObjectToEnum(PatientsEnum.Gender)
  },
  Address:{ type:DataTypes.CHAR },
  City:{ type:DataTypes.CHAR },
  State:{ type:DataTypes.CHAR },
  Zip_Code:{ type:DataTypes.STRING },
  Contact_Number:{ type:DataTypes.STRING },
  Email:{ type:DataTypes.CHAR },
  Insurance_Details:{ type:DataTypes.TEXT },
  Emergency_Contact_Name:{ type:DataTypes.CHAR },
  Emergency_Contact_Number:{ type:DataTypes.STRING },
  Medical_History:{ type:DataTypes.TEXT },
        
  Blood_Type:{
    type:DataTypes.ENUM,
    defaultValue:PatientsEnum.BloodType.AP,
    values:convertObjectToEnum(PatientsEnum.BloodType)
  },
  Height:{ type:DataTypes.DECIMAL },
  Weight:{ type:DataTypes.DECIMAL },
  Chronic_Conditions:{ type:DataTypes.TEXT },
  Family_History:{ type:DataTypes.TEXT },
  Surgical_History:{ type:DataTypes.TEXT },
  Social_History:{ type:DataTypes.TEXT },
  Immunization_History:{ type:DataTypes.TEXT },
  Primary_Care_Provider:{ type:DataTypes.CHAR },
        
  Employment_Status:{
    type:DataTypes.ENUM,
    defaultValue:PatientsEnum.EmploymentStatus.Employed,
    values:convertObjectToEnum(PatientsEnum.EmploymentStatus)
  },
  Employer:{ type:DataTypes.CHAR },
        
  Marital_Status:{
    type:DataTypes.ENUM,
    defaultValue:PatientsEnum.MaritalStatus.Married,
    values:convertObjectToEnum(PatientsEnum.MaritalStatus)
  },
  Spouse_Name:{ type:DataTypes.CHAR },
  Spouse_DOB:{ type:DataTypes.DATEONLY },
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
      async function (Patients,options){
      // Ensure Email is in lowercase
        if (this.Email) {
          this.Email = this.Email.toLowerCase();
        }
        next();
      },
      async function (Patients,options){
        Patients.isDeleted = false;

      },
    ],
    beforeDestroy: [
      async function (Patients,options){
        this.model('PatientAllergies').deleteMany({ PatientID: this.PatientID }, next);
      },
    ],
    beforeValidate: [
      async function (Patients,options){
      // Custom validation logic
        if (this.Weight <= 0) {
          return next(new Error('Weight must be a positive number.'));
        }
        next();
      },
    ],
    beforeBulkCreate: [
      async function (Patients,options){
        if (Patients !== undefined && Patients.length) { 
          for (let index = 0; index < Patients.length; index++) { 
        
            const element = Patients[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Patients.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Patients);
sequelizePaginate.paginate(Patients);
module.exports = Patients;
