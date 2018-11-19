'use strict';

var SwaggerExpress = require('swagger-express-mw');
var swaggerTools = require("swagger-tools");
var YAML = require("yamljs");
var swaggerConfig = YAML.load("./api/swagger/swagger.yaml");
var app = require('express')();
var auth = require('./api/helpers/auth');
module.exports = app; // for testing
require( "./config/mongoose" )( app );
// var config = {
//   appRoot: __dirname // required config
// };

// SwaggerExpress.create(config, function(err, swaggerExpress) {
//   if (err) { throw err; }

//   // install middleware
//   swaggerExpress.register(app);
//   swaggerExpress.middleware

//   var port = process.env.PORT || 10010;
//   app.listen(port);

//   if (swaggerExpress.runner.swagger.paths['/hello']) {
//     console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
//   }
// });

swaggerTools.initializeMiddleware(swaggerConfig, function(middleware) {
  //Serves the Swagger UI on /docs
  app.use(middleware.swaggerMetadata()); // needs to go BEFORE swaggerSecurity
  
  app.use(
    middleware.swaggerSecurity({
      //manage token function in the 'auth' module
      Bearer: auth.verifyToken
    })
  );
  
  var routerConfig = {
    controllers: "./api/controllers",
    useStubs: false
  };

  app.use(middleware.swaggerRouter(routerConfig));

  app.use(middleware.swaggerUi());
  
  app.listen(3000, function() {
    console.log("Started server on port 3000");
  });
});


