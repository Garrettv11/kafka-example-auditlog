const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const { version } = require(__dirname + '/../../package');

const plugins = [
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: {
      info: {
        title: 'Form API Documentation',
        version,
      },
    },
  },
];

module.exports = plugins;
