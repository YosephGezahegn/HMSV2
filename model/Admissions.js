/**
 * Admissions.js
 * @description :: sequelize model of database table Admissions
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const PatientsEnum = require('../constants/Patients');
let Admissions = sequelize.define('Admissions',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  AdmissionID:{
    type:DataTypes.INTEGER,
    primaryKey:true
  },
  PatientID:{ type:DataTypes.INTEGER },
  RoomNumber:{ type:DataTypes.INTEGER },
  AdmitDate:{ type:DataTypes.DATEONLY },
  DischargeDate:{ type:DataTypes.DATEONLY },
        
  AdmissionStatus:{
    type:DataTypes.ENUM,
    defaultValue:PatientsEnum.AdmissionStatus.Admitted,
    values:convertObjectToEnum(PatientsEnum.AdmissionStatus)
  },
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
      async function (Admissions,options){
        Admissions.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Admissions,options){
        if (Admissions !== undefined && Admissions.length) { 
          for (let index = 0; index < Admissions.length; index++) { 
        
            const element = Admissions[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Admissions.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Admissions);
sequelizePaginate.paginate(Admissions);
module.exports = Admissions;
