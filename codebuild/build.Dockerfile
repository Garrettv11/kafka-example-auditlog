# Node LTS as of 08-FEB-2018
FROM node:carbon-alpine AS intermediate

# Create app directory
WORKDIR /usr/src/app

RUN apk update && apk upgrade && \
    apk add --no-cache git openssh

# Copy app (node_modules is ignored)
COPY . .

# add credentials on build
# run the following to build locally:
# docker build --build-arg SSH_PRIVATE_KEY="$(cat ~/.ssh/id_rsa)" -f codebuild/build.Dockerfile -t nora-dispensation-service .
ARG SSH_PRIVATE_KEY
RUN mkdir /root/.ssh/ && \
    echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa && \
    chmod 600 /root/.ssh/id_rsa && \
    touch /root/.ssh/known_hosts && \
    ssh-keyscan github.com >> /root/.ssh/known_hosts

RUN npm install --only=production

#######################
# CLEAN CONTAINER (NO SSH KEY)
#######################
FROM node:carbon-alpine

# Create app directory
WORKDIR /app

# Install curl for the ECS Agent healthcheck
RUN apk update && apk upgrade && \
    apk add --no-cache curl

COPY --from=intermediate /usr/src/app /app

ARG SHA
ENV SHA=$SHA

ARG NODE_ENV=test
ENV NODE_ENV=$NODE_ENV
ENV AWS_XRAY_CONTEXT_MISSING=LOG_ERROR
ENV AWS_XRAY_DEBUG_MODE=TRUE

# SET YOUR PORT NUMBER BELOW
# EXPOSE 11116

CMD ["npm", "start"]
