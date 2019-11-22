#!/bin/sh
set -e

# Define s3 destination
S3_BUCKET_PATH="s3://nora-dev-private/api-specs/"

# Define spec endpoints
##!!!!!!!!!!!!!!!!!CHANGE YOUR PORT ASSIGNMENT HERE!!!!!!!!!!!!!!!!!!!!!!!!
OAS_REST_ENDPOINT="http://localhost:11116/swagger.json"
#OAS_GRAPHQL_ENDPOINT="http://localhost:11116/graphql/swagger.json"
#GRAPHQL_SCHEMA_ENDPOINT="http://localhost:11116/graphql"

# Format: ${type}-${name}
OAS_REST_OBJ_NAME="oas-notificationsV1RestApiSpec"
OAS_GRAPHQL_OBJ_NAME="oas-notificationsV1GraphQlApiSpec"

# Format: ${type}-${name}-${parentSlug}
#GRAPHQL_OBJ_NAME="graphql-notificationsV1graphQlSchema-postv1notificationsgraphql"

# Generate REST swagger file and push to s3
echo "Getting REST OAS"
curl -o /tmp/swagger.json $OAS_REST_ENDPOINT
echo "Uploading REST OAS to S3"
aws s3 cp /tmp/swagger.json ${S3_BUCKET_PATH}${OAS_REST_OBJ_NAME}
rm /tmp/swagger.json

# Generate GraphQL swagger file and push to s3
#echo "Getting GraphQL OAS"
#curl -o /tmp/graphqlswagger.json $OAS_GRAPHQL_ENDPOINT
#echo "Uploading GraphQL OAS to S3"
#aws s3 cp /tmp/graphqlswagger.json ${S3_BUCKET_PATH}${OAS_GRAPHQL_OBJ_NAME}
#rm /tmp/graphqlswagger.json

# Generate GraphQL schema and upload to S3
#npm install -g get-graphql-schema
#echo "Generating schema.graphql"
#get-graphql-schema --header "X-JWT=${GQL_JWT}" "$GRAPHQL_SCHEMA_ENDPOINT" > /tmp/schema.graphql
#aws s3 cp /tmp/schema.graphql ${S3_BUCKET_PATH}${GRAPHQL_OBJ_NAME}
#rm /tmp/schema.graphql