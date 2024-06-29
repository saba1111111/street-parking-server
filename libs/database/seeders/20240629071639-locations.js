"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    const locationsData = [
      {
        name: "Times Square",
        cityId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Central Park",
        cityId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Empire State Building",
        cityId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "National Mall",
        cityId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "White House",
        cityId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Smithsonian Museum",
        cityId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("locations", locationsData, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("locations", null, {});
  },
};
