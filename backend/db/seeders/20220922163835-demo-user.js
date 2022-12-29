'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users'
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Todd',
        lastName: 'Jones',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jamie',
        lastName: 'Smith',
        email: 'user1@user.io',
        username: 'demo-user',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Melissa',
        lastName: 'Jones',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Anon',
        lastName: 'booker',
        email: 'booker@user.io',
        username: 'IBookSpots',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users'
    return queryInterface.bulkDelete(options);
  }
};
