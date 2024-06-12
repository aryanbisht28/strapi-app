"use strict";

/**
 * job controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::job.job", ({ strapi }) => ({
  async countByCategory(ctx) {
    try {
      const result = await strapi.db.connection.raw(`
        SELECT type_of_work, COUNT(*) as count
        FROM jobs
        GROUP BY type_of_work
      `);
      ctx.send({ data: { result } });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
}));
