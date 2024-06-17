module.exports = {
  routes: [
    {
      method: "GET",
      path: "/job/category/count",
      handler: "job.countByCategory",
    },
    {
      method: "GET",
      path: "/job/:jobId/data",
      handler: "job.dashboardJobHandler",
    },
    {
      method: "GET",
      path: "/job/data",
      handler: "job.dashboardHomeHandler",
    },
  ],
};
