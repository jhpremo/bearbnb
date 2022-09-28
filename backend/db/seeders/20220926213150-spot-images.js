'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "www.image@hostsite.com",
        preview: true
      },
      {
        spotId: 2,
        url: "www.picture@hostsite.com",
        preview: false
      },
      {
        spotId: 3,
        url: "www.photo@hostsite.com",
        preview: true
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages', {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
