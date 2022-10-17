'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', [
      {
        address: "4562 Forest Drive",
        ownerId: 1,
        city: "Jefferson",
        state: "New York",
        country: "United States of America",
        lat: 40.9,
        lng: -74.6,
        name: "Tiny Black A-frame",
        description: "Set in the midst of the pristine Catskills forest, less than two hours from NYC, the Tiny Black A-Frame is a custom built, semi off-grid mini cabin with a refined wooden design and amazing views of natural splendor.",
        price: 295
      },
      {
        address: "8560 Lake Street",
        ownerId: 2,
        city: "Ashland",
        state: "Pennsylvania",
        country: "United States of America",
        lat: 40.7,
        lng: -76.3,
        name: "The Boathouse on Moon Lake",
        description: "Quaint cottage overlooking Beurys Lake...or as my dad lovingly says...'its more like a shallow pond'.  For those who love a sweet quiet cottage get away with a gorgeous view, this is the perfect place for you. ",
        price: 219
      },
      {
        address: "98 Pine Grove Way",
        ownerId: 3,
        city: "Lac-Beauport",
        state: "Quebec",
        country: "Canada",
        lat: 46.9,
        lng: -71.3,
        name: "MICA (Chalets Micro-Element) CITQ 303134",
        description: 'The "MICA", high-end micro-housing located in the heart of the "Maelström" recreational-forestry area. Live the immersive experience of a boreal nature just 25 minutes from Old Quebec. ',
        price: 350
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
