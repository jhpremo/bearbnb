'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "www.image@hostsite.com",
      },
      {
        reviewId: 2,
        url: "www.picture@hostsite.com",
      },
      {
        reviewId: 3,
        url: "www.photo@hostsite.com",
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    return queryInterface.bulkDelete(options);
  }
};
