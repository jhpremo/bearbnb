'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 3,
        review: "Great views",
        stars: 5,
      },
      {
        spotId: 3,
        userId: 1,
        review: "Too cold and small",
        stars: 3,
      },
      {
        spotId: 4,
        userId: 2,
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        spotId: 5,
        userId: 3,
        review: "Great views",
        stars: 5,
      },
      {
        spotId: 6,
        userId: 1,
        review: "Too cold and small",
        stars: 3,
      },
      {
        spotId: 7,
        userId: 2,
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        spotId: 8,
        userId: 3,
        review: "Great views",
        stars: 5,
      },
      {
        spotId: 9,
        userId: 1,
        review: "It was alright",
        stars: 3,
      },
      {
        spotId: 10,
        userId: 2,
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        spotId: 11,
        userId: 3,
        review: "Great views",
        stars: 5,
      },
      {
        spotId: 12,
        userId: 1,
        review: "It was alright",
        stars: 3,
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    return queryInterface.bulkDelete(options);
  }
};
