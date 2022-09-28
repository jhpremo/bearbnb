'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 2,
        review: "Great views",
        stars: 5,
      },
      {
        spotId: 3,
        userId: 3,
        review: "Too warm",
        stars: 2,
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
