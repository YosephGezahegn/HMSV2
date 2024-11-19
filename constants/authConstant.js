/**
 * authConstant.js
 * @description :: constants used in authentication
 */

const JWT = {
  ADMIN_SECRET:'myjwtadminsecret',
  DEVICE_SECRET:'myjwtdevicesecret',
  CLIENT_SECRET:'myjwtclientsecret',
  EXPIRES_IN: 10000
};

const USER_TYPES = {
  User:1,
  Admin:2,
};

const PLATFORM = {
  ADMIN:1,
  DEVICE:2,
  CLIENT:3,
};

let LOGIN_ACCESS = {
  [USER_TYPES.Admin]:[PLATFORM.ADMIN],        
  [USER_TYPES.User]:[PLATFORM.DEVICE,PLATFORM.CLIENT],        
};

const MAX_LOGIN_RETRY_LIMIT = 4;
const LOGIN_REACTIVE_TIME = 10;   

const FORGOT_PASSWORD_WITH = {
  LINK: {
    email: true,
    sms: false
  },
  EXPIRE_TIME: 20
};

module.exports = {
  JWT,
  USER_TYPES,
  PLATFORM,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  FORGOT_PASSWORD_WITH,
  LOGIN_ACCESS,
};