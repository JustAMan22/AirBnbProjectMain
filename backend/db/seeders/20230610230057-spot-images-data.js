"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";

    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/3111a008-9e4b-4aa6-bfc0-aa360a8fc9ae-Hacienda%20hi%20rez%20016.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/92ec7728-ae6b-47eb-b237-cc907911d0bd-Helate%20Verona%20Roman%20Imperial%20Mansion.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://cdn.greenfieldpuppies.com/wp-content/uploads/2016/07/Pomsky-2-600x600.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://puppytoob.com/wp-content/uploads/2018/05/Pomsky-Puppy.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://dogtime.com/wp-content/uploads/sites/12/2023/07/GettyImages-157603003-e1690769397327.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://worstroom.com/wp-content/uploads/2019/08/horrible-apartment.jpeg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://www.boredpanda.com/blog/wp-content/uploads/2020/08/messy-eater-cats-101-5f48ec0c857fe__700.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://www.bravotv.com/sites/bravo/files/styles/media-gallery-computer/public/legacy/images/photo/2013/07/interior-therapy-season-2-gallery-messy-cats-16.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fphotos%2Fimages%2Flist%2F002%2F066%2F834%2F1c0.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://i.natgeofe.com/n/0bb49210-c2ec-42a5-a6b7-81c43b584857/15-wildlife-gallery-prod-yourshot-288748-10950766_3x4.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://onetreeplanted.org/cdn/shop/articles/Win_Gayo_Orangutan_2000x.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://i.natgeofe.com/n/ca9f3f10-c173-4659-85ff-068167099b4f/9987623.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://media.sciencephoto.com/f0/23/34/88/f0233488-800px-wm.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://i.natgeofe.com/n/9c58e080-d90e-46f2-8c41-2c9f70b452df/prod-yourshot-288748-10948452_3x4.jpg",
          preview: false,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: [
            "https://www.image.com/12",
            "https://www.image.com/13",
            "https://www.image.com/14",
          ],
        },
      },
      {}
    );
  },
};
