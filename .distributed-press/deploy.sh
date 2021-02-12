#!/bin/bash

# Get values from arguments
PROJECT_API_KEY=$1
PROJECT_CONFIG=$2
PROJECT_WWW=$3

# Configure the site
curl -v https://api.distributed.press/v0/publication/configure -H "Content-Type: multipart/form-data" -H "Accept: application/json" -H "Authorization: Bearer ${PROJECT_API_KEY}" -F "file=@${PROJECT_CONFIG}"

# Publish the website
curl -v https://api.distributed.press/v0/publication/publish -H "Content-Type: multipart/form-data" -H "Accept: application/json" -H "Authorization: Bearer ${PROJECT_API_KEY}" -F "file=@${PROJECT_WWW}"
