'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ReviewImages', [
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('ReviewImages', {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
