"use strict";

/**
 * application router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::application.application", {
  config: {
    create: {
      middlewares: ["api::application.utils"],
    },
  },
});
