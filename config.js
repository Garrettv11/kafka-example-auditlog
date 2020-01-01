'use strict';

// parse environment variables from the specified file and store them in the
// process.env object, eg. process.env.DB_PASSWORD (see .env-dev file for examples)
if (process.env.NODE_ENV == 'dev-docker' || process.env.NODE_ENV == 'test') {
  require('dotenv').config({ path: '.env-dev' });
}
else {
  require('dotenv').config();
}

const deepmerge = require('deepmerge');
const config = {};

// default is local cloud9
config['dev-docker'] = {
  hapiOptions: {
    host: '0.0.0.0',
    port: 6046,
  },
  kafkaServer: 'kafka1:9092',
  elasticSearch: {
    host: 'es01:9200',
  },
};

// merge the default config with the environment-specific config
const env = process.env.NODE_ENV ? process.env.NODE_ENV: 'dev-docker';

const mergedConfig = deepmerge(config['dev-docker'], config[env], {
  arrayMerge: (destination, source) => {
    return [ ...destination, ...source];
  },
});

module.exports = mergedConfig;
