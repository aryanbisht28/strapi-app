module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
      try {
          console.log('ctx', ctx.request.body);
          const { data } = ctx.request.body;
          const { phoneNumber, job } = data;
          const jobId = job.connect[0];
          console.log(phoneNumber, jobId, job);

          const existingEntry = await strapi.db
              .query("api::application.application")
              .findOne({
                  where: {
                      phoneNumber: phoneNumber,
                      job: jobId,
                  },
              });

          if (existingEntry) {
              ctx.body = { message: "Application already exists" };
          } else {
              await next();
          }
      } catch (error) {
          console.error('Middleware error:', error);
          ctx.throw(500, 'Internal Server Error');
      }
  };
};