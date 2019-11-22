const config = require(__dirname + '/config.js');
const server = require(__dirname + '/server.js');

exports.handler = async requestOptions => {
  const request = {
    method: requestOptions.method,
    url: `http://${config.hapiOptions.host}:${config.hapiOptions.port}${requestOptions.path}`,
    payload: requestOptions.payload,
  };
  let hapiServer;
  try {
    hapiServer = await server.start();
    const { result } = await hapiServer.inject(request);
    await hapiServer.stop();
    return result;
  }
  catch (error) {
    if (hapiServer) {
      await hapiServer.stop();
    }
    console.log('lambda execution error is :', error);
    throw error;
  }
};
