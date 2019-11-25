const Hapi = require('@hapi/hapi');
const healthcheckRoute = require(__dirname + '/src/routes/version.js');
const plugins = require(__dirname + '/src/plugins/plugins.js');
const config = require(__dirname + '/config.js');
const AuditLogConsumer = require(__dirname + '/src/consumers/AuditLogConsumer.js');

/**
* @description registers server plugins and starts a hapi server
* @return {Object} returns the started hapi server
*/
const start = async () => {
  const server = await new Hapi.Server(config.hapiOptions);
  try {
    // register plugins
    await server.register(plugins);
    // add routes
    server.route(healthcheckRoute);
    server.app.auditLogConsumer = new AuditLogConsumer(config.kafkaServer);
    await server.start();
    console.log('Server running at:', server.info.uri);
    console.log('Swagger definition available at:', server.info.uri + '/swagger.json');
    return server;
  }
  catch (err) {
    console.log(err);
  }
};

if (!module.parent) start();

module.exports = { start };
