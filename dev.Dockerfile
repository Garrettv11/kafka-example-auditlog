# Node LTS as of 08-FEB-2018
FROM node:dubnium-alpine AS intermediate

# Create app directory
WORKDIR /usr/src/app

RUN apk update && apk upgrade && \
    apk add --no-cache git openssh
COPY package.json .
COPY package-lock.json .
RUN npm install

#######################
# CLEAN CONTAINER (NO SSH KEY)
#######################
FROM node:dubnium-alpine
RUN apk update && apk upgrade && \
    apk add --no-cache bash curl
# Create app directory
WORKDIR /usr/src/app

ARG SHA='localhost'
ENV SHA=$SHA

COPY --from=intermediate /usr/src/app .

CMD ["./initialize.sh"]
