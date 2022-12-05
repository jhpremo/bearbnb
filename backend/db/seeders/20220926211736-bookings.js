'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    return queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        userId: 1,
        startDate: "2022-11-19",
        endDate: "2022-11-20"
      },
      {
        spotId: 3,
        userId: 2,
        startDate: "2022-12-05",
        endDate: "2022-12-15"
      },
      {
        spotId: 1,
        userId: 3,
        startDate: "2023-01-12",
        endDate: "2023-01-17"
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    return queryInterface.bulkDelete(options)
  }
};
