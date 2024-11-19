/**
 * Appointments.js
 * @description :: sequelize model of database table Appointments
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const PatientsEnum = require('../constants/Patients');
let Appointments = sequelize.define('Appointments',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  AppointmentID:{
    type:DataTypes.INTEGER,
    primaryKey:true
  },
  PatientID:{ type:DataTypes.INTEGER },
  StaffID:{ type:DataTypes.INTEGER },
  DepartmentID:{ type:DataTypes.INTEGER },
  AppointmentDateTime:{ type:DataTypes.DATE },
  Purpose:{ type:DataTypes.CHAR },
        
  Status:{
    type:DataTypes.ENUM,
    defaultValue:PatientsEnum.AppointmentStatus.Scheduled,
    values:convertObjectToEnum(PatientsEnum.AppointmentStatus)
  },
  Notes:{ type:DataTypes.TEXT },
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
      async function (Appointments,options){
        Appointments.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Appointments,options){
        if (Appointments !== undefined && Appointments.length) { 
          for (let index = 0; index < Appointments.length; index++) { 
        
            const element = Appointments[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Appointments.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Appointments);
sequelizePaginate.paginate(Appointments);
module.exports = Appointments;
