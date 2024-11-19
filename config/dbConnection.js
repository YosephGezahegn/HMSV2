/**
 * dbConnection.js
 * @description :: database connection using sequelize with error handling
 */

const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('./db');

// Initialize Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  logging: false, // Disable logging in production for performance
});

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
};

// Run the connection test
testConnection();

module.exports = sequelize;