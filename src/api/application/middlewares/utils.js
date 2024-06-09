"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const { data } = ctx.request.body;
    const { phoneNo, job } = data;

    const jobId = job.connect[0];
    console.log(phoneNo, jobId, job);

    const existingEntry = await strapi.db
      .query("api::application.application")
      .findOne({
        where: {
          phoneNo: phoneNo,
          job: jobId,
        },
      });

    if (existingEntry) {
      ctx.status = 400;
      ctx.body = {
        message:
          "An entry with this phone number already exists for the specified job ID.",
      };
    } else {
      await next();
    }
  };
};
