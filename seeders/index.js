/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */
const model = require('../model');
const dbService = require('../utils/dbService');
const bcrypt = require('bcrypt');
const authConstant = require('../constants/authConstant');
const { replaceAll } = require('../utils/common');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = await dbService.findOne(model.user,{ 'username':'Linnea.Lebsack' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'lk8jTBNhuNXwk9W',
        'isDeleted':false,
        'username':'Linnea.Lebsack',
        'email':'Martin.Koss@yahoo.com',
        'userType':authConstant.USER_TYPES.User
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'lk8jTBNhuNXwk9W',
        'isDeleted':false,
        'username':'Linnea.Lebsack',
        'email':'Martin.Koss@yahoo.com',
        'userType':authConstant.USER_TYPES.User
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'username':'Linnea.Lebsack' }, userToBeInserted);
    }
    userToBeInserted = await dbService.findOne(model.user,{ 'username':'Rachael.Gerlach93' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'i7YL_JUqZA9TUKZ',
        'isDeleted':false,
        'username':'Rachael.Gerlach93',
        'email':'Ephraim_Lubowitz@gmail.com',
        'userType':authConstant.USER_TYPES.Admin
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'i7YL_JUqZA9TUKZ',
        'isDeleted':false,
        'username':'Rachael.Gerlach93',
        'email':'Ephraim_Lubowitz@gmail.com',
        'userType':authConstant.USER_TYPES.Admin
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'username':'Rachael.Gerlach93' }, userToBeInserted);
    }
    console.info('User model seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
  
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'Admin', 'User', 'System_User' ];
    const insertedRoles = await dbService.findAll(model.role, { code: { $in: roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.createMany(model.role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes) {
      let routeName = '';
      const dbRoutes = await dbService.findAll(model.projectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.createMany(model.projectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/admissions/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admissions/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/admissions/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admissions/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admissions/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/admissions/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admissions/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admissions/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/admissions/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admissions/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/admissions/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/admissions/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/admissions/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admissions/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/admissions/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admissions/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/admissions/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/admissions/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admissions/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admissions/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/admissions/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admissions/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/admissions/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/admissions/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admissions/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admissions/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/admissions/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admissions/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admissions/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/admissions/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admissions/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/admissions/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/admissions/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/admissions/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/admissions/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/admissions/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointments/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/appointments/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/appointments/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointments/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/appointments/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/appointments/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointments/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/appointments/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/appointments/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointments/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/appointments/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/appointments/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/appointments/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/appointments/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/appointments/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointments/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/appointments/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/appointments/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointments/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/appointments/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/appointments/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointments/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/appointments/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/appointments/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointments/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/appointments/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/appointments/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointments/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/appointments/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/appointments/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointments/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/appointments/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/appointments/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/appointments/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/appointments/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/appointments/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/departments/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/departments/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/departments/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/departments/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/departments/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/departments/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/departments/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/departments/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/departments/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/departments/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/departments/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/departments/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/departments/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/departments/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/departments/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/departments/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/departments/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/departments/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/departments/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/departments/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/departments/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/departments/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/departments/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/departments/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/departments/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/departments/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/departments/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/departments/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagements/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagements/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagements/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagements/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagements/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagements/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagements/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagements/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagements/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagements/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/financialmanagements/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/admin/financialmanagements/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/financialmanagements/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagements/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagements/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagements/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagements/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagements/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagements/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagements/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagements/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagements/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagements/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagements/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagements/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagements/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagements/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagements/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagements/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagements/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagements/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/financialmanagements/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/financialmanagements/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/financialmanagements/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagements/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagements/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/inpatients/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/inpatients/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/inpatients/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/inpatients/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/inpatients/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/inpatients/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/inpatients/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/inpatients/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/inpatients/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/inpatients/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/inpatients/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/inpatients/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/inpatients/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/inpatients/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/inpatients/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/inpatients/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/inpatients/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/inpatients/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/inpatients/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/inpatients/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/inpatients/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/inpatients/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/inpatients/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/inpatients/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/inpatients/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/inpatients/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/inpatients/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/inpatients/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/inpatients/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/inpatients/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/inpatients/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/inpatients/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/inpatients/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/inpatients/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/inpatients/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/inpatients/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/medications/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/medications/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/medications/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/medications/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/medications/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/medications/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/medications/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/medications/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/medications/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/medications/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/medications/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/medications/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/medications/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/medications/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/medications/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/medications/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/medications/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/medications/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/medications/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/medications/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/medications/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/medications/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/medications/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/medications/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/medications/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/medications/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/medications/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/medications/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/medications/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/medications/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/medications/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/medications/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/medications/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/medications/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/medications/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/medications/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patientallergies/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/patientallergies/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/patientallergies/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patientallergies/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/patientallergies/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/patientallergies/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patientallergies/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/patientallergies/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/patientallergies/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patientallergies/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/patientallergies/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/patientallergies/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/patientallergies/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/patientallergies/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/patientallergies/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patientallergies/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/patientallergies/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/patientallergies/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patientallergies/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/patientallergies/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/patientallergies/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patientallergies/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/patientallergies/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/patientallergies/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patientallergies/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/patientallergies/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/patientallergies/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patientallergies/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/patientallergies/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/patientallergies/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patientallergies/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/patientallergies/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/patientallergies/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/patientallergies/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/patientallergies/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/patientallergies/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patientmedications/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/patientmedications/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/patientmedications/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patientmedications/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/patientmedications/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/patientmedications/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patientmedications/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/patientmedications/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/patientmedications/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patientmedications/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/patientmedications/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/patientmedications/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/patientmedications/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/patientmedications/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/patientmedications/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patientmedications/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/patientmedications/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/patientmedications/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patientmedications/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/patientmedications/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/patientmedications/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patientmedications/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/patientmedications/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/patientmedications/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patientmedications/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/patientmedications/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/patientmedications/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patientmedications/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/patientmedications/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/patientmedications/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patientmedications/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/patientmedications/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/patientmedications/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/patientmedications/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/patientmedications/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/patientmedications/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patients/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/patients/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/patients/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patients/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/patients/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/patients/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patients/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/patients/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/patients/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/patients/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/patients/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/patients/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/patients/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/patients/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/patients/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/patients/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/patients/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/patients/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patients/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/patients/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/patients/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patients/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/patients/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/patients/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patients/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/patients/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/patients/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patients/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/patients/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/patients/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patients/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/patients/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/patients/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/patients/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/patients/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/patients/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/rooms/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/rooms/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/rooms/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/rooms/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/rooms/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/rooms/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/rooms/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/rooms/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/rooms/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/rooms/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/rooms/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/rooms/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/rooms/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/rooms/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/rooms/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/rooms/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/rooms/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/rooms/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/rooms/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/rooms/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/rooms/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/rooms/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/staffs/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/staffs/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/staffs/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/staffs/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/staffs/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/staffs/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/staffs/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/staffs/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/staffs/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/staffs/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/staffs/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/staffs/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/staffs/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/staffs/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/staffs/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/staffs/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/staffs/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/staffs/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/staffs/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/staffs/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/staffs/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/staffs/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/staffs/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/staffs/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/staffs/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/staffs/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/staffs/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/staffs/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/staffs/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/staffs/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/staffs/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/staffs/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/staffs/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/staffs/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/staffs/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/staffs/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/users/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/users/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/users/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/users/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/users/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/users/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/users/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/users/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/users/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/users/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/users/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/users/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/users/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/users/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/users/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/users/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/users/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/users/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/users/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/users/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/users/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/users/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/users/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/users/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/users/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/users/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/users/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/users/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/users/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/users/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/users/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/users/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/users/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/users/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/users/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/users/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admissions/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admissions/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admissions/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admissions/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admissions/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admissions/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admissions/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admissions/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admissions/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admissions/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/admissions/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/admissions/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/admissions/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admissions/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admissions/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admissions/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admissions/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admissions/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admissions/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admissions/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admissions/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admissions/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admissions/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admissions/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admissions/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admissions/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admissions/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admissions/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admissions/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admissions/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admissions/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admissions/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admissions/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admissions/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admissions/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admissions/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointments/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointments/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointments/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointments/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointments/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointments/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointments/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointments/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointments/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointments/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/appointments/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/appointments/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/appointments/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointments/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointments/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointments/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointments/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointments/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointments/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointments/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointments/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointments/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointments/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointments/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointments/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointments/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointments/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointments/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointments/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointments/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointments/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/appointments/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/appointments/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/appointments/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointments/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointments/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/departments/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/departments/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/departments/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/departments/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/departments/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/departments/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagements/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagements/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagements/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagements/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagements/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagements/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagements/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagements/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagements/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagements/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/financialmanagements/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/financialmanagements/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/financialmanagements/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagements/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagements/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagements/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagements/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagements/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagements/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagements/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagements/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagements/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagements/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagements/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagements/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagements/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagements/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagements/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagements/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagements/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagements/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/financialmanagements/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/financialmanagements/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/financialmanagements/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagements/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagements/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatients/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatients/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatients/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatients/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatients/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatients/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatients/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatients/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatients/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatients/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/inpatients/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/inpatients/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/inpatients/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatients/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatients/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatients/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatients/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatients/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatients/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatients/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatients/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatients/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatients/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatients/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatients/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatients/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatients/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatients/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatients/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatients/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatients/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/inpatients/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/inpatients/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/inpatients/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatients/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatients/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medications/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medications/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medications/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medications/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medications/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medications/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medications/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medications/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medications/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medications/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/medications/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/medications/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/medications/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medications/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medications/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medications/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medications/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medications/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medications/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medications/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medications/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medications/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medications/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medications/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medications/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medications/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medications/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medications/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medications/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medications/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medications/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/medications/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/medications/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/medications/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medications/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medications/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientallergies/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientallergies/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientallergies/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientallergies/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientallergies/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientallergies/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientallergies/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientallergies/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientallergies/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientallergies/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/patientallergies/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/patientallergies/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/patientallergies/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientallergies/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientallergies/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientallergies/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientallergies/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientallergies/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientallergies/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientallergies/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientallergies/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientallergies/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientallergies/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientallergies/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientallergies/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientallergies/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientallergies/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientallergies/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientallergies/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientallergies/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientallergies/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/patientallergies/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/patientallergies/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/patientallergies/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientallergies/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientallergies/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientmedications/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientmedications/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientmedications/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientmedications/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientmedications/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientmedications/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientmedications/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientmedications/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientmedications/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientmedications/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/patientmedications/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/patientmedications/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/patientmedications/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientmedications/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientmedications/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientmedications/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientmedications/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientmedications/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientmedications/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientmedications/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientmedications/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientmedications/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientmedications/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientmedications/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientmedications/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientmedications/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientmedications/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientmedications/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientmedications/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientmedications/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patientmedications/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/patientmedications/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/patientmedications/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/patientmedications/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientmedications/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patientmedications/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/patients/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/patients/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/patients/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/patients/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/patients/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/patients/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/patients/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/rooms/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/rooms/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/rooms/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/rooms/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/rooms/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/rooms/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/rooms/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/rooms/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/rooms/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/rooms/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/rooms/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/rooms/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/rooms/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/rooms/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/rooms/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/rooms/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/rooms/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/rooms/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/rooms/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/rooms/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/rooms/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staffs/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staffs/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/staffs/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staffs/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staffs/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staffs/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staffs/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/staffs/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/staffs/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staffs/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/staffs/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/staffs/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/staffs/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/staffs/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/staffs/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staffs/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staffs/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staffs/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staffs/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staffs/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staffs/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staffs/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staffs/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staffs/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staffs/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staffs/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staffs/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staffs/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staffs/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staffs/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staffs/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/staffs/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/staffs/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/staffs/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staffs/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staffs/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/users/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/users/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/users/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/users/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/users/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/users/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/users/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/users/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/users/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/users/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/users/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/users/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/users/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admissions/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admissions/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admissions/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admissions/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admissions/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admissions/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admissions/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admissions/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admissions/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admissions/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/admissions/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/admissions/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/admissions/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admissions/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admissions/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admissions/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admissions/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admissions/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admissions/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admissions/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admissions/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admissions/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admissions/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admissions/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admissions/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admissions/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admissions/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admissions/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admissions/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admissions/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admissions/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/admissions/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/admissions/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/admissions/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admissions/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admissions/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointments/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointments/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointments/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointments/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointments/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointments/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointments/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointments/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointments/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointments/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/appointments/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/appointments/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/appointments/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointments/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointments/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointments/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointments/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointments/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointments/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointments/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointments/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointments/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointments/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointments/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointments/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointments/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointments/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointments/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointments/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointments/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointments/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/appointments/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/appointments/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/appointments/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointments/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointments/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/departments/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/departments/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/departments/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/departments/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/departments/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/departments/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/financialmanagements/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/financialmanagements/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/financialmanagements/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/financialmanagements/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/financialmanagements/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/financialmanagements/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/financialmanagements/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/financialmanagements/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/financialmanagements/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/financialmanagements/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/financialmanagements/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/financialmanagements/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/financialmanagements/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/financialmanagements/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/financialmanagements/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/financialmanagements/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/financialmanagements/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/financialmanagements/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/financialmanagements/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/financialmanagements/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/financialmanagements/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/financialmanagements/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/financialmanagements/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/financialmanagements/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/financialmanagements/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/financialmanagements/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/financialmanagements/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/financialmanagements/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/financialmanagements/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/financialmanagements/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/financialmanagements/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/financialmanagements/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/financialmanagements/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/financialmanagements/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/financialmanagements/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/financialmanagements/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/inpatients/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/inpatients/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/inpatients/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/inpatients/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/inpatients/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/inpatients/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/inpatients/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/inpatients/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/inpatients/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/inpatients/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/inpatients/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/inpatients/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/inpatients/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/inpatients/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/inpatients/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/inpatients/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/inpatients/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/inpatients/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/inpatients/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/inpatients/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/inpatients/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/inpatients/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/inpatients/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/inpatients/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/inpatients/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/inpatients/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/inpatients/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/inpatients/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/inpatients/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/inpatients/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/inpatients/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/inpatients/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/inpatients/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/inpatients/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/inpatients/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/inpatients/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/medications/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/medications/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/medications/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/medications/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/medications/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/medications/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/medications/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/medications/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/medications/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/medications/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/medications/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/medications/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/medications/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/medications/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/medications/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/medications/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/medications/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/medications/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/medications/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/medications/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/medications/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/medications/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/medications/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/medications/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/medications/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/medications/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/medications/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/medications/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/medications/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/medications/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/medications/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/medications/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/medications/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/medications/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/medications/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/medications/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientallergies/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientallergies/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientallergies/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientallergies/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientallergies/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientallergies/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientallergies/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientallergies/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientallergies/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientallergies/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/patientallergies/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/patientallergies/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/patientallergies/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientallergies/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientallergies/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientallergies/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientallergies/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientallergies/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientallergies/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientallergies/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientallergies/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientallergies/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientallergies/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientallergies/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientallergies/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientallergies/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientallergies/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientallergies/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientallergies/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientallergies/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientallergies/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/patientallergies/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/patientallergies/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/patientallergies/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientallergies/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientallergies/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientmedications/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientmedications/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientmedications/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientmedications/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientmedications/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientmedications/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientmedications/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientmedications/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientmedications/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientmedications/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/patientmedications/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/patientmedications/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/patientmedications/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientmedications/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientmedications/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientmedications/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientmedications/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientmedications/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientmedications/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientmedications/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientmedications/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientmedications/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientmedications/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientmedications/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientmedications/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientmedications/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientmedications/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientmedications/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientmedications/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientmedications/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patientmedications/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/patientmedications/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/patientmedications/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/patientmedications/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientmedications/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patientmedications/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patients/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patients/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patients/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patients/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patients/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patients/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patients/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patients/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/patients/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patients/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/patients/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/patients/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/patients/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patients/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patients/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patients/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patients/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patients/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patients/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patients/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patients/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patients/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patients/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patients/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patients/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patients/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patients/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patients/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patients/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patients/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patients/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/patients/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/patients/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/patients/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patients/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patients/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/rooms/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/rooms/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/rooms/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/rooms/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/rooms/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/rooms/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/rooms/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/rooms/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/rooms/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/rooms/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/rooms/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/rooms/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/rooms/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/rooms/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/rooms/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/rooms/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/rooms/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/rooms/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/rooms/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/rooms/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/rooms/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/rooms/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/rooms/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/rooms/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/rooms/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/rooms/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/rooms/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/rooms/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/rooms/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/rooms/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/rooms/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/rooms/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/rooms/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/rooms/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/rooms/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/rooms/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/staffs/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/staffs/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/staffs/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/staffs/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/staffs/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/staffs/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/staffs/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/staffs/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/staffs/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/staffs/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/staffs/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/staffs/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/staffs/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/staffs/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/staffs/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/staffs/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/staffs/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/staffs/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/staffs/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/staffs/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/staffs/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/staffs/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/staffs/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/staffs/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/staffs/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/staffs/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/staffs/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/staffs/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/staffs/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/staffs/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/staffs/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/staffs/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/staffs/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/staffs/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/staffs/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/staffs/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/users/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/users/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/users/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/users/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/users/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/users/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/users/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/users/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/users/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/users/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/users/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/users/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/users/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'Admin', 'User', 'System_User' ];
      const insertedProjectRoute = await dbService.findAll(model.projectRoute, {
        uri: { $in: routes },
        method: { $in: routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findAll(model.role, {
        code: { $in: roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};
    
      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(model.routeRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.createMany(model.routeRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'username':'Linnea.Lebsack',
      'password':'lk8jTBNhuNXwk9W'
    },{
      'username':'Rachael.Gerlach93',
      'password':'i7YL_JUqZA9TUKZ'
    }];
    const defaultRoles = await dbService.findAll(model.role);
    const insertedUsers = await dbService.findAll(model.user, { username: { $in: userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN').id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER').id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER').id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(model.userRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.createMany(model.userRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('UserRole seeder failed due to ', error.message);
  }
}

/* calls of functions to seed mock data into multiple collections */
async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
};
module.exports = seedData;