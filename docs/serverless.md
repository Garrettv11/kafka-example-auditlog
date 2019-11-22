
# Serverless
AWS Lambda lets you run code without provisioning or managing servers. You pay only for the compute time you consume - there is no charge when your code is not running.

With Lambda, you can run code for virtually any type of application or backend service - all with zero administration. Just upload your code and Lambda takes care of everything required to run and scale your code with high availability. You can set up your code to automatically trigger from other AWS services or call it directly from any web or mobile app.

From: https://aws.amazon.com/lambda/

### Files 

- sam-template.yml
  - [What is AWS SAM?](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
  - [SAM Docs](https://github.com/awslabs/serverless-application-model)
- lambda.index.js
  - Entry point to code
- scripts/build.js
  - Build script

### Optional package.json scripts

Add the following scripts to your package.json to help create lambdas.  

 ```
"build-sam": "sam package --s3-bucket s37-dev-lambda --s3-prefix <unique folder in bucket name> --template-file sam-template.yml --output-template-file deploy-temp.yml",
"build": "./scripts/build.sh && npm run build-sam",
"deploy-stage": "sam deploy --template-file deploy-temp.yml --parameter-overrides SHA=`git rev-parse HEAD` ENV=stage --stack-name <stage-stack-name> --capabilities CAPABILITY_IAM",
"deploy-prod": "sam deploy --template-file deploy-temp.yml --parameter-overrides SHA=`git rev-parse HEAD` ENV=prod --stack-name <prod-stack-name> --capabilities CAPABILITY_IAM",
 ```

Then to deploy a staging lambda: `npm run build && npm run deploy-stage`
