#!/bin/bash

################################################################
# Create services
################################################################
cf create-service compose-for-mongodb Standard health-blockchain-db

################################################################
# Push app with blue/green deployment
################################################################
if ! cf app $CF_APP; then
  if [ -z "$CF_APP_HOSTNAME" ]; then
    cf push $CF_APP
  else
    cf push $CF_APP --hostname $CF_APP_HOSTNAME
  fi
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
    cf push $CF_APP
  else
    cf push $CF_APP --hostname $CF_APP_HOSTNAME
  fi
  cf delete $OLD_CF_APP -f
fi
