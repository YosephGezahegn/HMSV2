/**
 * Inpatients.js
 * @description :: sequelize model of database table Inpatients
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Inpatients = sequelize.define('Inpatients',{
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
  AdmissionDate:{ type:DataTypes.DATEONLY },
  DischargeDate:{ type:DataTypes.DATEONLY },
  ReasonForAdmission:{ type:DataTypes.TEXT },
  ResponsibleStaffID:{ type:DataTypes.INTEGER },
  DailyNotes:{ type:DataTypes.TEXT },
  TreatmentPlan:{ type:DataTypes.TEXT },
  SurgeryDetails:{ type:DataTypes.TEXT },
  DischargeSummary:{ type:DataTypes.TEXT },
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
      async function (Inpatients,options){
        Inpatients.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Inpatients,options){
        if (Inpatients !== undefined && Inpatients.length) { 
          for (let index = 0; index < Inpatients.length; index++) { 
        
            const element = Inpatients[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Inpatients.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Inpatients);
sequelizePaginate.paginate(Inpatients);
module.exports = Inpatients;
