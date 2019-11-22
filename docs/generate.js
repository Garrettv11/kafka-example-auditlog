const config = require(__dirname + '/../config.js');
const server = require(__dirname + '/../server.js');
const json2yaml = require('json2yaml');
const fs = require('fs');

const options = {
  method: 'GET',
  url: `http://${config.hapiOptions.host}:${config.hapiOptions.port}/swagger.json`,
  payload: {},
  validate: false,
};

(async ()=> {

  try {
    const hapiServer = await server.start();
    const { result } = await hapiServer.inject(options);
    const documentationYAML = json2yaml.stringify(result);
    fs.writeFileSync(__dirname + '/REST.yaml', documentationYAML);
    await hapiServer.stop();
    process.exit(0);
  }
  catch (error) {
    console.log('documentation generation error is :', error);
    process.exit(1);
  }

})();
