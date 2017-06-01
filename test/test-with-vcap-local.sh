#!/bin/bash

# inject VCAP_SERVICES in the environment, to be picked up by the datasources.local.js
export VCAP_SERVICES=`cat vcap-local.json | jq .services`

export VCAP_APPLICATION='
{
  "application_uris": [
    "https://myapp.local"
  ]
}
'

istanbul cover _mocha test/*.spec.js --report html -- -R spec --timeout 300000
