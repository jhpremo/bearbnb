'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', [
      {
        address: "123 Disney Lane",
        ownerId: 1,
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      },
      {
        address: "8560 Forest Street",
        ownerId: 2,
        city: "Asheville",
        state: "North Carolina",
        country: "United States of America",
        lat: 35.5,
        lng: 82.5,
        name: "Log cabin",
        description: "lovely mountain views",
        price: 300
      },
      {
        address: "82 Sunset Ave",
        ownerId: 3,
        city: "Miami",
        state: "Florida",
        country: "United States of America",
        lat: 25.7,
        lng: 80.2,
        name: "Vibe Central",
        description: "Ocean views from condo highrise",
        price: 800
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ["App Academy", "Log cabin", "Vibe Central"] }
    }, {});
  }
};
