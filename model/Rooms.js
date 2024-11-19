/**
 * Rooms.js
 * @description :: sequelize model of database table Rooms
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const PatientsEnum = require('../constants/Patients');
let Rooms = sequelize.define('Rooms',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  RoomNumber:{
    type:DataTypes.INTEGER,
    primaryKey:true
  },
  RoomType:{ type:DataTypes.CHAR },
  Capacity:{ type:DataTypes.INTEGER },
        
  AvailabilityStatus:{
    type:DataTypes.ENUM,
    defaultValue:PatientsEnum.AvailabilityStatus.Occupied,
    values:convertObjectToEnum(PatientsEnum.AvailabilityStatus)
  },
  FacilitiesAvailable:{ type:DataTypes.TEXT },
  CleanlinessStatus:{ type:DataTypes.STRING },
  AssignedNurseID:{ type:DataTypes.INTEGER },
  AssignedDoctorID:{ type:DataTypes.INTEGER },
  AdmitDate:{ type:DataTypes.DATEONLY },
  DischargeDate:{ type:DataTypes.DATEONLY },
  LastCleaningDate:{ type:DataTypes.DATEONLY },
  NextCleaningDate:{ type:DataTypes.DATEONLY },
  Comments:{ type:DataTypes.TEXT },
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
      async function (Rooms,options){
        Rooms.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Rooms,options){
        if (Rooms !== undefined && Rooms.length) { 
          for (let index = 0; index < Rooms.length; index++) { 
        
            const element = Rooms[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Rooms.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Rooms);
sequelizePaginate.paginate(Rooms);
module.exports = Rooms;
