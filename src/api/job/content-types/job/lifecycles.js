module.exports = {
  async beforeUpdate(event) {
    try {
      const { where, data } = event.params;
      const { isFulfilled } = data;
      // console.log(data);
      const currentEntry = await strapi.entityService.findOne(
        "api::job.job",
        where.id,
        {
          fields: ["isFulfilled"],
        }
      );
      // console.log(currentEntry);
      // // const title = currentEntry.job.title; //TODO: title to be get from api
      const jobId = currentEntry.id;
      if (isFulfilled === true) {
        // console.log("UPDATED");
        //TODO: Sent Rejections Mail
        return await strapi.db.connection.raw(`
          UPDATE applications 
          SET status = 'REJECTED'
          WHERE id in (SELECT id from applications a 
          INNER JOIN (SELECT application_id from applications_job_links WHERE job_id = ${jobId}) applicants
          ON applicants.application_id = a.id 
          WHERE status = 'Under Review'
          )
          `);
      }
    } catch (error) {
      console.error(error);
      return;
    }
  },
};
