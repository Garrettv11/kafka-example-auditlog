# Node LTS as of 08-FEB-2018
FROM node:carbon-alpine

# Create app directory
WORKDIR /usr/src/app

RUN apk update && apk upgrade && \
    apk add --no-cache git openssh

# Copy app (node_modules is ignored)
COPY . .

# Required for access to the hapi-auth private repo
# To build locally, run:
# docker build --build-arg SSH_PRIVATE_KEY="$(cat ~/.ssh/id_rsa)" -f codebuild/test.Dockerfile -t nora-notifications-api .
ARG SSH_PRIVATE_KEY
RUN mkdir /root/.ssh/ && \
    echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa && \
    chmod 600 /root/.ssh/id_rsa && \
    touch /root/.ssh/known_hosts && \
    ssh-keyscan github.com >> /root/.ssh/known_hosts

ENV AWS_XRAY_CONTEXT_MISSING=LOG_ERROR
ENV AWS_XRAY_DEBUG_MODE=TRUE

RUN npm install
