module.exports = {
    routes: [
      {
        method: "GET",
        path: "/job/category/count",
        handler: "job.countByCategory",
      },
    //   {
    //     method: "GET",
    //     path: "/job/catgory/:category",
    //   },
    ],
  };
  