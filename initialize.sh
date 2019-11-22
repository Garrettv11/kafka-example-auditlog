#!/bin/sh

# This script is used in dev.Dockerfile

# exit immediately if there are any errors
set -e

# Create logs folder if it doesn't exist
mkdir -p logs

# Start server
npm run start-dev
