#!/bin/bash

# The branch may use a custom manifest
MANIFEST=manifest.yml
PREFIX=""
if [ -f ${REPO_BRANCH}-manifest.yml ]; then
  MANIFEST=${REPO_BRANCH}-manifest.yml
  PREFIX=$REPO_BRANCH"-"
fi
echo "Using manifest file: $MANIFEST"
echo "Using prefix: $PREFIX"

################################################################
# Create services
################################################################
cf create-service cloudantNoSQLDB Lite ${PREFIX}health-blockchain-db

################################################################
# Push app with blue/green deployment
################################################################
if ! cf app $CF_APP; then
  if [ -z "$CF_APP_HOSTNAME" ]; then
    cf push $CF_APP -f $MANIFEST --no-start
  else
    cf push $CF_APP -f $MANIFEST --hostname $CF_APP_HOSTNAME --no-start
  fi
  if [ ! -z "$FITBIT" ]; then
    cf set-env $CF_APP FITBIT "${FITBIT}"
  fi
  cf start $CF_APP
else
  OLD_CF_APP=${CF_APP}-OLD-$(date +"%s")
  rollback() {
    set +e
    if cf app $OLD_CF_APP; then
      cf logs $CF_APP --recent
      cf delete $CF_APP -f
      cf rename $OLD_CF_APP $CF_APP
    fi
    exit 1
  }
  set -e
  trap rollback ERR
  cf rename $CF_APP $OLD_CF_APP
  if [ -z "$CF_APP_HOSTNAME" ]; then
    cf push $CF_APP -f $MANIFEST --no-start
  else
    cf push $CF_APP -f $MANIFEST --hostname $CF_APP_HOSTNAME --no-start
  fi
  if [ ! -z "$FITBIT" ]; then
    cf set-env $CF_APP FITBIT "${FITBIT}"
  fi
  cf start $CF_APP
  cf delete $OLD_CF_APP -f
fi
