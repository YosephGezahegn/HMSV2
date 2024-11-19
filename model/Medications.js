/**
 * Medications.js
 * @description :: sequelize model of database table Medications
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const PatientsEnum = require('../constants/Patients');
let Medications = sequelize.define('Medications',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  MedicationID:{
    type:DataTypes.INTEGER,
    primaryKey:true
  },
  MedicationName:{ type:DataTypes.CHAR },
  DosageAmount:{ type:DataTypes.DECIMAL },
  DosageUnit:{ type:DataTypes.CHAR },
  Frequency:{ type:DataTypes.CHAR },
  PrescriptionDetails:{ type:DataTypes.TEXT },
  Manufacturer:{ type:DataTypes.CHAR },
  ExpiryDate:{ type:DataTypes.DATEONLY },
  StorageConditions:{ type:DataTypes.CHAR },
  PrescribingDoctorID:{ type:DataTypes.INTEGER },
  PrescriptionDate:{ type:DataTypes.DATEONLY },
  PrescriptionNotes:{ type:DataTypes.TEXT },
  RefillCount:{ type:DataTypes.INTEGER },
  RouteOfAdministration:{ type:DataTypes.CHAR },
  AdministrationTime:{ type:DataTypes.DATE },
        
  MedicationStatus:{
    type:DataTypes.ENUM,
    defaultValue:PatientsEnum.MedicationStatus.Prescribed,
    values:convertObjectToEnum(PatientsEnum.MedicationStatus)
  },
  SideEffects:{ type:DataTypes.TEXT },
  DrugInteractions:{ type:DataTypes.TEXT },
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
      async function (Medications,options){
        Medications.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Medications,options){
        if (Medications !== undefined && Medications.length) { 
          for (let index = 0; index < Medications.length; index++) { 
        
            const element = Medications[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Medications.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Medications);
sequelizePaginate.paginate(Medications);
module.exports = Medications;
