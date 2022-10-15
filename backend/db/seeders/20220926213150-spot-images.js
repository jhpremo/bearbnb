'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-51688093/original/2af91f29-ef3c-45bd-912a-58bc927756a8.png?im_w=720",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/2e548cdb-bb7b-4481-b737-dc368bf4137f.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-51688093/original/6397c33b-d77a-4615-8b4d-d20e9aad7a20.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-15333465/original/5ee614ed-c63e-428f-b3d5-0693672760b9.jpeg?im_w=960",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/2d1edbc9-1114-4d34-80d8-c60186314b6c.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-15333465/original/a1cde7bf-6a96-48c9-b2bd-6c5ff4a0ece8.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-46695796/original/a0965aa5-3907-466e-b727-0900e2a7e8c7.jpeg?im_w=960",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-46695796/original/9bd67185-dc83-4473-a191-9486c62aec66.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-46695796/original/d01dc3d2-9597-4d88-92f7-3e15a1c0d604.jpeg?im_w=1200",
        preview: false
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
