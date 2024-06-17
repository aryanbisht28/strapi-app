module.exports = {
  routes: [
    {
      method: "GET",
      path: "/applications/count/:jobId",
      handler: "application.countApplication",
    },
  ],
};
