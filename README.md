# Hapi Starter Kit

**Hapi Starter Kit** is a **reference service** to be used as a template for 
building all node.js services with [hapi.js](https://hapijs.com/). The reference contains 
the foundations and plumbing for everything that is needed to successfully develop, document, test and 
deploy a production-ready service so that developers can focus on delivering business value.

## Steps for creating a new service

### Provision github repo and development environment
Once you are ready to break ground on a new service, you will need to contact 
DevOps and provide them with the following:

- Name of service
- JIRA ticket for the new service
- Port number that the service will run on
- Target release-to-production date (if applicable)

DevOps will provision a new github repo using a carbon copy of hapi-starter-kit and 
make the necessary configurations to [harmony-cloud9](https://github.com/Science37/harmony-cloud9)
so that the service can be developed in the Cloud9 development environment. Once these steps are done, you 
can begin development on the new service.

### Replacing example service references

* Run _make setup_ to replace Hapi Starter Kit references. Specify the same port used 
in the harmony docker-compose file.
* Rename folder src/routes/v2/hapistarterkit to src/routes/v2/\<myservicename\>
* Find and replace all references to ‘hapistarterkit’ to \<myservicename\>

* Modify config.js
    * If your databases make use of passwords, enter them for each config

### Setting Up Your Database

If your service uses MySQL, you should edit the initial schema migration file at
_\/hapi-starter-kit\/migrations\/schema\/sqls\/20190531204421-initial-up.sql_ so that it contains the initial tables your service requires.

Once you have added any initial tables your service requires, execute the following db-migrate commands:

* _db-migrate db:create \<my-service-name\>_ (creating your database)
* _db-migrate up:setup-dev_ **or** _db-migrate up:setup_ if deploying (setting up your db user)
* _db-migrate up:schema_ (updating your database with your schema changes)

By default, the _local-dev_ setup is used when running migrations. To specify another test environment, use the --env variable like below:

* _db-migrate db:create \<my-service-name\> --env dev-ecs_
* _db-migrate up:setup-dev --env dev-ecs_
* _db-migrate up:schema -- env dev-ecs_

In production-like environments, credentials can be dynamically supplied to the commands like in this example:

* _DB_USER='admin' DB_PASSWORD='secret password' DB_HOST='db-nora-example.prod.com' DB_PORT=3306 db-migrate db:create 'my-service-name' --env other_
* _DB_USER='admin' DB_PASSWORD='secret password' DB_HOST='db-nora-example.prod.com' DB_PORT=3306 db-migrate up:setup --env other_
* _DB_USER='admin' DB_PASSWORD='secret password' DB_HOST='db-nora-example.prod.com' DB_PORT=3306 db-migrate up:schema --env other_

After running the commands, your database user and schema should be setup. For all future migrations, simply run _db-migrate up:schema_.

### Expose route(s) on API Gateway
If the services will have an API, the routes will need to be added to the API Gateway, and
any required or applicable middleware (such as auth) for the routes will need to be configured. 
For further instructions, refer to [Express API Gateway](https://github.com/Science37/nora-api-gateway)

### Setting hapi-starter-kit as upstream repository
Note: This will require you to handle merge conflicts. If your service has diverged substantially from the hapi-starter-kit, 
it may be simpler to manually add the desired updates to your service.

If there are any major updates in hapi-starter-kit that you would like to pull back into your service, you can set hapi-starter-kit as
the remote upstream repository using the follow command:
* $ git remote add upstream git@github.com:Science37/hapi-starter-kit.git

To pull updates from the hapi-starter-kit into your service use this command:
* $ git pull --allow-unrelated-histories

### How-to Guides

Here are a few how-to guides to use when creating a new microservice from the hapi-starter-kit:

* [How to Add a New Hapi Microservice to the Cluster](https://science37.atlassian.net/wiki/spaces/TECH/pages/555484052/How+to+Add+a+New+Hapi+Microservice+to+the+Cluster)
* [How to Setup Access Control in Hapi Microservices](https://science37.atlassian.net/wiki/spaces/TECH/pages/555516689/How+to+Setup+Access+Control+in+Hapi+Microservices)
* [How to use Logging with Kibana in a Hapi Microservice](https://science37.atlassian.net/wiki/spaces/TECH/pages/555975453/How+to+use+Logging+with+Kibana+in+a+Hapi+Microservice)

## Contribution Guidelines

If common features are developed or there are architectural improvements that all services will benefit from,
these should be added to the hapi-starter-kit. While there are no hard-and-fast rules on what these are,
a general guideline should be that all services use them. For other cases, developing a 
[hapi plugin](https://hapijs.com/tutorials/plugins) would be a better way to go. If the plugin contains 
very common / shared features, such as authorization, this would be a good place to add an example for 
using the plugin.

To make a change to the repo, make sure the VIP process is followed and that there is a PR opened targeting master 
and referencing the IS / FS documenting the changes. The PR will be approved by the codeowners of the repo.

Any changes to the package.js file will require review and approval by a security architect.


## Development Guidelines

* Before making a pull request:
  * If models or routes have changed, generate documentation by running _'npm run generate-docs'_
  and stage any resulting changes to docs/REST.md
  * Pass ESLint
  * Write API and/or Unit tests (>XX% coverage)
  * Pass API and Unit tests
* Only access service-specific tables
* Use async/await when possible
* Write mocks for DAO methods
