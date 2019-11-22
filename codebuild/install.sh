#!/bin/bash

# exit immediately if there are any errors
set -e

# Stuff required for CodeBuild to send messages to Slack.
# Install other packages here if they are required.
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y curl wget nodejs
wget https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64
sudo mv jq-linux64 codebuild/jq && chmod +x codebuild/jq
