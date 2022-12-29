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
        spotId: 1,
        userId: 4,
        startDate: "2023-01-01",
        endDate: "2023-01-09"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-01-18",
        endDate: "2023-01-24"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-02-01",
        endDate: "2023-02-09"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-02-18",
        endDate: "2023-02-24"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-03-01",
        endDate: "2023-03-09"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-03-18",
        endDate: "2023-03-24"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-04-01",
        endDate: "2023-04-09"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-04-18",
        endDate: "2023-04-24"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-05-01",
        endDate: "2023-05-09"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-05-18",
        endDate: "2023-05-24"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-06-01",
        endDate: "2023-06-09"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-06-18",
        endDate: "2023-06-24"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-07-01",
        endDate: "2023-07-09"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-07-18",
        endDate: "2023-07-24"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-08-01",
        endDate: "2023-08-09"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-08-18",
        endDate: "2023-08-24"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-09-01",
        endDate: "2023-09-09"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-09-18",
        endDate: "2023-09-24"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-10-01",
        endDate: "2023-10-09"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-10-18",
        endDate: "2023-10-24"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-11-01",
        endDate: "2023-11-09"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-11-18",
        endDate: "2023-11-24"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-12-01",
        endDate: "2023-12-09"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-12-18",
        endDate: "2023-12-24"
      }, {
        spotId: 2,
        userId: 4,
        startDate: "2023-01-01",
        endDate: "2023-01-09"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-01-18",
        endDate: "2023-01-24"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-02-01",
        endDate: "2023-02-09"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-02-18",
        endDate: "2023-02-24"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-03-01",
        endDate: "2023-03-09"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-03-18",
        endDate: "2023-03-24"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-04-01",
        endDate: "2023-04-09"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-04-18",
        endDate: "2023-04-24"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-05-01",
        endDate: "2023-05-09"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-05-18",
        endDate: "2023-05-24"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-06-01",
        endDate: "2023-06-09"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-06-18",
        endDate: "2023-06-24"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-07-01",
        endDate: "2023-07-09"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-07-18",
        endDate: "2023-07-24"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-08-01",
        endDate: "2023-08-09"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-08-18",
        endDate: "2023-08-24"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-09-01",
        endDate: "2023-09-09"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-09-18",
        endDate: "2023-09-24"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-10-01",
        endDate: "2023-10-09"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-10-18",
        endDate: "2023-10-24"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-11-01",
        endDate: "2023-11-09"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-11-18",
        endDate: "2023-11-24"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-12-01",
        endDate: "2023-12-09"
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2023-12-18",
        endDate: "2023-12-24"
      }, {
        spotId: 3,
        userId: 4,
        startDate: "2023-01-01",
        endDate: "2023-01-09"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-01-18",
        endDate: "2023-01-24"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-02-01",
        endDate: "2023-02-09"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-02-18",
        endDate: "2023-02-24"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-03-01",
        endDate: "2023-03-09"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-03-18",
        endDate: "2023-03-24"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-04-01",
        endDate: "2023-04-09"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-04-18",
        endDate: "2023-04-24"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-05-01",
        endDate: "2023-05-09"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-05-18",
        endDate: "2023-05-24"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-06-01",
        endDate: "2023-06-09"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-06-18",
        endDate: "2023-06-24"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-07-01",
        endDate: "2023-07-09"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-07-18",
        endDate: "2023-07-24"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-08-01",
        endDate: "2023-08-09"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-08-18",
        endDate: "2023-08-24"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-09-01",
        endDate: "2023-09-09"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-09-18",
        endDate: "2023-09-24"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-10-01",
        endDate: "2023-10-09"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-10-18",
        endDate: "2023-10-24"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-11-01",
        endDate: "2023-11-09"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-11-18",
        endDate: "2023-11-24"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-12-01",
        endDate: "2023-12-09"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-12-18",
        endDate: "2023-12-24"
      }, {
        spotId: 4,
        userId: 4,
        startDate: "2023-01-01",
        endDate: "2023-01-09"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-01-18",
        endDate: "2023-01-24"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-02-01",
        endDate: "2023-02-09"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-02-18",
        endDate: "2023-02-24"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-03-01",
        endDate: "2023-03-09"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-03-18",
        endDate: "2023-03-24"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-04-01",
        endDate: "2023-04-09"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-04-18",
        endDate: "2023-04-24"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-05-01",
        endDate: "2023-05-09"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-05-18",
        endDate: "2023-05-24"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-06-01",
        endDate: "2023-06-09"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-06-18",
        endDate: "2023-06-24"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-07-01",
        endDate: "2023-07-09"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-07-18",
        endDate: "2023-07-24"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-08-01",
        endDate: "2023-08-09"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-08-18",
        endDate: "2023-08-24"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-09-01",
        endDate: "2023-09-09"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-09-18",
        endDate: "2023-09-24"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-10-01",
        endDate: "2023-10-09"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-10-18",
        endDate: "2023-10-24"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-11-01",
        endDate: "2023-11-09"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-11-18",
        endDate: "2023-11-24"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-12-01",
        endDate: "2023-12-09"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2023-12-18",
        endDate: "2023-12-24"
      }, {
        spotId: 1,
        userId: 4,
        startDate: "2023-01-01",
        endDate: "2023-01-09"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-01-18",
        endDate: "2023-01-24"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-02-01",
        endDate: "2023-02-09"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-02-18",
        endDate: "2023-02-24"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-03-01",
        endDate: "2023-03-09"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-03-18",
        endDate: "2023-03-24"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-04-01",
        endDate: "2023-04-09"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-04-18",
        endDate: "2023-04-24"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-05-01",
        endDate: "2023-05-09"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-05-18",
        endDate: "2023-05-24"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-06-01",
        endDate: "2023-06-09"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-06-18",
        endDate: "2023-06-24"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-07-01",
        endDate: "2023-07-09"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-07-18",
        endDate: "2023-07-24"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-08-01",
        endDate: "2023-08-09"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-08-18",
        endDate: "2023-08-24"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-09-01",
        endDate: "2023-09-09"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-09-18",
        endDate: "2023-09-24"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-10-01",
        endDate: "2023-10-09"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-10-18",
        endDate: "2023-10-24"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-11-01",
        endDate: "2023-11-09"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-11-18",
        endDate: "2023-11-24"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-12-01",
        endDate: "2023-12-09"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-12-18",
        endDate: "2023-12-24"
      }, {
        spotId: 6,
        userId: 4,
        startDate: "2023-01-01",
        endDate: "2023-01-09"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-01-18",
        endDate: "2023-01-24"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-02-01",
        endDate: "2023-02-09"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-02-18",
        endDate: "2023-02-24"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-03-01",
        endDate: "2023-03-09"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-03-18",
        endDate: "2023-03-24"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-04-01",
        endDate: "2023-04-09"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-04-18",
        endDate: "2023-04-24"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-05-01",
        endDate: "2023-05-09"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-05-18",
        endDate: "2023-05-24"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-06-01",
        endDate: "2023-06-09"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-06-18",
        endDate: "2023-06-24"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-07-01",
        endDate: "2023-07-09"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-07-18",
        endDate: "2023-07-24"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-08-01",
        endDate: "2023-08-09"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-08-18",
        endDate: "2023-08-24"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-09-01",
        endDate: "2023-09-09"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-09-18",
        endDate: "2023-09-24"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-10-01",
        endDate: "2023-10-09"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-10-18",
        endDate: "2023-10-24"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-11-01",
        endDate: "2023-11-09"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-11-18",
        endDate: "2023-11-24"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-12-01",
        endDate: "2023-12-09"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2023-12-18",
        endDate: "2023-12-24"
      }, {
        spotId: 7,
        userId: 4,
        startDate: "2023-01-01",
        endDate: "2023-01-09"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-01-18",
        endDate: "2023-01-24"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-02-01",
        endDate: "2023-02-09"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-02-18",
        endDate: "2023-02-24"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-03-01",
        endDate: "2023-03-09"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-03-18",
        endDate: "2023-03-24"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-04-01",
        endDate: "2023-04-09"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-04-18",
        endDate: "2023-04-24"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-05-01",
        endDate: "2023-05-09"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-05-18",
        endDate: "2023-05-24"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-06-01",
        endDate: "2023-06-09"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-06-18",
        endDate: "2023-06-24"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-07-01",
        endDate: "2023-07-09"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-07-18",
        endDate: "2023-07-24"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-08-01",
        endDate: "2023-08-09"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-08-18",
        endDate: "2023-08-24"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-09-01",
        endDate: "2023-09-09"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-09-18",
        endDate: "2023-09-24"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-10-01",
        endDate: "2023-10-09"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-10-18",
        endDate: "2023-10-24"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-11-01",
        endDate: "2023-11-09"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-11-18",
        endDate: "2023-11-24"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-12-01",
        endDate: "2023-12-09"
      },
      {
        spotId: 7,
        userId: 4,
        startDate: "2023-12-18",
        endDate: "2023-12-24"
      }, {
        spotId: 8,
        userId: 4,
        startDate: "2023-01-01",
        endDate: "2023-01-09"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-01-18",
        endDate: "2023-01-24"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-02-01",
        endDate: "2023-02-09"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-02-18",
        endDate: "2023-02-24"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-03-01",
        endDate: "2023-03-09"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-03-18",
        endDate: "2023-03-24"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-04-01",
        endDate: "2023-04-09"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-04-18",
        endDate: "2023-04-24"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-05-01",
        endDate: "2023-05-09"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-05-18",
        endDate: "2023-05-24"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-06-01",
        endDate: "2023-06-09"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-06-18",
        endDate: "2023-06-24"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-07-01",
        endDate: "2023-07-09"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-07-18",
        endDate: "2023-07-24"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-08-01",
        endDate: "2023-08-09"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-08-18",
        endDate: "2023-08-24"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-09-01",
        endDate: "2023-09-09"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-09-18",
        endDate: "2023-09-24"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-10-01",
        endDate: "2023-10-09"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-10-18",
        endDate: "2023-10-24"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-11-01",
        endDate: "2023-11-09"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-11-18",
        endDate: "2023-11-24"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-12-01",
        endDate: "2023-12-09"
      },
      {
        spotId: 8,
        userId: 4,
        startDate: "2023-12-18",
        endDate: "2023-12-24"
      }, {
        spotId: 9,
        userId: 4,
        startDate: "2023-01-01",
        endDate: "2023-01-09"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-01-18",
        endDate: "2023-01-24"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-02-01",
        endDate: "2023-02-09"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-02-18",
        endDate: "2023-02-24"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-03-01",
        endDate: "2023-03-09"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-03-18",
        endDate: "2023-03-24"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-04-01",
        endDate: "2023-04-09"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-04-18",
        endDate: "2023-04-24"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-05-01",
        endDate: "2023-05-09"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-05-18",
        endDate: "2023-05-24"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-06-01",
        endDate: "2023-06-09"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-06-18",
        endDate: "2023-06-24"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-07-01",
        endDate: "2023-07-09"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-07-18",
        endDate: "2023-07-24"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-08-01",
        endDate: "2023-08-09"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-08-18",
        endDate: "2023-08-24"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-09-01",
        endDate: "2023-09-09"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-09-18",
        endDate: "2023-09-24"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-10-01",
        endDate: "2023-10-09"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-10-18",
        endDate: "2023-10-24"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-11-01",
        endDate: "2023-11-09"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-11-18",
        endDate: "2023-11-24"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-12-01",
        endDate: "2023-12-09"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "2023-12-18",
        endDate: "2023-12-24"
      }, {
        spotId: 10,
        userId: 4,
        startDate: "2023-01-01",
        endDate: "2023-01-09"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-01-18",
        endDate: "2023-01-24"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-02-01",
        endDate: "2023-02-09"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-02-18",
        endDate: "2023-02-24"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-03-01",
        endDate: "2023-03-09"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-03-18",
        endDate: "2023-03-24"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-04-01",
        endDate: "2023-04-09"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-04-18",
        endDate: "2023-04-24"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-05-01",
        endDate: "2023-05-09"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-05-18",
        endDate: "2023-05-24"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-06-01",
        endDate: "2023-06-09"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-06-18",
        endDate: "2023-06-24"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-07-01",
        endDate: "2023-07-09"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-07-18",
        endDate: "2023-07-24"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-08-01",
        endDate: "2023-08-09"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-08-18",
        endDate: "2023-08-24"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-09-01",
        endDate: "2023-09-09"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-09-18",
        endDate: "2023-09-24"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-10-01",
        endDate: "2023-10-09"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-10-18",
        endDate: "2023-10-24"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-11-01",
        endDate: "2023-11-09"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-11-18",
        endDate: "2023-11-24"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-12-01",
        endDate: "2023-12-09"
      },
      {
        spotId: 10,
        userId: 4,
        startDate: "2023-12-18",
        endDate: "2023-12-24"
      }, {
        spotId: 11,
        userId: 4,
        startDate: "2023-01-01",
        endDate: "2023-01-09"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-01-18",
        endDate: "2023-01-24"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-02-01",
        endDate: "2023-02-09"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-02-18",
        endDate: "2023-02-24"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-03-01",
        endDate: "2023-03-09"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-03-18",
        endDate: "2023-03-24"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-04-01",
        endDate: "2023-04-09"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-04-18",
        endDate: "2023-04-24"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-05-01",
        endDate: "2023-05-09"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-05-18",
        endDate: "2023-05-24"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-06-01",
        endDate: "2023-06-09"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-06-18",
        endDate: "2023-06-24"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-07-01",
        endDate: "2023-07-09"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-07-18",
        endDate: "2023-07-24"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-08-01",
        endDate: "2023-08-09"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-08-18",
        endDate: "2023-08-24"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-09-01",
        endDate: "2023-09-09"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-09-18",
        endDate: "2023-09-24"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-10-01",
        endDate: "2023-10-09"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-10-18",
        endDate: "2023-10-24"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-11-01",
        endDate: "2023-11-09"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-11-18",
        endDate: "2023-11-24"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-12-01",
        endDate: "2023-12-09"
      },
      {
        spotId: 11,
        userId: 4,
        startDate: "2023-12-18",
        endDate: "2023-12-24"
      }, {
        spotId: 12,
        userId: 4,
        startDate: "2023-01-01",
        endDate: "2023-01-09"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-01-18",
        endDate: "2023-01-24"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-02-01",
        endDate: "2023-02-09"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-02-18",
        endDate: "2023-02-24"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-03-01",
        endDate: "2023-03-09"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-03-18",
        endDate: "2023-03-24"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-04-01",
        endDate: "2023-04-09"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-04-18",
        endDate: "2023-04-24"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-05-01",
        endDate: "2023-05-09"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-05-18",
        endDate: "2023-05-24"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-06-01",
        endDate: "2023-06-09"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-06-18",
        endDate: "2023-06-24"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-07-01",
        endDate: "2023-07-09"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-07-18",
        endDate: "2023-07-24"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-08-01",
        endDate: "2023-08-09"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-08-18",
        endDate: "2023-08-24"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-09-01",
        endDate: "2023-09-09"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-09-18",
        endDate: "2023-09-24"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-10-01",
        endDate: "2023-10-09"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-10-18",
        endDate: "2023-10-24"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-11-01",
        endDate: "2023-11-09"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-11-18",
        endDate: "2023-11-24"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-12-01",
        endDate: "2023-12-09"
      },
      {
        spotId: 12,
        userId: 4,
        startDate: "2023-12-18",
        endDate: "2023-12-24"
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    return queryInterface.bulkDelete(options)
  }
};
