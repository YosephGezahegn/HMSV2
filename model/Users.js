/**
 * Users.js
 * @description :: sequelize model of database table Users
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Users = sequelize.define('Users',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  username:{ type:DataTypes.STRING },
  password_hash:{ type:DataTypes.CHAR },
  StaffID:{
    type:DataTypes.INTEGER,
    unique:true
  },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  isDeleted:{ type:DataTypes.BOOLEAN }
}
,{
  hooks:{
    beforeCreate: [
      async function (Users,options){
        Users.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Users,options){
        if (Users !== undefined && Users.length) { 
          for (let index = 0; index < Users.length; index++) { 
        
            const element = Users[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Users.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Users);
sequelizePaginate.paginate(Users);
module.exports = Users;
