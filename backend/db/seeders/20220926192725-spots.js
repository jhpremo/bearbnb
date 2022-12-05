'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    return queryInterface.bulkInsert(options, [
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
      },
      {
        address: "4562 Billington Ave",
        ownerId: 1,
        city: "Willington",
        state: "Connecticut",
        country: "United States of America",
        lat: 41.9,
        lng: -72.3,
        name: "Heavenly Treehouse in Countryside w/ Farm Animals",
        description: 'OMG! Explore the countryside at this popular 40-acre sanctuary that has become a favorite among Farms in Connecticut! This is a unique Treehouse in Connecticut.',
        price: 189
      },
      {
        address: "8 Credence Drive",
        ownerId: 2,
        city: "Thonotossa",
        state: "Florida",
        country: "United States of America",
        lat: 28.1,
        lng: -82.3,
        name: "PARADISE Luxury Resort Style Lakefront, Pool and Hot Tub",
        description: 'New LUXURY Lakefront Mansion on an absolutely amazing Resort Style Estate on over 2 acres. It has something for everyone.  Lay out by the pool, relax in the hot tub or shoot some pool in the game room.',
        price: 1255
      },
      {
        address: "93 Frozen Court",
        ownerId: 1,
        city: "Crosby",
        state: "Michigan",
        country: "United States of America",
        lat: 44.3,
        lng: -85.6,
        name: "The Louise Cabin - Direct Cuyuna MTB Access/Sauna",
        description: 'Relax, disconnect, unwind and explore!  Our location provides bike-in, bike out access to the nationally ranked Cuyuna Mountain Bike trails and the paved trail.',
        price: 209
      },
      {
        address: "5460 Anton Street",
        ownerId: 3,
        city: "Canyon Lake",
        state: "Texas",
        country: "United States of America",
        lat: 29.9,
        lng: -98.3,
        name: "Happy Owl Lakehouse",
        description: 'You found it! The Happy Owl Lakehouse, built in 2019, has been lovingly designed to provide guests with an unforgettable experience of beauty, comfort, and joy.',
        price: 573
      },
      {
        address: "6 Grand Lake Road",
        ownerId: 1,
        city: "Grand Lake",
        state: "Colorado",
        country: "United States of America",
        lat: 40.3,
        lng: -105.8,
        name: "Charming Cabin on the Shore of Grand Lake",
        description: 'In the winter enjoy ice fishing, cross-country skiing, snow shoeing, hiking, sledding, snowball fights. Rent snowmobile in town and ride it to RMNP. Spring, summer, autumn enjoy owner provided kayak and canoe. ',
        price: 475
      },
      {
        address: "87 Ocean Views Drive",
        ownerId: 1,
        city: "Whitethorn",
        state: "California",
        country: "United States of America",
        lat: 40.1,
        lng: -123.9,
        name: "Gorgeous Oceanview, Shelter Cove, Oceanfront!",
        description: 'This beautiful home is located on the cliffs right above Little Black Sands Beach. You have exclusive private access to the Top-floor condo in a Tri-Plex,  with private entrance, Hot tub, Deck and a balcony.',
        price: 600
      },
      {
        address: "31 Deep Creek Lane",
        ownerId: 3,
        city: "Peshastin",
        state: "Washington",
        country: "United States of America",
        lat: 47.8,
        lng: -120.7,
        name: "Hansel Creek Gust Tree House",
        description: 'Escape high up into the trees above Hansel Creek. Located just 15 minutes to Leavenworth and walking distance to the Alpine Lakes Wilderness trail-head. Sitting on pristine Hansel Creek this is the only tree house in Leavenworth. ',
        price: 259
      },
      {
        address: "18 Mountain Dr.",
        ownerId: 1,
        city: "Boulder",
        state: "Colorado",
        country: "United States of America",
        lat: 40.1,
        lng: -105.2,
        name: "Luxe Boulder 'Barrett House' on Mtn Peak w/Hot Tub",
        description: "There's no better place to experience Colorado than at 'Barrett House,' a spectacular 3-bedroom, 3-bathroom vacation rental in beautiful Boulder, nestled at an elevation of 7,000 feet on a scenic 3-acre mountain peak in the foothills.",
        price: 614
      },
      {
        address: "9540 Snow Shoe Ave.",
        ownerId: 2,
        city: "Park City",
        state: "Utah",
        country: "United States of America",
        lat: 40.6,
        lng: -111.5,
        name: "Mtn. Immersion: Luxe Cabin w/Spa, 6Mi to Park City",
        description: 'Feast your eyes on this unbelievable, luxury 5-bedroom, 4-bath cabin! But as impressive as the vacation rental is, the mountain views do truly steal the show - and your breath. ',
        price: 331
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    return queryInterface.bulkDelete(options)
  }
};
