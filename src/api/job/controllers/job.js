"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::job.job", ({ strapi }) => ({
  async countByCategory(ctx) {
    try {
      const result = await strapi.db.connection.raw(`
        SELECT type_of_work, COUNT(*) as count
        FROM jobs
        GROUP BY type_of_work
      `);
      return ctx.send({ data: { result } });
    } catch (err) {
      return ctx.throw(500, err);
    }
  },
  async dashboardJobHandler(ctx) {
    try {
      const { jobId } = ctx.params;
      const selectedData = await strapi.db.connection.raw(`
        SELECT COUNT(application_id) as count from applications a 
        INNER JOIN ( SELECT application_id from applications_job_links WHERE job_id = ${jobId} ) aj ON aj.application_id  = a.id
        WHERE a.status = 'SELECTED'
        `);
      const totalApplications = await strapi.db.connection.raw(`
        SELECT COUNT(application_id) as count
        FROM applications_job_links
        WHERE job_id = ${jobId}
        `);
      const countOfApplicationsGroupByPostalCode = await strapi.db.connection
        .raw(`
        SELECT COUNT(application_id) as count, postal_code
        from applications a
        INNER JOIN applications_job_links aj
        ON a.id = aj.application_id
        WHERE job_id=${jobId}
        GROUP BY postal_code
        ORDER BY count DESC
        `);
      return ctx.send({
        data: {
          selectedData: selectedData[0].count,
          totalApplications: totalApplications[0].count,
          countOfApplicationsGroupByPostalCode,
        },
      });
    } catch (error) {
      return ctx.throw(500, error);
    }
  },
  async dashboardHomeHandler(ctx) {
    try {
      const countJobs = await strapi.db.connection.raw(`
        SELECT COUNT(id) from jobs
        `);
      const countApplications = await strapi.db.connection.raw(`
        SELECT COUNT(id) from applications`);
      const countJobsGroupByTypeOfWork = await strapi.db.connection.raw(`
        SELECT type_of_work , COUNT(id) from applications
        GROUP BY type_of_work   
        `);
      // const countJobsGroupByPostalCode = await strapi.db.connection.raw(`

      //   `)
      ctx.send({
        data: {
          countJobs: countJobs[0].count,
          countApplications: countApplications[0].count,
          countJobsGroupByTypeOfWork,
        },
      });
    } catch (error) {}
  },
}));
