#!/bin/bash

# create a service just for the test
SERVICE_NAME=health-blockchain-db-`date +"%Y-%m-%d-%H-%M"`-$RANDOM
echo "Creating a new service named $SERVICE_NAME"
cf create-service cloudantNoSQLDB Lite $SERVICE_NAME

# generate credentials
cf create-service-key $SERVICE_NAME for-test

# grab the credentials - ignoring the first debug logs of cf command
CREDENTIALS_JSON=`cf service-key $SERVICE_NAME for-test | tail -n+3`

# inject VCAP_SERVICES in the environment, to be picked up by the datasources.local.js
export VCAP_SERVICES='
{
  "cloudantNoSQLDB": [
    {
      "name": "health-blockchain-db",
      "label": "cloudantNoSQLDB",
      "plan": "Lite",
      "credentials":'$CREDENTIALS_JSON'
    }
  ]
}'

export VCAP_APPLICATION='
{
  "application_uris": [
    "https://myapp.local"
  ]
}
'

# on exit, delete the service key and service
cleanup() {
  cf delete-service-key -f $SERVICE_NAME for-test
  cf delete-service -f $SERVICE_NAME
}
trap cleanup EXIT

istanbul cover _mocha test/*.spec.js --report html -- -R spec --timeout 300000
