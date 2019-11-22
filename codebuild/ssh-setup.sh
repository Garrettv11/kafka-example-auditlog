#!/bin/bash

# exit immediately if there are any errors
set -e

# The stuff necessary for npm to install from private repos on Github
sudo apt-get update && apt-get install -y openssh-client
mkdir -p /root/.ssh
echo "${ROBOT_SSH_KEY}" > /root/.ssh/id_rsa
chmod 600 /root/.ssh/id_rsa
touch /root/.ssh/known_hosts
ssh-keyscan github.com >> /root/.ssh/known_hosts
