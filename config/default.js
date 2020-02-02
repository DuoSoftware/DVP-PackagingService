module.exports = {
  DB: {
    Type: "<VALUE>",
    User: "<VALUE>",
    Password: "<VALUE>",
    Port: 0,
    Host: "<VALUE>",
    Database: "<VALUE>"
  },

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
    port: "9004",
    version: "1.0.0.0"
  },

  Mongo: {
    ip: "<VALUE>",
    port: "<VALUE>",
    dbname: "<VALUE>",
    password: "<VALUE>",
    user: "<VALUE>",
    replicaset: "<VALUE>"
  },
  Services: {
    accessToken: "<VALUE>",
    resourceServiceHost: "<VALUE>",
    resourceServicePort: "<VALUE>",
    resourceServiceVersion: "<VALUE>",
    sipuserendpointserviceHost: "<VALUE>",
    sipuserendpointservicePort: "<VALUE>",
    sipuserendpointserviceVersion: "<VALUE>",
    clusterconfigserviceHost: "<VALUE>",
    clusterconfigservicePort: "<VALUE>",
    clusterconfigserviceVersion: "<VALUE>",
    billingserviceHost: "<VALUE>",
    billingservicePort: "<VALUE>",
    billingserviceVersion: "<VALUE>",
    liteticketHost: "<VALUE>",
    liteticketPort: "<VALUE>",
    liteticketVersion: "<VALUE>",
    fileserviceHost: "<VALUE>",
    fileservicePort: "<VALUE>",
    fileserviceVersion: "<VALUE>"
  },

  Tenant: {
    activeTenant: 0
  },
  ClusterName: "Test",
  Provision: 1
};
