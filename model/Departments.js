/**
 * Departments.js
 * @description :: sequelize model of database table Departments
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const PatientsEnum = require('../constants/Patients');
let Departments = sequelize.define('Departments',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  DepartmentID:{
    type:DataTypes.INTEGER,
    primaryKey:true
  },
  DepartmentName:{ type:DataTypes.CHAR },
  Location:{ type:DataTypes.CHAR },
  Phone:{ type:DataTypes.STRING },
  Email:{ type:DataTypes.CHAR },
  Head:{ type:DataTypes.INTEGER },
  FloorNumber:{ type:DataTypes.INTEGER },
  DepartmentInfo:{ type:DataTypes.TEXT },
  NumberOfBeds:{ type:DataTypes.INTEGER },
  IsActive:{ type:DataTypes.INTEGER },
     
  AccreditationStatus:{
    type:DataTypes.ENUM,
    values:convertObjectToEnum(PatientsEnum.AccreditationStatus)
  },
  EstablishedDate:{ type:DataTypes.DATEONLY },
  LastRenovationDate:{ type:DataTypes.DATEONLY },
  Budget:{ type:DataTypes.DECIMAL },
  NumberOfEmployees:{ type:DataTypes.INTEGER },
  OpeningTime:{ type:DataTypes.DATE },
  ClosingTime:{ type:DataTypes.DATE },
  added_by:{ type:DataTypes.INTEGER },
  updated_by:{ type:DataTypes.INTEGER },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  isDeleted:{ type:DataTypes.BOOLEAN }
}
,{
  hooks:{
    beforeCreate: [
      async function (Departments,options){
        Departments.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Departments,options){
        if (Departments !== undefined && Departments.length) { 
          for (let index = 0; index < Departments.length; index++) { 
        
            const element = Departments[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Departments.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Departments);
sequelizePaginate.paginate(Departments);
module.exports = Departments;
