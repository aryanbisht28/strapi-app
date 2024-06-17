"use strict";

/**
 * application controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::application.application",
  ({ strapi }) => ({
    async countApplication(ctx) {
      try {
        const { jobId } = ctx.params;
        console.log(jobId);
        // const jobId = 8;
        console.log(ctx);
        const result = await strapi.db.connection.raw(`
        SELECT COUNT(*) as no_of_applications 
        FROM applications_job_links
        WHERE job_id = ${jobId}
        `);
        return ctx.send({ data: { result } });
      } catch (error) {
        return ctx.throw(500, error);
      }
    },
  })
);
