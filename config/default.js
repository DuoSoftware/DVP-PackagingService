module.exports = {
  Redis: {
    mode: "<VALUE>", //instance, cluster, sentinel
    ip: "<VALUE>",
    port: 6379,
    user: "<VALUE>",
    password: "<VALUE>",
    sentinels: {
      hosts: "<VALUE>",
      port: 0,
      name: "<VALUE>"
    }
  },

  Security: {
    ip: "<VALUE>",
    port: 0,
    user: "<VALUE>",
    password: "<VALUE>",
    mode: "<VALUE>", //instance, cluster, sentinel
    sentinels: {
      hosts: "<VALUE>",
      port: 0,
      name: "<VALUE>"
    }
  },

  Host: {
    resource: "cluster",
    vdomain: "localhost",
    domain: "localhost",
    port: "9005",
    version: "1.0.0.0"
  },

  Mongo: {
    ip: "<VALUE>",
    port: "<VALUE>",
    dbname: "<VALUE>",
    password: "<VALUE>",
    user: "<VALUE>",
    replicaset: "<VALUE>"
  }
};
