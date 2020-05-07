var express = require("express");
var passport = require("passport");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var errorhandler = require("errorhandler");
var session = require("express-session");
var cors = require("cors");
var app = express();

var logger = require("dvp-common-lite/LogHandler/CommonLogHandler.js").logger;
var config = require("config");
var jwt = require("restify-jwt");
var secret = require("dvp-common-lite/Authentication/Secret.js");
var authorization = require("dvp-common-lite/Authentication/Authorization.js");
var healthcheck = require("dvp-healthcheck/DBHealthChecker");
var mongomodels = require("dvp-mongomodels");

// tenant operations
var packageService = require("./PackageService");
var navigationService = require("./NavigationService");
var resourceService = require("./ResourceService");

var port = config.Host.port || 3000;
process.on("uncaughtException", function(err) {
  console.error(err);
  console.log("[Unhandled Exception] Node Exiting...");
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error(err);
  console.log("[Unhandled Rejection] Node Exiting...");
  process.exit(1);
});

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(errorhandler({ dumpExceptions: true, showStack: true }));
app.use(cors());
app.use(jwt({ secret: secret.Secret })).unless({path: ['/healthcheck']});

var hc = new healthcheck(app, {
  redis: packageService.RedisCon,
  mongo: mongomodels.connection
});
hc.Initiate();

//-----------------------------------Organization----------------------------------------------------------

app.get(
  "/DVP/API/:version/Packages",
  authorization({ resource: "package", action: "read" }),
  packageService.GetPackages
);
app.get(
  "/DVP/API/:version/Package/:packageName",
  authorization({ resource: "package", action: "read" }),
  packageService.GetPackage
);
app.delete(
  "/DVP/API/:version/Package/:packageName",
  authorization({ resource: "package", action: "delete" }),
  packageService.DeletePackage
);
app.post(
  "/DVP/API/:version/Package",
  authorization({ resource: "package", action: "write" }),
  packageService.CreatePackage
);
app.put(
  "/DVP/API/:version/Package/:packageName",
  authorization({ resource: "package", action: "write" }),
  packageService.UpdatePackage
);

app.get(
  "/DVP/API/:version/PackageUnits",
  authorization({ resource: "package", action: "read" }),
  packageService.GetPackageUnits
);
app.get(
  "/DVP/API/:version/PackageUnit/:unitName",
  authorization({ resource: "package", action: "read" }),
  packageService.GetPackageUnit
);
app.delete(
  "/DVP/API/:version/PackageUnit/:unitName",
  authorization({ resource: "package", action: "delete" }),
  packageService.DeletePackageUnit
);
app.post(
  "/DVP/API/:version/PackageUnit",
  authorization({ resource: "package", action: "write" }),
  packageService.CreatePackageUnit
);
app.put(
  "/DVP/API/:version/PackageUnit/:unitName",
  authorization({ resource: "package", action: "write" }),
  packageService.UpdatePackageUnit
);

app.post(
  "/DVP/API/:version/Codec",
  authorization({ resource: "codec", action: "write" }),
  packageService.CreateCodec
);
app.put(
  "/DVP/API/:version/Codec/:codec",
  authorization({ resource: "codec", action: "write" }),
  packageService.UpdateCodec
);
app.delete(
  "/DVP/API/:version/Codec/:codec",
  authorization({ resource: "codec", action: "delete" }),
  packageService.DeleteCodec
);
app.get(
  "/DVP/API/:version/Codec/All",
  authorization({ resource: "codec", action: "read" }),
  packageService.GetAllCodec
);
app.get(
  "/DVP/API/:version/Codec/Active",
  authorization({ resource: "codec", action: "read" }),
  packageService.GetAllActiveCodec
);
app.get(
  "/DVP/API/:version/Codec/Active/:type",
  authorization({ resource: "codec", action: "read" }),
  packageService.GetCodecByType
);

//------------------------------------Navigation---------------------------------------------------------------------

app.get(
  "/DVP/API/:version/Consoles",
  authorization({ resource: "console", action: "read" }),
  navigationService.GetAllConsoles
);
app.get(
  "/DVP/API/:version/Consoles/:roleType",
  authorization({ resource: "console", action: "read" }),
  navigationService.GetAllConsolesByUserRole
);
app.get(
  "/DVP/API/:version/Console/:consoleName",
  authorization({ resource: "console", action: "read" }),
  navigationService.GetConsole
);
app.delete(
  "/DVP/API/:version/Console/:consoleName",
  authorization({ resource: "console", action: "delete" }),
  navigationService.DeleteConsole
);
app.post(
  "/DVP/API/:version/Console",
  authorization({ resource: "console", action: "write" }),
  navigationService.CreateConsole
);
app.put(
  "/DVP/API/:version/Console/:consoleName",
  authorization({ resource: "console", action: "write" }),
  navigationService.UpdateConsole
);
app.put(
  "/DVP/API/:version/Console/:consoleName/Navigation",
  authorization({ resource: "console", action: "write" }),
  navigationService.AddNavigationToConsole
);
app.delete(
  "/DVP/API/:version/Console/:consoleName/Navigation/:navigationName",
  authorization({ resource: "console", action: "write" }),
  navigationService.RemoveNavigationFromConsole
);

//------------------------------------Resources---------------------------------------------------------------------

app.get(
  "/DVP/API/:version/Resources",
  authorization({ resource: "resource", action: "read" }),
  resourceService.GetResources
);
app.get(
  "/DVP/API/:version/Resource/:resourceName",
  authorization({ resource: "resource", action: "read" }),
  resourceService.GetResource
);
app.delete(
  "/DVP/API/:version/Resource/:resourceName",
  authorization({ resource: "resource", action: "delete" }),
  resourceService.DeleteResource
);
app.post(
  "/DVP/API/:version/Resource",
  authorization({ resource: "resource", action: "write" }),
  resourceService.CreateResource
);
app.put(
  "/DVP/API/:version/Resource/:resourceName",
  authorization({ resource: "resource", action: "write" }),
  resourceService.UpdateResource
);

app.listen(port, function() {
  logger.info("DVP-PackagingService.main Server listening at %d", port);
});
