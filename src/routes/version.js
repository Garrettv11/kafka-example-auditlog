const sha = process.env.SHA;
const env = process.env.NODE_ENV ? process.env.NODE_ENV: 'dev';

module.exports = [
// Health check route
  {
    method: 'GET',
    path: `/version`,
    options: {
      tags: ['api'],
      description: 'Retrieves the current version of the service.',
      log: { collect: true },
      auth: false,
    },
    handler: async (request, h) => {
      return {
        healthy: true,
        uptime: process.uptime(),
        version: (process.env.npm_package_version
          || 'Version not available -- Not started with npm.'),
        env: env,
        commitSha: sha,
      };
    },
  },
];
